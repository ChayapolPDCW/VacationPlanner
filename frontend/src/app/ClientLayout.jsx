"use client";

import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadScript } from "@react-google-maps/api";
import { createContext, useState } from "react";

// Create a context to share the map loading state
export const MapContext = createContext({ isMapLoaded: false, mapError: null });

export default function ClientLayout({ children }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
      onLoad={() => setIsMapLoaded(true)}
      onError={(err) => {
        console.error("Failed to load Google Maps API:", err);
        setMapError("Failed to load Google Maps API. Please check your API key and ensure the required APIs are enabled.");
      }}
    >
      {mapError ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-2xl text-red-600">{mapError}</div>
        </div>
      ) : (
        <MapContext.Provider value={{ isMapLoaded, mapError }}>
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MapContext.Provider>
      )}
    </LoadScript>
    );
}
"use client";

import MapComponent from "@/components/page";
import { useState } from "react";

export default function Home() {

  const [from, setFrom] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    radius: 500,
  });
  const [latitude, setLatitude] = useState(24.799448);
  const [longitude, setLongitude] = useState(120.979021);
  const [address, setAddress] = useState("");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% visa-sky-500 from-10% via-sky-500 via-30% to emerald-500 to-90%">
      <div className="flex flex-col w-full items-center gap-y-4">
        <span className="text-6xl text-gray-700 font-bold">Next.js GoogleMap</span>
          <div className="w-[30%] h-96">

            <MapComponent style="w-50% px-4 py-2 border-b-1[1px] border-[#E5E5E3]" address={address} setAddress={setAddress} radius={from.radius} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}/>
            
          </div>

          <div className="flex flex-col">
            <span className="text-xl">Address : {address}</span>
            <span className="text-xl">Latitude : {latitude}</span>
            <span className="text-xl">Longitude : {longitude}</span>
          </div>

      </div>
    </div>
  );
}
  
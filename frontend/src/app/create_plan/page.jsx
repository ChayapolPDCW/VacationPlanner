"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays } from "date-fns";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import dynamic from "next/dynamic";


//log
import("@googlemaps/react-wrapper").then(mod => {
    console.log("Exports from @googlemaps/react-wrapper:", mod);
});

// // Dynamically import GoogleMap, LoadScript, and Marker
// const LoadScript = dynamic(() => import("@googlemaps/react-wrapper").then(mod => mod.LoadScript), { ssr: false });
// const GoogleMap = dynamic(() => import("@googlemaps/react-wrapper").then(mod => mod.GoogleMap), { ssr: false });
// const Marker = dynamic(() => import("@googlemaps/react-wrapper").then(mod => mod.Marker), { ssr: false });

// Hardcoded places for demonstration
const placesData = [
    {
        id: 1,
        name: "Brooklyn Bridge, New York",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://via.placeholder.com/100",
        lat: 40.706086,
        lng: -73.996864,
        travelTime: "16 mins, 3.8 miles",
    },
    {
        id: 2,
        name: "Brooklyn Museum, New York",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://via.placeholder.com/100",
        lat: 40.671213,
        lng: -73.963641,
        travelTime: "10 mins, 2.5 miles",
    },
];

export default function CreatePlanPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: "",
        startDate: new Date(),
        endDate: addDays(new Date(), 2),
    });
    const [itinerary, setItinerary] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const days = differenceInDays(formData.endDate, formData.startDate) + 1;
        const newItinerary = [];
        for (let i = 0; i < days; i++) {
            const date = addDays(formData.startDate, i);
            newItinerary.push({
                date,
                places: i === 0 ? [placesData[0]] : i === 1 ? [placesData[1]] : [],
            });
        }
        setItinerary(newItinerary);
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStartDateChange = (e) => {
        setFormData({ ...formData, startDate: new Date(e.target.value) });
    };

    const handleEndDateChange = (e) => {
        setFormData({ ...formData, endDate: new Date(e.target.value) });
    };

    const handleAddPlace = (dayIndex) => {
        alert("Add a place functionality to be implemented");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.destination) {
            setError("Destination is required");
            return;
        }
        if (formData.endDate < formData.startDate) {
            setError("End Date cannot be before Start Date");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to create a plan");
                return;
            }

            const planData = {
                destination: formData.destination,
                startDate: formData.startDate,
                endDate: formData.endDate,
                itinerary: itinerary.map((day) => ({
                    date: day.date,
                    places: day.places,
                })),
            };

            const response = await axios.post(
                "http://localhost:5000/api/plans",
                planData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Plan created:", response.data);
            router.push("/plans");
        } catch (err) {
            console.error("Error creating plan:", err);
            setError(err.response?.data?.message || "Failed to create plan");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side: Form and Itinerary */}
                    <div>
                        <h1 className="text-3xl font-bold mb-6">Create Plan</h1>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Where do you want to go?
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Start date
                                    </label>
                                    <input
                                        type="date"
                                        value={format(formData.startDate, "yyyy-MM-dd")}
                                        onChange={handleStartDateChange}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        End date
                                    </label>
                                    <input
                                        type="date"
                                        value={format(formData.endDate, "yyyy-MM-dd")}
                                        onChange={handleEndDateChange}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Itinerary Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-h-[60vh] overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">
                                Itinerary - {differenceInDays(formData.endDate, formData.startDate) + 1} Days
                            </h2>
                            {itinerary.map((day, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="text-lg font-medium text-blue-600">
                                        {format(day.date, "d MMMM yyyy")}
                                    </h3>
                                    {day.places.map((place) => (
                                        <div
                                            key={place.id}
                                            className="flex items-center p-3 border rounded-lg mb-3"
                                        >
                                            <img
                                                src={place.image}
                                                alt={place.name}
                                                className="w-24 h-24 rounded-lg mr-4"
                                            />
                                            <div>
                                                <h4 className="text-md font-medium">
                                                    {place.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {place.description}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {place.travelTime}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => handleAddPlace(index)}
                                        className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                                    >
                                        Add a place
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-6"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Map */}
                    <div>
                        <div className="h-[80vh] rounded-lg shadow-md">
                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={{
                                        lat: placesData[0].lat,
                                        lng: placesData[0].lng,
                                    }}
                                    zoom={14}
                                >
                                    {placesData.map((place) => (
                                        <Marker
                                            key={place.id}
                                            position={{ lat: place.lat, lng: place.lng }}
                                            title={place.name}
                                        />
                                    ))}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
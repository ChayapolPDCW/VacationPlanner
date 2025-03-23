"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays } from "date-fns";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import "../styles.css"; // Ensure this exists for Autocomplete dropdown styling

export default function CreatePlanPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: "",
        startDate: new Date(), // Set to current day (March 23, 2025)
        endDate: new Date(), // Initially same as start date
        center: { lat: 0, lng: 0 }, // Will be updated after destination selection
    });
    const [itinerary, setItinerary] = useState([]);
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);
    const [step, setStep] = useState(1); // Step 1: Select destination, Step 2: Select dates, Step 3: Show itinerary
    const autocompleteRef = useRef(null);
    const placeAutocompleteRefs = useRef([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Update itinerary when dates change (after destination is selected)
    useEffect(() => {
        if (step === 3) {
            const days = differenceInDays(formData.endDate, formData.startDate) + 1;
            const newItinerary = [];
            for (let i = 0; i < days; i++) {
                const date = addDays(formData.startDate, i);
                newItinerary.push({
                    date,
                    places: [], // Start with empty places
                });
            }
            setItinerary(newItinerary);
            placeAutocompleteRefs.current = newItinerary.map(() => null);
        }
    }, [formData.startDate, formData.endDate, step]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEndDateChange = (e) => {
        const newEndDate = new Date(e.target.value);
        if (newEndDate < formData.startDate) {
            setError("End Date cannot be before Start Date");
            return;
        }
        setError("");
        setFormData({ ...formData, endDate: newEndDate });
    };

    const handlePlaceSelect = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setFormData({
                    ...formData,
                    destination: place.formatted_address || place.name,
                    center: { lat, lng },
                });
                setStep(2); // Move to date selection step
            } else {
                setError("Please select a valid destination from the suggestions");
            }
        }
    };

    const handleAddPlace = (dayIndex) => {
        if (placeAutocompleteRefs.current[dayIndex]) {
            const place = placeAutocompleteRefs.current[dayIndex].getPlace();
            if (place && place.geometry) {
                const newPlace = {
                    id: Date.now(),
                    name: place.name,
                    description: place.formatted_address || "No description available",
                    image: place.photos && place.photos.length > 0
                        ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
                        : "https://via.placeholder.com/100",
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    travelTime: "TBD",
                };

                const updatedItinerary = [...itinerary];
                updatedItinerary[dayIndex].places.push(newPlace);
                setItinerary(updatedItinerary);
            } else {
                console.log("No geometry available for this place");
            }
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const dayIndex = parseInt(result.source.droppableId, 10);
        const updatedItinerary = [...itinerary];
        const [reorderedPlace] = updatedItinerary[dayIndex].places.splice(result.source.index, 1);
        updatedItinerary[dayIndex].places.splice(result.destination.index, 0, reorderedPlace);
        setItinerary(updatedItinerary);
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

    const handleDatesSubmit = () => {
        if (formData.endDate < formData.startDate) {
            setError("End Date cannot be before Start Date");
            return;
        }
        setError("");
        setStep(3); // Move to itinerary step
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {isClient ? (
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
                        <div className="container mx-auto p-6 text-red-600">
                            {mapError}
                        </div>
                    ) : (
                        <div className="container mx-auto p-6">
                            <h1 className="text-3xl font-bold mb-6">Create Plan</h1>

                            {/* Step 1: Select Destination */}
                            {step === 1 && (
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">
                                            Where do you want to go?
                                        </label>
                                        {isMapLoaded ? (
                                            <Autocomplete
                                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                                onPlaceChanged={handlePlaceSelect}
                                            >
                                                <input
                                                    type="text"
                                                    name="destination"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter a destination"
                                                    required
                                                />
                                            </Autocomplete>
                                        ) : (
                                            <input
                                                type="text"
                                                name="destination"
                                                value={formData.destination}
                                                onChange={handleChange}
                                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Loading..."
                                                disabled
                                            />
                                        )}
                                    </div>
                                    {error && <p className="text-red-600">{error}</p>}
                                </div>
                            )}

                            {/* Step 2: Select Dates */}
                            {step === 2 && (
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <p className="text-gray-700 mb-2">
                                            Selected Destination: <strong>{formData.destination}</strong>
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2">
                                                Start date
                                            </label>
                                            <input
                                                type="date"
                                                value={format(formData.startDate, "yyyy-MM-dd")}
                                                className="w-full p-3 border rounded-lg bg-gray-100"
                                                disabled
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
                                                min={format(formData.startDate, "yyyy-MM-dd")} // Prevent selecting dates before start date
                                            />
                                        </div>
                                    </div>
                                    {error && <p className="text-red-600">{error}</p>}
                                    <button
                                        onClick={handleDatesSubmit}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                                    >
                                        Continue
                                    </button>
                                </div>
                            )}

                            {/* Step 3: Itinerary and Map */}
                            {step === 3 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Side: Form and Itinerary */}
                                    <div>
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">
                                                    Where do you want to go?
                                                </label>
                                                <input
                                                    type="text"
                                                    name="destination"
                                                    value={formData.destination}
                                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                                    disabled
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
                                                        className="w-full p-3 border rounded-lg bg-gray-100"
                                                        disabled
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 mb-2">
                                                        End date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={format(formData.endDate, "yyyy-MM-dd")}
                                                        className="w-full p-3 border rounded-lg bg-gray-100"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Itinerary Section */}
                                        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-h-[60vh] overflow-y-auto">
                                            <h2 className="text-xl font-semibold mb-4">
                                                Itinerary - {differenceInDays(formData.endDate, formData.startDate) + 1} Days
                                            </h2>
                                            <DragDropContext onDragEnd={handleDragEnd}>
                                                {itinerary.map((day, index) => (
                                                    <div key={index} className="mb-6">
                                                        <h3 className="text-lg font-medium text-blue-600">
                                                            {format(day.date, "d MMMM yyyy")}
                                                        </h3>
                                                        <Droppable droppableId={String(index)}>
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                    className="min-h-[50px]"
                                                                >
                                                                    {day.places.map((place, placeIndex) => (
                                                                        <Draggable
                                                                            key={place.id}
                                                                            draggableId={String(place.id)}
                                                                            index={placeIndex}
                                                                        >
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className="flex items-center p-3 border rounded-lg mb-3 bg-gray-50"
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
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                        {isMapLoaded ? (
                                                            <div className="flex items-center space-x-2 mb-3">
                                                                <Autocomplete
                                                                    onLoad={(autocomplete) =>
                                                                        (placeAutocompleteRefs.current[index] = autocomplete)
                                                                    }
                                                                    onPlaceChanged={() => handleAddPlace(index)}
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search for a place"
                                                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </Autocomplete>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                placeholder="Loading..."
                                                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                disabled
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </DragDropContext>
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
                                            {isMapLoaded ? (
                                                <GoogleMap
                                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                                    center={formData.center}
                                                    zoom={14}
                                                >
                                                    {itinerary.flatMap((day) => day.places).map((place) => (
                                                        <Marker
                                                            key={place.id}
                                                            position={{ lat: place.lat, lng: place.lng }}
                                                            title={place.name}
                                                        />
                                                    ))}
                                                </GoogleMap>
                                            ) : (
                                                <div>Loading map...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </LoadScript>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays, startOfDay } from "date-fns";
import {
    GoogleMap,
    LoadScript,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from 'react-toastify';

import { FaRegTrashAlt } from "react-icons/fa";

export default function CreatePlanPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: "",
        startDate: startOfDay(new Date()), // Normalize to start of day
        endDate: startOfDay(new Date()),   // Normalize to start of day
        center: { lat: 0, lng: 0 },
        note: "", // Add a new field for the plan-wide note
    });

    const [isEditingDestination, setIsEditingDestination] = useState(true);
    const [itinerary, setItinerary] = useState([]);
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);
    const [step, setStep] = useState(1);
    const [directions, setDirections] = useState({});
    const [activeDayIndex, setActiveDayIndex] = useState(null);
    const autocompleteRef = useRef(null);
    const placeAutocompleteRefs = useRef([]);
    const placeInputRefs = useRef([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const dayColors = [
        "#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#FFFF00",
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const hasPlaces = itinerary.some(day => day.places.length > 0);
        setHasUnsavedChanges(hasPlaces);
    }, [itinerary]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = "";
                return "You have unsaved changes. Are you sure you want to leave?";
            }
        };
    
        if (hasUnsavedChanges) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }
    
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    useEffect(() => {
        if (step >= 2) {
            const days = differenceInDays(formData.endDate, formData.startDate) + 1;
            console.log("Start Date:", formData.startDate);
            console.log("End Date:", formData.endDate);
            console.log("Days Calculated:", days);
            const newItinerary = [];
            for (let i = 0; i < days; i++) {
                const date = addDays(formData.startDate, i);
                newItinerary.push({
                    date,
                    places: itinerary[i]?.places || [],
                });
            }
            console.log("Generated Itinerary:", newItinerary);
            setItinerary(newItinerary);
            placeAutocompleteRefs.current = newItinerary.map(() => null);
            placeInputRefs.current = newItinerary.map(() => null);
            updateDirections(newItinerary);
        }
    }, [formData.startDate, formData.endDate, step]);

    const handleDestinationSubmit = () => {
        const place = autocompleteRef.current?.getPlace();
        if (!formData.destination || !place || !place.formatted_address) {
            setError("Please select a valid destination from the suggestions.");
            return;
        }

        setFormData({
            ...formData,
            center: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
        });

        setIsEditingDestination(false);
        setError("");
        if (step < 2) {
            setStep(2);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Handle both destination and note
        });
        setError("");
    };

    const handleStartDateChange = (e) => {
        const newStartDate = startOfDay(new Date(e.target.value)); // Normalize to start of day
        if (formData.endDate < newStartDate) {
            setFormData({ ...formData, startDate: newStartDate, endDate: newStartDate });
        } else {
            setFormData({ ...formData, startDate: newStartDate });
        }
    };

    const handleEndDateChange = (e) => {
        const newEndDate = startOfDay(new Date(e.target.value)); // Normalize to start of day
        if (newEndDate < formData.startDate) {
            setError("End Date cannot be before Start Date");
            return;
        }
        setError("");
        setFormData({ ...formData, endDate: newEndDate });
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
            setFormData({
                ...formData,
                destination: place.formatted_address,
            });
        } else {
            setError("Please select a valid destination from the suggestions.");
        }
    };

    const updateDirections = (updatedItinerary) => {
        const directionsService = new window.google.maps.DirectionsService();
        const newDirections = {};

        updatedItinerary.forEach((day, dayIndex) => {
            const places = day.places;
            if (places.length < 2) {
                newDirections[dayIndex] = null;
                return;
            }

            const waypoints = places.slice(1, -1).map((place) => ({
                location: { lat: place.lat, lng: place.lng },
                stopover: true,
            }));

            directionsService.route(
                {
                    origin: { lat: places[0].lat, lng: places[0].lng },
                    destination: { lat: places[places.length - 1].lat, lng: places[places.length - 1].lng },
                    waypoints,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        newDirections[dayIndex] = result;

                        const newItinerary = [...updatedItinerary];
                        const legs = result.routes[0].legs;
                        newItinerary[dayIndex].places.forEach((place, index) => {
                            if (index < places.length - 1) {
                                const leg = legs[index];
                                place.travelTime = `${leg.duration.text}, ${leg.distance.text}`;
                            } else {
                                place.travelTime = "N/A";
                            }
                        });
                        setItinerary(newItinerary);
                    } else {
                        console.error("Directions request failed:", status);
                        newDirections[dayIndex] = null;
                        const newItinerary = [...updatedItinerary];
                        newItinerary[dayIndex].places.forEach((place, index) => {
                            if (index < places.length - 1) {
                                place.travelTime = "Failed to calculate";
                            } else {
                                place.travelTime = "N/A";
                            }
                        });
                        setItinerary(newItinerary);
                    }
                    setDirections({ ...newDirections });
                }
            );
        });
    };

    const handleAddPlace = (dayIndex) => {
        if (placeAutocompleteRefs.current[dayIndex]) {
            const place = placeAutocompleteRefs.current[dayIndex].getPlace();
            if (place && place.geometry) {
                const newPlace = {
                    id: Date.now(),
                    name: place.name,
                    address: place.formatted_address || "No address available",
                    image: place.photos && place.photos.length > 0
                        ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
                        : "/images/fallback.jpeg",
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    travelTime: "TBD",
                };
    
                const updatedItinerary = [...itinerary];
                updatedItinerary[dayIndex].places.push(newPlace);
                setItinerary(updatedItinerary);
                updateDirections(updatedItinerary);
    
                if (placeInputRefs.current[dayIndex]) {
                    placeInputRefs.current[dayIndex].value = "";
                }
            } else {
                console.log("No geometry available for this place");
            }
        }
    };

    const handleDeletePlace = (dayIndex, placeId) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].places = updatedItinerary[dayIndex].places.filter(
            (place) => place.id !== placeId
        );
        setItinerary(updatedItinerary);
        updateDirections(updatedItinerary);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const dayIndex = parseInt(result.source.droppableId, 10);
        const updatedItinerary = [...itinerary];
        const [reorderedPlace] = updatedItinerary[dayIndex].places.splice(result.source.index, 1);
        updatedItinerary[dayIndex].places.splice(result.destination.index, 0, reorderedPlace);
        setItinerary(updatedItinerary);
        updateDirections(updatedItinerary);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        if (!formData.destination) {
            setError("Destination is required");
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
                note: formData.note, // Include the plan-wide note
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
            setHasUnsavedChanges(false);
            setItinerary([]);
            setFormData({
                destination: "",
                startDate: startOfDay(new Date()),
                endDate: startOfDay(new Date()),
                center: { lat: 0, lng: 0 },
                note: "", // Reset the note
            });
            localStorage.removeItem("itinerary");
            localStorage.removeItem("formData");
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
        setStep(3);
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Side: Form and Itinerary */}
                                <div>
                                    <h1 className="text-3xl font-bold mb-6 text-black">
                                        Create Plan
                                    </h1>
                                    {/* Step 1: Select Destination */}
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">
                                                Where do you want to go? (e.g. "New York, NY, USA")
                                            </label>
                                            {isMapLoaded ? (
                                                <div className="flex items-center space-x-2">
                                                    {isEditingDestination ? (
                                                        <Autocomplete
                                                            onLoad={(autocomplete) => {
                                                                autocompleteRef.current = autocomplete;
                                                            }}
                                                            onPlaceChanged={handlePlaceSelect}
                                                        >
                                                            <input
                                                                type="text"
                                                                name="destination"
                                                                value={formData.destination}
                                                                onChange={handleChange}
                                                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                                                                placeholder="Enter a destination"
                                                                required
                                                            />
                                                        </Autocomplete>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name="destination"
                                                            value={formData.destination}
                                                            className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed text-black"
                                                            readOnly
                                                        />
                                                    )}
                                                    {!isEditingDestination && (
                                                        <button
                                                            onClick={() => setIsEditingDestination(true)}
                                                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="destination"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="Loading..."
                                                    disabled
                                                />
                                            )}
                                        </div>
                                        {error && <p className="text-red-600">{error}</p>}
                                        {isEditingDestination && (
                                            <button
                                                onClick={handleDestinationSubmit}
                                                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                                            >
                                                {step < 2 ? "Save Destination" : "Save Destination"}
                                            </button>
                                        )}
                                    </div>
                                    {/* Step 2: Select Dates */}
                                    {step >= 2 && (
                                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-gray-700 mb-2">
                                                        Start date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={format(formData.startDate, "yyyy-MM-dd")}
                                                        onChange={handleStartDateChange}
                                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                                        min={format(formData.startDate, "yyyy-MM-dd")}
                                                    />
                                                </div>
                                            </div>
                                            {step < 3 && error && <p className="text-red-600">{error}</p>}
                                            {step < 3 && (
                                                <button
                                                    onClick={handleDatesSubmit}
                                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                                                >
                                                    Continue
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Step 3: Itinerary Section */}
                                    {step >= 3 && (
                                        <div className="flex flex-col h-[calc(100vh-200px)]">
                                            <div className="flex-1 bg-white p-6 rounded-lg shadow-md mt-6 overflow-y-auto pt-0">
                                                <div className="sticky top-0 bg-white z-10 border-b -mx-6 px-6 pt-6">
                                                    <h2 className="text-2xl font-semibold text-black mb-4">
                                                        Itinerary - {differenceInDays(formData.endDate, formData.startDate) + 1} Days
                                                    </h2>
                                                    {errorMessage && (
                                                        <p className="text-red-600 mb-4">{errorMessage}</p>
                                                    )}
                                                </div>
                                                <DragDropContext onDragEnd={handleDragEnd}>
                                                    {itinerary.map((day, index) => (
                                                        <div key={index} className="mt-6">
                                                            <h3 className="text-lg font-medium text-indigo-600">
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
                                                                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-4">
                                                                                            {placeIndex + 1}
                                                                                        </div>
                                                                                        <img
                                                                                            src={place.image}
                                                                                            alt={place.name}
                                                                                            className="w-24 h-24 rounded-lg mr-4"
                                                                                        />
                                                                                        <div className="flex-1">
                                                                                            <h4 className="text-md font-medium">
                                                                                                {place.name}
                                                                                            </h4>
                                                                                            <p className="text-sm text-gray-600">
                                                                                                {place.address}
                                                                                            </p>
                                                                                            <p className="text-xs text-gray-500 mt-1">
                                                                                                Travel Time to Next Location: {place.travelTime}
                                                                                            </p>
                                                                                        </div>
                                                                                        <button
                                                                                            onClick={() => handleDeletePlace(index, place.id)}
                                                                                            className="ml-4 text-red-600 hover:text-red-800 font-medium"
                                                                                        >
                                                                                            <FaRegTrashAlt className="text-xl mr-3 ml-1" />
                                                                                        </button>
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
                                                                        onLoad={(autocomplete) => {
                                                                            placeAutocompleteRefs.current[index] = autocomplete;
                                                                        }}
                                                                        onPlaceChanged={() => handleAddPlace(index)}
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Search for a place"
                                                                            ref={(el) => (placeInputRefs.current[index] = el)}
                                                                            onFocus={() => setActiveDayIndex(index)}
                                                                            onBlur={() => setActiveDayIndex(null)}
                                                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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

                                                {/* New Note Section for the Entire Plan */}
                                                <div className="mt-6">
                                                    <h2 className="text-xl font-semibold text-black mb-2">
                                                        Note
                                                    </h2>
                                                    <textarea
                                                        name="note"
                                                        value={formData.note}
                                                        onChange={handleChange}
                                                        placeholder="Add any notes for your plan here (e.g., 'Bring sunscreen for Bali beaches!')"
                                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                                                        rows="4"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSubmit}
                                                className="w-full bg-blue-600 text-white py-3 mt-4 shadow-lg rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                            >
                                                Save Plan
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Map */}
                                <div className="relative">
                                    <div className="sticky top-4 h-[100vh] rounded-lg shadow-md">
                                    {isMapLoaded ? (
                                        <GoogleMap
                                            mapContainerStyle={{ width: "100%", height: "100%" }}
                                            center={formData.center}
                                            zoom={formData.destination ? 14 : 2}
                                        >
                                            {itinerary
                                                .filter((day, dayIndex) => activeDayIndex === null || dayIndex === activeDayIndex)
                                                .flatMap((day, dayIndex) =>
                                                    day.places.map((place, placeIndex) => (
                                                        <Marker
                                                            key={place.id}
                                                            position={{ lat: place.lat, lng: place.lng }}
                                                            icon={{
                                                                path: window.google.maps.SymbolPath.CIRCLE,
                                                                fillColor: dayColors[dayIndex % dayColors.length],
                                                                fillOpacity: 1,
                                                                strokeColor: "#FFFFFF",
                                                                strokeWeight: 2,
                                                                scale: 12,
                                                            }}
                                                            title={place.name}
                                                            label={{
                                                                text: String(placeIndex + 1), // Convert to string for the label
                                                                color: "#FFFFFF", // White text for contrast against the colored circle
                                                                fontSize: "11px", // Smaller font size to fit inside the circle
                                                                fontWeight: "bold", // Bold text for better readability
                                                            }}
                                                        />
                                                    ))
                                                )}
                                            {Object.keys(directions)
                                                .filter((dayIndex) => activeDayIndex === null || parseInt(dayIndex) === activeDayIndex)
                                                .map((dayIndex) =>
                                                    directions[dayIndex] ? (
                                                        <DirectionsRenderer
                                                            key={dayIndex}
                                                            directions={directions[dayIndex]}
                                                            options={{
                                                                polylineOptions: {
                                                                    strokeColor: dayColors[parseInt(dayIndex) % dayColors.length],
                                                                    strokeOpacity: 0.8,
                                                                    strokeWeight: 5,
                                                                },
                                                                suppressMarkers: true, // Suppress default markers
                                                            }}
                                                        />
                                                    ) : null
                                                )}
                                        </GoogleMap>
                                    ) : (
                                        <div>Loading map...</div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </LoadScript>
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <div className="text-2xl text-indigo-600 font-semibold">
                        Loading...
                    </div>
                </div>
            )}
        </div>
    );
}
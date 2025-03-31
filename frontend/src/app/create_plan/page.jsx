"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays } from "date-fns";
import {
    GoogleMap,
    LoadScript,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from 'react-toastify';

import { FaCheck } from 'react-icons/fa';
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CreatePlanPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: "",
        startDate: new Date(),
        endDate: new Date(),
        center: { lat: 0, lng: 0 },
        planName: "",
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
    const [editingDescription, setEditingDescription] = useState({});
    const [editMode, setEditMode] = useState({});
    const autocompleteRef = useRef(null);
    const placeAutocompleteRefs = useRef([]);
    const placeInputRefs = useRef([]);

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Colors for each day
    const dayColors = [
        "#FF0000", // Red
        "#0000FF", // Blue
        "#008000", // Green
        "#FFA500", // Orange
        "#800080", // Purple
        "#FFFF00", // Yellow
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    // update state when itinerary changes
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
    
        // Addif there are unsaved changes
        if (hasUnsavedChanges) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }
    
        // Clean up when hasUnsavedChanges changes
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    useEffect(() => {
        if (isMapLoaded && window.google && window.google.maps) {
            const input = document.querySelector('input[name="destination"]');
            if (input) {
                autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
                    types: ["geocode"],
                });
                autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
            }
        }
    }, [isMapLoaded]);

    useEffect(() => {
        if (step >= 2) {
            // Calculate the number of days (inclusive of start and end dates)
            const days = differenceInDays(formData.endDate, formData.startDate) + 1; // Fix: +1 instead of +2
            const newItinerary = [];
            for (let i = 0; i < days; i++) {
                const date = addDays(formData.startDate, i);
                newItinerary.push({
                    date,
                    places: itinerary[i]?.places || [],
                });
            }
            setItinerary(newItinerary);
            placeAutocompleteRefs.current = newItinerary.map(() => null);
            placeInputRefs.current = newItinerary.map(() => null);
            updateDirections(newItinerary);
        }
    }, [formData.startDate, formData.endDate, step]);

    const handleContinue = () => {
        const place = autocompleteRef.current?.getPlace();
        if (!formData.destination || !place || !place.formatted_address) {
            setError("Please select a valid destination from the suggestions.");
            return;
        }
    
        // Extract the city name from the place
        let cityName = "";
        if (place.address_components) {
            const cityComponent = place.address_components.find((component) =>
                component.types.includes("locality")
            );
            cityName = cityComponent ? cityComponent.long_name : "";
        }
    
        // Fallback: If city name couldn't be determined, use the first part of the destination
        if (!cityName) {
            cityName = formData.destination.split(",")[0].trim(); // e.g., "New York" from "New York, NY, USA"
        }
    
        // Set the planName and center coordinates
        setFormData({
            ...formData,
            planName: `${cityName} Trip`, // e.g., "New York Trip"
            center: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
        });
    
        // Switch to read-only mode and proceed to the next step
        setIsEditingDestination(false);
        setStep(2);
    };

    const handleNext = () => {
        if (step === 1) {
            // Use Google Maps Geocoding API to get the coordinates of the destination
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: formData.destination }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    
                    // Extract the city name from the destination
                    const addressComponents = results[0].address_components;
                    let cityName = "";
                    for (const component of addressComponents) {
                        if (component.types.includes("locality")) {
                            cityName = component.long_name; // e.g., "New York"
                            break;
                        }
                    }
    
                    // If cityName couldn't be determined, fall back to the first part of the destination
                    if (!cityName) {
                        cityName = formData.destination.split(",")[0].trim(); // e.g., "New York" from "New York, NY, USA"
                    }
    
                    // Set the planName and update formData
                    setFormData({
                        ...formData,
                        center: { lat: location.lat(), lng: location.lng() },
                        planName: `${cityName} Trip`, // e.g., "New York Trip"
                    });
    
                    // Initialize itinerary based on the number of days
                    const days = differenceInDays(formData.endDate, formData.startDate) + 2;
                    const newItinerary = Array.from({ length: days }, (_, index) => ({
                        date: addDays(formData.startDate, index),
                        places: [],
                    }));
                    setItinerary(newItinerary);
                    setIsEditingDestination(false); // Switch to text display mode
                    setStep(step + 1);
                } else {
                    setError("Invalid destination. Please enter a valid location.");
                }
            });
        } else {
            setStep(step + 1);
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            destination: e.target.value,
        });
        setError(""); // Clear any error when the user starts typing
    };

    const handleStartDateChange = (e) => {
        const newStartDate = new Date(e.target.value);
        if (formData.endDate < newStartDate) {
            setFormData({ ...formData, startDate: newStartDate, endDate: newStartDate });
        } else {
            setFormData({ ...formData, startDate: newStartDate });
        }
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
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
            setFormData({
                ...formData,
                destination: place.formatted_address, // e.g., "New York, NY, USA"
            });
        } else {
            setError("Please select a valid destination from the suggestions.");
        }
    };

    const handleAddPlace = (dayIndex) => {
        if (placeAutocompleteRefs.current[dayIndex]) {
            const place = placeAutocompleteRefs.current[dayIndex].getPlace();
            if (place && place.geometry) {
                const newPlace = {
                    id: Date.now(),
                    name: place.name,
                    address: place.formatted_address || "No address available",
                    description: "",
                    customDescription: "",
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
    
                // Set initial edit mode to true for the new place
                setEditMode(prev => ({ ...prev, [newPlace.id]: true }));
    
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

    const handleDescriptionChange = (dayIndex, placeId, value) => {
        const updatedItinerary = [...itinerary];
        const place = updatedItinerary[dayIndex].places.find(p => p.id === placeId);
        if (place) {
            place.customDescription = value;
            setItinerary(updatedItinerary);
            setEditingDescription(prev => ({ ...prev, [placeId]: value !== "" }));
        }
    };
    
    const handleSaveDescription = (dayIndex, placeId) => {
        const updatedItinerary = [...itinerary];
        const place = updatedItinerary[dayIndex].places.find(p => p.id === placeId);
        if (place) {
            // Save the description even if customDescription is empty
            place.description = place.customDescription !== undefined ? place.customDescription : place.description;
            setItinerary(updatedItinerary);
            setEditingDescription(prev => ({ ...prev, [placeId]: false }));
            setEditMode(prev => ({ ...prev, [placeId]: false })); // Exit edit mode after saving
        }
    };
    
    const handleEditDescription = (placeId) => {
        const updatedItinerary = [...itinerary];
        const place = updatedItinerary.flatMap(day => day.places).find(p => p.id === placeId);
        if (place) {
            place.customDescription = place.description; // Reset customDescription to the saved description
            setItinerary(updatedItinerary);
        }
        setEditMode(prev => ({ ...prev, [placeId]: true })); // Enter edit mode
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
            setItinerary([]); // Reset itinerary
            setFormData({
                destination: "",
                startDate: null,
                endDate: null,
                center: { lat: 0, lng: 0 },
            }); // Reset formData
            localStorage.removeItem("itinerary"); // Clear saved itinerary
            localStorage.removeItem("formData"); // Clear saved formData
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
                                    {formData.planName && step >= 2 ? (
                                        <h1 className="text-3xl font-bold mb-6 text-black">
                                            {formData.planName}
                                        </h1>
                                    ) : (
                                        <h1 className="text-3xl font-bold mb-6 text-black">Create Plan</h1>
                                    )}
                                        {/* Step 1: Select Destination */}
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">
                                                    Where do you want to go? (e.g. "New York, NY, USA")
                                                </label>
                                                {isMapLoaded ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            name="destination"
                                                            value={formData.destination}
                                                            onChange={handleChange}
                                                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${
                                                                isEditingDestination ? "" : "bg-gray-100 cursor-not-allowed"
                                                            }`}
                                                            placeholder="Enter a destination"
                                                            readOnly={!isEditingDestination} // Make read-only when not editing
                                                            required
                                                            {...(isEditingDestination && {
                                                                ref: (input) => {
                                                                    if (autocompleteRef.current) {
                                                                        autocompleteRef.current.set("input", input);
                                                                    }
                                                                },
                                                                onPlaceChanged: handlePlaceSelect,
                                                            })}
                                                        />
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
                                            {step < 2 && error && <p className="text-red-600">{error}</p>}
                                            {step < 2 && isEditingDestination && (
                                                <button
                                                    onClick={handleContinue}
                                                    className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                                                >
                                                    Continue
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
                                                                                            <hr className="my-2 border-gray-300" />
                                                                                            <div className="mt-2">
                                                                                                <label className="text-sm font-medium text-gray-700">
                                                                                                    Note
                                                                                                </label>
                                                                                                {editMode[place.id] ? (
                                                                                                    <div className="flex items-start space-x-2 mt-1">
                                                                                                        <textarea
                                                                                                            value={place.customDescription}
                                                                                                            onChange={(e) => handleDescriptionChange(index, place.id, e.target.value)}
                                                                                                            placeholder="e.g. The mall opens at 10 AM."
                                                                                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm resize-y min-h-[80px]"
                                                                                                            rows="3"
                                                                                                        />
                                                                                                        <button
                                                                                                            onClick={() => handleSaveDescription(index, place.id)}
                                                                                                            className="text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                                                                                                            title="Save note"
                                                                                                            aria-label="Save note"
                                                                                                        >
                                                                                                            <FaCheck className="text-lg mr-3 ml-1" />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div className="flex items-center space-x-2 mt-1">
                                                                                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                                                                                            {place.description || "Add some note here."}
                                                                                                        </p>
                                                                                                        <button
                                                                                                            onClick={() => handleEditDescription(place.id)}
                                                                                                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                                                                                        >
                                                                                                            <FaPen className="text-md mr-3 ml-1" />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
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
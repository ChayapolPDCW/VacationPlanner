"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays, startOfDay } from "date-fns";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import { MapContext } from "@/app/ClientLayout";

export default function CreatePlanPage() {
  const router = useRouter();
  const { isMapLoaded, mapError } = useContext(MapContext); // Use MapContext instead of LoadScript

  const [formData, setFormData] = useState({
    title: "",
    cityTitle: "",
    start_date: startOfDay(new Date()),
    end_date: startOfDay(new Date()),
    center: { lat: 0, lng: 0 },
    notes: "",
    visibility: "PRIVATE",
  });

  const [isEditingCityTitle, setIsEditingCityTitle] = useState(true);
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const [directions, setDirections] = useState({});
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const autocompleteRef = useRef(null);
  const placeAutocompleteRefs = useRef([]);
  const placeInputRefs = useRef([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const dayColors = [
    "#FF0000",
    "#0000FF",
    "#008000",
    "#FFA500",
    "#800080",
    "#FFFF00",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const hasPlaces = itinerary.some((day) => day.places.length > 0);
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
      const days = differenceInDays(formData.end_date, formData.start_date) + 1;
      const newItinerary = [];
      for (let i = 0; i < days; i++) {
        const date = addDays(formData.start_date, i);
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
  }, [formData.start_date, formData.end_date, step]);

  const handleCityTitleSubmit = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!formData.cityTitle || !place || !place.formatted_address) {
      setError("Please select a valid city from the suggestions.");
      return;
    }

    setFormData({
      ...formData,
      center: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
    });

    setIsEditingCityTitle(false);
    setError("");
    if (step < 2) {
      setStep(2);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleVisibilityChange = (e) => {
    setFormData({
      ...formData,
      visibility: e.target.checked ? "PUBLIC" : "PRIVATE",
    });
  };

  const handleStartDateChange = (e) => {
    const newStartDate = startOfDay(new Date(e.target.value));
    if (formData.end_date < newStartDate) {
      setFormData({ ...formData, start_date: newStartDate, end_date: newStartDate });
    } else {
      setFormData({ ...formData, start_date: newStartDate });
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = startOfDay(new Date(e.target.value));
    if (newEndDate < formData.start_date) {
      setError("End Date cannot be before Start Date");
      return;
    }
    setError("");
    setFormData({ ...formData, end_date: newEndDate });
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData({
        ...formData,
        cityTitle: place.formatted_address,
      });
    } else {
      setError("Please select a valid city from the suggestions.");
    }
  };

  const updateDirections = (updatedItinerary) => {
    if (!isMapLoaded || typeof window === "undefined" || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    const newDirections = {};

    updatedItinerary.forEach((day, dayIndex) => {
      const places = day.places;
      if (places.length < 2) {
        newDirections[dayIndex] = null;
        return;
      }

      const waypoints = places.slice(1, -1).map((place) => ({
        location: { lat: place.latitude, lng: place.longitude },
        stopover: true,
      }));

      directionsService.route(
        {
          origin: { lat: places[0].latitude, lng: places[0].longitude },
          destination: {
            lat: places[places.length - 1].latitude,
            lng: places[places.length - 1].longitude,
          },
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
      if (place && place.geometry && place.place_id) {
        console.log("Place added:", place);
        let photoUrl = "/images/fallback.png";
        try {
          if (place.photos && place.photos.length > 0) {
            photoUrl = place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 });
            console.log("Photo URL:", photoUrl);
          }
        } catch (error) {
          console.error("Error getting photo URL:", error);
          photoUrl = "/images/fallback.png";
        }
        
        const newPlace = {
          title: place.name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          photoUrl: photoUrl,
          googlePlaceId: place.place_id,
          travelTime: "TBD",
          notes: "", // เพิ่มฟิลด์ notes สำหรับแต่ละสถานที่
        };

        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].places.push(newPlace);
        setItinerary(updatedItinerary);
        updateDirections(updatedItinerary);
        
        // ตั้งค่า activeDayIndex ให้เป็นวันที่กำลังเพิ่มสถานที่อยู่
        setActiveDayIndex(dayIndex);

        if (placeInputRefs.current[dayIndex]) {
          placeInputRefs.current[dayIndex].value = "";
        }
      } else {
        console.log("No geometry or place_id available for this place");
        toast.error("Please select a valid place with location data.");
      }
    }
  };

  const handleDeletePlace = (dayIndex, placeIndex) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].places.splice(placeIndex, 1);
    setItinerary(updatedItinerary);
    updateDirections(updatedItinerary);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDay = parseInt(result.source.droppableId);
    const destinationDay = parseInt(result.destination.droppableId);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newItinerary = [...itinerary];
    const [removed] = newItinerary[sourceDay].places.splice(sourceIndex, 1);
    newItinerary[destinationDay].places.splice(destinationIndex, 0, removed);

    setItinerary(newItinerary);
    setHasUnsavedChanges(true);
    updateDirections(newItinerary);
  };
  
  // ฟังก์ชันสำหรับอัปเดต notes ของแต่ละสถานที่
  const handlePlaceNotesChange = (dayIndex, placeIndex, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].places[placeIndex].notes = value;
    setItinerary(updatedItinerary);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Plan name is required");
      return;
    }
    if (!formData.cityTitle) {
      setError("Destination is required");
      return;
    }

    try {
      const planData = {
        title: formData.title,
        cityTitle: formData.cityTitle,
        startDate: formData.start_date.toISOString(),
        endDate: formData.end_date.toISOString(),
        notes: formData.notes || "",
        visibility: formData.visibility,
        itinerary: itinerary.map((day) => ({
          startDate: day.date.toISOString(),
          places: day.places.map((place) => ({
            title: place.title,
            latitude: place.latitude,
            longitude: place.longitude,
            photoUrl: place.photoUrl,
            googlePlaceId: place.googlePlaceId,
            notes: place.notes || "", // เพิ่มข้อมูล notes ของแต่ละสถานที่
          })),
        })),
      };

      const response = await axios.post("/api/plans", planData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Plan created:", response.data);
      toast.success("Travel plan created successfully!");
      setHasUnsavedChanges(false);
      setItinerary([]);
      setFormData({
        title: "",
        cityTitle: "",
        start_date: startOfDay(new Date()),
        end_date: startOfDay(new Date()),
        center: { lat: 0, lng: 0 },
        notes: "",
        visibility: "PRIVATE",
      });
      localStorage.removeItem("itinerary");
      localStorage.removeItem("formData");
      router.push("/plans");
    } catch (err) {
      console.error("Error creating plan:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to create plan";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDatesSubmit = () => {
    if (formData.end_date < formData.start_date) {
      setError("End Date cannot be before Start Date");
      return;
    }
    setError("");
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isClient ? (
        mapError ? (
          <div className="container mx-auto p-6 text-red-600">{mapError}</div>
        ) : (
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Form and Itinerary */}
              <div>
                <h1 className="text-3xl font-bold mb-6 text-black">
                  Create Plan
                </h1>
                {/* Step 0: Enter plan name */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                  <label className="block text-gray-700 mb-2">
                    Enter your plan name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    placeholder="e.g. Summer in Bali"
                  />
                </div>
                {/* Step 1: Select City */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      What city do you want to go? (e.g., "New York, NY, USA")
                    </label>
                    {isMapLoaded ? (
                      <>
                        {isEditingCityTitle ? (
                          <Autocomplete
                            onLoad={(autocomplete) => {
                              autocompleteRef.current = autocomplete;
                            }}
                            onPlaceChanged={handlePlaceSelect}
                          >
                            <input
                              type="text"
                              name="cityTitle"
                              value={formData.cityTitle}
                              onChange={handleChange}
                              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                              placeholder="Enter a city"
                              required
                            />
                          </Autocomplete>
                        ) : (
                          <div>
                            <input
                              type="text"
                              name="cityTitle"
                              value={formData.cityTitle}
                              className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed text-black"
                              readOnly
                            />
                            <button
                              onClick={() => setIsEditingCityTitle(true)}
                              className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <input
                        type="text"
                        name="cityTitle"
                        value={formData.cityTitle}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Loading..."
                        disabled
                      />
                    )}
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  {isEditingCityTitle && (
                    <button
                      onClick={handleCityTitleSubmit}
                      className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                    >
                      Save destination
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
                          value={format(formData.start_date, "yyyy-MM-dd")}
                          onChange={handleStartDateChange}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          End date
                        </label>
                        <input
                          type="date"
                          value={format(formData.end_date, "yyyy-MM-dd")}
                          onChange={handleEndDateChange}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                          min={format(formData.start_date, "yyyy-MM-dd")}
                        />
                      </div>
                    </div>

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
                          Itinerary -{" "}
                          {differenceInDays(formData.end_date, formData.start_date) + 1}{" "}
                          Days
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
                                      key={`${index}-${placeIndex}`}
                                      draggableId={`${index}-${placeIndex}`}
                                      index={placeIndex}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="flex items-center p-3 border rounded-lg mb-3 bg-gray-50"
                                        >
                                          <div 
                                            className="flex items-center justify-center w-8 h-8 text-white rounded-full mr-4"
                                            style={{ backgroundColor: dayColors[index % dayColors.length] }}
                                          >
                                            {placeIndex + 1}
                                          </div>
                                          {place.photoUrl.includes("maps.googleapis.com") ? (
                                            <div className="w-24 h-24 rounded-lg mr-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                                              <img 
                                                src="/images/fallback.jpeg"
                                                alt={place.title}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          ) : (
                                            <img
                                              src={place.photoUrl}
                                              alt={place.title}
                                              className="w-24 h-24 rounded-lg mr-4 object-cover"
                                              onError={(e) => {
                                                console.error("Image failed to load:", place.photoUrl);
                                                e.target.src = "/images/fallback.jpeg";
                                              }}
                                            />
                                          )}
                                          <div className="flex-1">
                                            <h4 className="text-md font-medium">
                                              {place.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                              Travel Time to Next Location: {place.travelTime}
                                            </p>
                                            <div className="mt-2">
                                              <textarea
                                                placeholder="Add notes for this place..."
                                                value={place.notes || ""}
                                                onChange={(e) => handlePlaceNotesChange(index, placeIndex, e.target.value)}
                                                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows="2"
                                              />
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => handleDeletePlace(index, placeIndex)}
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
                                    // ไม่ตั้งค่า activeDayIndex เป็น null เมื่อ blur เพื่อให้ยังคงแสดงเฉพาะวันที่กำลังทำงานอยู่
                                    className="w-full
                                     p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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

                      {/* Note Section for the Entire Plan */}
                      {/* <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-2">
                          Notes
                        </h2>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Add any notes for your plan here (e.g., 'Bring sunscreen for Bali beaches!')"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                          rows="4"
                        />
                      </div> */}
                    </div>
                    {/* Visibility Checkbox and Save Plan Button */}
                    <div className="mt-4">
                      <label className="flex items-center space-x-2 text-black">
                        <input
                          type="checkbox"
                          checked={formData.visibility === "PUBLIC"}
                          onChange={handleVisibilityChange}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span>Share to the community</span>
                      </label>
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 text-white py-3 mt-2 shadow-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Save Plan
                      </button>
                    </div>
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
                      zoom={formData.cityTitle ? 14 : 2}
                    >
                      {itinerary
                        .filter(
                          (day, dayIndex) =>
                            activeDayIndex === null || dayIndex === activeDayIndex
                        )
                        .flatMap((day, dayIndex) =>
                          day.places.map((place, placeIndex) => (
                            <Marker
                              key={`marker-${dayIndex}-${placeIndex}`}
                              position={{ lat: place.latitude, lng: place.longitude }}
                              icon={{
                                path: window.google.maps.SymbolPath.CIRCLE,
                                fillColor: dayColors[activeDayIndex % dayColors.length],
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                                scale: 12,
                              }}
                              title={place.title}
                              label={{
                                text: String(placeIndex + 1),
                                color: "#FFFFFF",
                                fontSize: "11px",
                                fontWeight: "bold",
                              }}
                            />
                          ))
                        )}
                      {Object.keys(directions)
                        .filter(
                          (dayIndex) =>
                            activeDayIndex === null || parseInt(dayIndex) === activeDayIndex
                        )
                        .map((dayIndex) =>
                          directions[dayIndex] ? (
                            <DirectionsRenderer
                              key={dayIndex}
                              directions={directions[dayIndex]}
                              options={{
                                polylineOptions: {
                                  strokeColor:
                                    dayColors[dayIndex % dayColors.length],
                                  strokeOpacity: 0.8,
                                  strokeWeight: 5,
                                },
                                suppressMarkers: true,
                              }}
                            />
                          ) : null
                        )}
                    </GoogleMap>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-2xl text-indigo-600 font-semibold">
                        {mapError ? "Map failed to load" : "Loading map..."}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { format, differenceInDays, addDays, startOfDay, parseISO } from "date-fns";
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
import { useUser } from "@/context/UserContext";
import Loading from "@/app/feed/loading";

export default function DuplicatePlanPage() {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const planId = parseInt(params.id);
  const { isMapLoaded, mapError } = useContext(MapContext);

  const [formData, setFormData] = useState({
    title: "",
    cityTitle: "",
    start_date: startOfDay(new Date()),
    end_date: startOfDay(new Date()),
    center: { lat: 0, lng: 0 },
    notes: "",
    visibility: "PRIVATE",
  });

  const [isEditingCityTitle, setIsEditingCityTitle] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(2); // เริ่มที่ขั้นตอนที่ 2 เลย เพราะเรามีข้อมูลเมืองแล้ว
  const [directions, setDirections] = useState({});
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const autocompleteRef = useRef(null);
  const placeAutocompleteRefs = useRef([]);
  const placeInputRefs = useRef([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  
  // ดึงข้อมูลแผนการเดินทางต้นฉบับ
  useEffect(() => {
    const fetchPlanData = async () => {
      if (!user || !user.id) {
        router.push('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.NEXT_API_URL}/api/plans/${planId}`, {
          withCredentials: true
        });

        if (response.data.status === "success") {
          const planData = response.data.data;
          
          // แปลงวันที่จาก string เป็น Date object
          const startDate = parseISO(planData.startDate);
          const endDate = parseISO(planData.endDate);
          
          // ตั้งค่าข้อมูลในฟอร์ม
          setFormData({
            title: `Copy of ${planData.title}`,
            cityTitle: planData.cityTitle,
            start_date: startOfDay(startDate),
            end_date: startOfDay(endDate),
            center: planData.itinerary[0]?.places[0] ? 
              { lat: planData.itinerary[0].places[0].latitude, lng: planData.itinerary[0].places[0].longitude } : 
              { lat: 0, lng: 0 },
            notes: planData.notes || "",
            visibility: "PRIVATE", // ตั้งค่าเริ่มต้นเป็น PRIVATE
          });
          
          // แปลงข้อมูล itinerary
          const newItinerary = planData.itinerary.map(day => {
            return {
              date: parseISO(day.startDate),
              places: day.places.map(place => ({
                id: place.id,
                title: place.title,
                latitude: place.latitude,
                longitude: place.longitude,
                photoUrl: place.photoUrl,
                googlePlaceId: place.googlePlaceId,
                travelTime: place.travelTime
              }))
            };
          });
          
          setItinerary(newItinerary);
          placeAutocompleteRefs.current = newItinerary.map(() => null);
          placeInputRefs.current = newItinerary.map(() => null);
          
          // อัปเดต directions
          if (isMapLoaded) {
            updateDirections(newItinerary);
          }
        } else {
          setError("ไม่สามารถดึงข้อมูลแผนการเดินทางได้");
        }
      } catch (error) {
        console.error("Error fetching plan data:", error);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลแผนการเดินทาง");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanData();
  }, [user, planId, router, isMapLoaded]);

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
          notes: "", // เพิ่มฟิลด์ notes เปล่าสำหรับสถานที่ใหม่
        };

        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].places.push(newPlace);
        setItinerary(updatedItinerary);
        updateDirections(updatedItinerary);
        
        // ตั้งค่า activeDayIndex ให้เป็นวันที่กำลังเพิ่มสถานที่อยู่
        setActiveDayIndex(dayIndex);

        // ล้างค่าในช่องค้นหา
        if (placeInputRefs.current[dayIndex]) {
          placeInputRefs.current[dayIndex].value = "";
        }
        
        // แจ้งเตือนเมื่อเพิ่มสถานที่สำเร็จ
        toast.success(`เพิ่ม ${place.name} เข้าในแผนการเดินทางแล้ว`);
      } else {
        console.log("No geometry or place_id available for this place");
        toast.error("กรุณาเลือกสถานที่ที่มีข้อมูลตำแหน่งที่ถูกต้อง");
      }
    }
  };

  const handleDeletePlace = (dayIndex, placeIndex) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].places.splice(placeIndex, 1);
    setItinerary(updatedItinerary);
    updateDirections(updatedItinerary);
  };
  
  // ฟังก์ชันสำหรับอัปเดต notes ของแต่ละสถานที่
  const handlePlaceNotesChange = (dayIndex, placeIndex, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex].places[placeIndex].notes = value;
    setItinerary(updatedItinerary);
    setHasUnsavedChanges(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const dayIndex = parseInt(result.source.droppableId, 10);
    const updatedItinerary = [...itinerary];
    const [reorderedPlace] = updatedItinerary[dayIndex].places.splice(
      result.source.index,
      1
    );
    updatedItinerary[dayIndex].places.splice(
      result.destination.index,
      0,
      reorderedPlace
    );
    setItinerary(updatedItinerary);
    updateDirections(updatedItinerary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Plan name is required");
      return;
    }
    if (!formData.cityTitle) {
      setError("Please select a destination");
      return;
    }

    try {
      // Format the itinerary data for the API
      const formattedItinerary = itinerary.map((day) => ({
        startDate: format(day.date, "yyyy-MM-dd"),
        places: day.places.map((place) => ({
          title: place.title,
          latitude: place.latitude,
          longitude: place.longitude,
          photoUrl: place.photoUrl,
          googlePlaceId: place.googlePlaceId,
          travelTime: place.travelTime,
          notes: place.notes || "", // เพิ่มข้อมูล notes ของแต่ละสถานที่
        })),
      }));

      // Create the plan data to send to the API
      const planData = {
        title: formData.title,
        cityTitle: formData.cityTitle,
        startDate: format(formData.start_date, "yyyy-MM-dd"),
        endDate: format(formData.end_date, "yyyy-MM-dd"),
        visibility: formData.visibility,
        notes: formData.notes,
        itinerary: formattedItinerary,
      };

      // Send the data to the API
      const response = await axios.post(
        `${process.env.NEXT_API_URL}/api/plans`,
        planData,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast.success("Plan duplicated successfully!");
        router.push(`/plans/${response.data.data.id}`);
      } else {
        setError("Failed to duplicate plan");
      }
    } catch (error) {
      console.error("Error duplicating plan:", error);
      setError("An error occurred while duplicating the plan");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => router.push("/plans")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Duplicate Plan</h1>
          <button
            onClick={() => router.push("/plans")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Form and Itinerary */}
          <div>
            {/* Step 0: Enter plan name */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <label className="block text-gray-700 mb-2">Enter your plan name</label>
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
                <input
                  type="text"
                  name="cityTitle"
                  value={formData.cityTitle}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter a city"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </div>
            
            {/* Step 2: Select Dates */}
            {step >= 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Start date</label>
                    <input
                      type="date"
                      value={format(formData.start_date, "yyyy-MM-dd")}
                      onChange={handleStartDateChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End date</label>
                    <input
                      type="date"
                      value={format(formData.end_date, "yyyy-MM-dd")}
                      onChange={handleEndDateChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      min={format(formData.start_date, "yyyy-MM-dd")}
                    />
                  </div>
                </div>
                {step < 3 && error && <p className="text-red-600">{error}</p>}
                {step < 3 && (
                  <button
                    onClick={() => setStep(3)}
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
                      Itinerary - {differenceInDays(formData.end_date, formData.start_date) + 1} Days
                    </h2>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
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
                                      <div className="w-24 h-24 rounded-lg mr-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                                          <img 
                                          src={place.photoUrl || "/images/fallback.png"}
                                            alt={place.title}
                                            className="w-full h-full object-cover"
                                          />
                                        
                                      </div>
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

                  {/* Note Section for the Entire Plan */}
                  <div className="mt-6">
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
                  </div>
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
                    Create My Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Map */}
          <div className="relative">
            <div className="sticky top-4 h-[calc(100vh-2rem)] rounded-lg shadow-md overflow-hidden">
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
                            fillColor: dayColors[activeDayIndex !== null ? activeDayIndex % dayColors.length : dayIndex % dayColors.length],
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
                          key={`directions-${dayIndex}`}
                          directions={directions[dayIndex]}
                          options={{
                            polylineOptions: {
                              strokeColor: dayColors[parseInt(dayIndex) % dayColors.length],
                              strokeWeight: 4,
                            },
                            suppressMarkers: true,
                          }}
                        />
                      ) : null
                    )}
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <p className="text-gray-600">Loading map...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
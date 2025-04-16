"use client";

import { useContext, useState, useEffect, useCallback ,useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { format, differenceInDays, eachDayOfInterval } from "date-fns";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { FiHeart, FiBookmark, FiHelpCircle } from "react-icons/fi";
import { MapContext } from "@/app/ClientLayout";
import axios from "axios";

import { useUser } from "@/context/UserContext";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function PlanDetail() {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const planId = parseInt(params.id);

  const { isMapLoaded, mapError } = useContext(MapContext);

  const [error, setError] = useState("");
  // const [plan, setSelectedPlan] = useState(null);
  const [plan, setPlan] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [hasJournal, setHasJournal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [directions, setDirections] = useState({});
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPlaceModal, setShowPlaceModal] = useState(false);

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
    // Simulate fetching the plan
    // const selectedPlan = d;

    // if (!selectedPlan || selectedPlan.visibility !== "PUBLIC") {
    //   notFound();
    // }
    const fetchPlanData = async () => {
      try {
        const response = await fetch(`/api/plans/${planId}`, {
          withCredentials: true,
        });

        const responseJson = await response.json();
        const currentSelectedPlan = responseJson.data;
        
        // ประมวลผลข้อมูล notes ก่อนที่จะเรียก setPlan เพื่อไม่ให้ข้อมูลหายไป
        if (currentSelectedPlan && currentSelectedPlan.placeNotes && currentSelectedPlan.placeNotes.length > 0 && currentSelectedPlan.itinerary) {
          const placeNotesMap = {};
          currentSelectedPlan.placeNotes.forEach(note => {
            placeNotesMap[note.placeId] = note.notes;
          });
          
          const updatedItinerary = currentSelectedPlan.itinerary.map(day => {
            const updatedPlaces = day.places.map(place => {
              const placeNote = placeNotesMap[place.googlePlaceId] || "";
              return {
                ...place,
                notes: placeNote
              };
            });
            return {
              ...day,
              places: updatedPlaces
            };
          });
          
          currentSelectedPlan.itinerary = updatedItinerary;
        }
        
        setPlan(currentSelectedPlan);
      } catch (error) {
        console.error(error.message);
        setError("Error getting plan information");
      }
    };
    fetchPlanData();
  }, []);

  // useEffect แยกสำหรับการตรวจสอบ Journal เพื่อให้ทำงานแค่ครั้งเดียว
  useEffect(() => {
    if (planId) {
      checkJournalExists(planId);
    }
  }, [planId]);

  // ใช้ useEffect สำหรับการตรวจสอบข้อมูลเพิ่มเติมหลังจากได้รับข้อมูล plan
  useEffect(() => {
    if (plan) {

      if (plan.likedByUsers && plan.likedByUsers.includes(user.id)) {
        setLiked(true);
      }

      if (plan.bookmarkedByUsers && plan.bookmarkedByUsers.includes(user.id)) {
        setBookmarked(true);
      }

      setTotalLikes(plan.totalLike);

      // Check if the current user is the owner
      const owner = user && plan.user.id === user.id;

      if (owner) {
        setIsOwner(true);
      }
    }
  }, [plan, user]);
  

  
  // แยก useEffect สำหรับการอัปเดต directions
  useEffect(() => {
    // Initialize directions
    if (isMapLoaded && plan && plan.itinerary) {
      updateDirections(plan.itinerary);
    }
  }, [isMapLoaded, plan]);

  // ตรวจสอบว่ามี Journal สำหรับแผนนี้หรือไม่
  const checkJournalExists = async (planId) => {
    try {
      const response = await axios.get(`/api/plans/${planId}/journal/check`, {
        withCredentials: true,
      });
      
      if (response.data.status === "success") {
        console.log("Journal check result:", response.data);
        setHasJournal(response.data.exists);
      } else {
        console.error("Error checking journal existence:", response.data.message);
        setHasJournal(false);
      }
    } catch (error) {
      console.error("Error checking journal existence:", error);
      setHasJournal(false);
    }
  };

  const updateDirections = useCallback((itinerary) => {
    if (typeof window === "undefined" || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    const newDirections = {};

    itinerary.forEach((day, dayIndex) => {
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
          } else {
            console.error("Directions request failed:", status);
            newDirections[dayIndex] = null;
          }
          setDirections({ ...newDirections });
        }
      );
    });
  }, []);

  const handleLike = async () => {
    // setLiked((prev) => !prev);
    // setTotalLikes((prev) => (liked ? prev - 1 : prev + 1));
    try {
      if (liked) {
        // If already liked, send a DELETE request to remove the like
        await axios.delete(`/api/likes/${plan.id}`, { withCredentials: true });
        setLiked(false);
        setTotalLikes((prev) => prev - 1);
      } else {
        // If not liked, send a POST request to add the like
        await axios.post(`/api/likes/${plan.id}`, {
          withCredentials: true,
        });
        setLiked(true);
        setTotalLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating like status:", error.message);
    }
  };

  const handleBookmark = async () => {
    // setBookmarked((prev) => !prev);
    try {
      if (bookmarked) {
        // If already bookmarked, send a DELETE request to remove the like
        await axios.delete(`/api/bookmarks/${plan.id}`, {
          withCredentials: true,
        });
        setBookmarked(false);
      } else {
        // If not bookmarked, send a POST request to add the like
        await axios.post(`/api/bookmarks/${plan.id}`, {
          withCredentials: true,
        });
        setBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark status:", error.message);
    }
  };

  if (!plan) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
      </div>
    );
  } else if (!plan.itinerary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">
          There is no itinerary to show.
        </div>
      </div>
    );
  }

  // Calculate map center
  const locations = plan.itinerary.flatMap((day) =>
    day.places.map((place) => ({
      title: place.title,
      lat: place.latitude,
      lng: place.longitude,
      photoUrl: place.photoUrl,
    }))
  );
  const mapCenter =
    locations.length > 0
      ? { lat: locations[0].lat, lng: locations[0].lng }
      : { lat: 0, lng: 0 };

  // Calculate the number of days and generate all days in the range
  const startDate = new Date(plan.startDate);
  const endDate = new Date(plan.endDate);
  const numberOfDays = differenceInDays(endDate, startDate) + 1;
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Map the itinerary to the full list of days
  const fullItinerary = allDays.map((day) => {
    const dayString = format(day, "yyyy-MM-dd");
    const itineraryDay = plan.itinerary.find(
      (it) => format(new Date(it.startDate), "yyyy-MM-dd") === dayString
    );
    return {
      startDate: day.toISOString(),
      places: itineraryDay ? itineraryDay.places : [],
    };
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {isClient ? (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side: Plan Details */}
            <div>
              <div className="flex items-center mb-6 space-x-4">
                <button
                  onClick={() => router.push(`/plans`)}
                  className="py-2 px-4 rounded-full border shadow-md bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Back to My Plans
                </button>
                <h1 className="text-2xl font-bold text-black">Plan Details</h1>
              </div>

              {/* Plan Name */}
              <h2 className="text-4xl mb-4 font-gealova font-bold italic tracking-wider text-indigo-600">
                {plan.title}
              </h2>

              <p className="text-gray-500 mb-6 -mt-4 font-medium">by {plan.user.username}</p>

              {/* Destination */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <p className="text-gray-700 font-medium">Destination</p>
                <p className="text-indigo-600">{plan.cityTitle}</p>
              </div>

              {/* Dates */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 font-medium">Start Date</p>
                    <p className="text-indigo-600">
                      {format(new Date(plan.startDate), "d MMMM yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">End Date</p>
                    <p className="text-indigo-600">
                      {format(new Date(plan.endDate), "d MMMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Itinerary Section */}
              <div className="flex flex-col h-[calc(100vh-200px)]">
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto pt-0">
                  <div className="sticky top-0 bg-white z-10 border-b -mx-6 px-6 pt-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">
                      Itinerary - {numberOfDays} Days
                    </h2>
                  </div>
                  {fullItinerary.map((day, index) => (
                    <div key={index} className="mt-6">
                      <h3 className="text-lg font-medium text-indigo-600">
                        {format(new Date(day.startDate), "d MMMM yyyy")}
                      </h3>
                      <div className="min-h-[50px]">
                        {day.places.length > 0 ? (
                          day.places.map((place, placeIndex) => (
                            <div
                              key={`${index}-${placeIndex}`}
                              className="flex items-center p-3 border rounded-lg mb-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                              onClick={() => {
                                setSelectedPlace(place);
                                setShowPlaceModal(true);
                              }}
                            >
                              <div 
                                className="flex items-center justify-center w-8 h-8 text-white rounded-full mr-4"
                                style={{ backgroundColor: dayColors[index % dayColors.length] }}
                              >
                                {placeIndex + 1}
                              </div>
                              <img
                                src={place.photoUrl}
                                alt={place.title}
                                className="w-24 h-24 rounded-lg mr-4"
                                onError={(e) => {
                                  e.target.src = "/images/fallback.png";
                                }}
                              />
                              <div className="flex-1">
                                <h4 className="text-md font-medium">
                                  {place.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  Travel Time to Next Location:{" "}
                                  {place.travelTime}
                                </p>
                                {place.notes && (
                                  <div className="mt-2 bg-indigo-50 p-3 rounded-md border border-indigo-100">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      <span className="font-medium text-indigo-600">Notes: </span>
                                      {place.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic mt-2">
                            No places added for this day
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Notes Section */}
                  {/* <div className="mt-6">
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Notes
                    </h2>
                    <p className="text-black">
                      {plan.notes || "No notes available."}
                    </p>
                  </div> */}
                </div>

                {/* Visibility and Buttons */}
                <div className="mt-4">
                  <p className="flex text-gray-500 italic gap-1">
                    <FiHelpCircle className="text-gray-500 mt-1" />
                    {plan.visibility === "PUBLIC"
                      ? "This plan is shared to the community"
                      : "This plan is not shared to the community"}
                  </p>

                  {/* Like and Bookmark Buttons (for non-owners) */}
                  {!isOwner && (
                    <div className="flex mt-2">
                      <button
                        onClick={handleLike}
                        className={`p-2 rounded-full border shadow-md mr-2 transition-transform duration-200 transform hover:scale-110 active:scale-100 ${
                          liked
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-gray-700 hover:bg-red-100"
                        }`}
                      >
                        <FiHeart
                          className={`text-lg ${liked ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-full border shadow-md transition-transform duration-200 transform hover:scale-110 active:scale-100 ${
                          bookmarked
                            ? "bg-indigo-500 text-white hover:bg-indigo-600"
                            : "bg-white text-gray-700 hover:bg-indigo-100"
                        }`}
                      >
                        <FiBookmark
                          className={`text-lg ${
                            bookmarked ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      
                      {/* Duplicate Plan Button */}
                      <a 
                        href={`/plans/duplicate/${plan.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 py-2 px-4 rounded-full border shadow-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 text-sm flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Duplicate
                      </a>
                    </div>
                  )}

                  {/* Journal Buttons */}
                  <div className="mt-2">
                    {isOwner ? (
                      /* เจ้าของแผน */
                      hasJournal ? (
                        /* มี Journal แล้ว */
                        <Link href={`/plans/${plan.id}/journal`}>
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            View Journal
                          </button>
                        </Link>
                      ) : (
                        /* ยังไม่มี Journal */
                        <Link href={`/plans/${plan.id}/journal/create`}>
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            Create Journal
                          </button>
                        </Link>
                      )
                    ) : (
                      /* ไม่ใช่เจ้าของแผน */
                      hasJournal ? (
                        /* มี Journal แล้ว */
                        <Link href={`/plans/${plan.id}/journal`}>
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            View Journal
                          </button>
                        </Link>
                      ) : (
                        /* ยังไม่มี Journal */
                        <div className="w-full text-center py-3 text-gray-500">
                          This Plan does not have journal
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Map */}
            <div className="relative">
              <div className="sticky top-4 h-[100vh] rounded-lg shadow-md">
                {isMapLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={mapCenter}
                    zoom={plan.cityTitle ? 14 : 2}
                  >
                    {plan.itinerary
                      .filter(
                        (day, dayIndex) =>
                          activeDayIndex === null || dayIndex === activeDayIndex
                      )
                      .flatMap((day, dayIndex) =>
                        day.places.map((place, placeIndex) => (
                          <Marker
                            key={`${dayIndex}-${placeIndex}`}
                            position={{
                              lat: place.latitude,
                              lng: place.longitude,
                            }}
                            icon={{
                              path: window.google.maps.SymbolPath.CIRCLE,
                              fillColor: dayColors[dayIndex % dayColors.length],
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
                          activeDayIndex === null ||
                          parseInt(dayIndex) === activeDayIndex
                      )
                      .map((dayIndex) =>
                        directions[dayIndex] ? (
                          <DirectionsRenderer
                            key={dayIndex}
                            directions={directions[dayIndex]}
                            options={{
                              polylineOptions: {
                                strokeColor:
                                  dayColors[
                                    parseInt(dayIndex) % dayColors.length
                                  ],
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

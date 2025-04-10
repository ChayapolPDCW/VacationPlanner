"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { format, differenceInDays, eachDayOfInterval } from "date-fns";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { FiHeart, FiBookmark, FiHelpCircle } from "react-icons/fi";
import { MapContext } from "@/app/ClientLayout";

// Dynamically import MapComponent (if needed, but we'll use GoogleMap directly)
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

// Mock data for plans (updated to match CreatePlanPage structure)
const mockPlans = [
  {
    id: 1,
    title: "Summer in Bali",
    cityTitle: "Bali, Indonesia",
    startDate: "2024-11-17T00:00:00.000Z",
    endDate: "2024-11-23T00:00:00.000Z",
    total_like: 198,
    user: { id: 1, username: "user1" },
    notes: "Bring sunscreen for Bali beaches!",
    visibility: "PUBLIC",
    itinerary: [
      {
        startDate: "2024-11-17T00:00:00.000Z",
        places: [
          {
            id: 1,
            title: "Kuta Beach",
            latitude: -8.7186,
            longitude: 115.1686,
            photoUrl: "/images/kuta.jpeg",
            googlePlaceId: "place_id_1",
            travelTime: "15 mins, 4.2 km",
          },
          {
            id: 2,
            title: "Seminyak Beach",
            latitude: -8.6894,
            longitude: 115.1622,
            photoUrl: "/images/seminyak.jpeg",
            googlePlaceId: "place_id_2",
            travelTime: "N/A",
          },
        ],
      },
      {
        startDate: "2024-11-18T00:00:00.000Z",
        places: [
          {
            id: 3,
            title: "Uluwatu Temple",
            latitude: -8.8291,
            longitude: 115.0849,
            photoUrl: "/images/Uluwatu Temple.jpeg",
            googlePlaceId: "place_id_3",
            travelTime: "45 mins, 18.3 km",
          },
          {
            id: 4,
            title: "Jimbaran Beach",
            latitude: -8.7747,
            longitude: 115.1658,
            photoUrl: "/images/Jimbaran Beach.jpeg",
            googlePlaceId: "place_id_4",
            travelTime: "N/A",
          },
        ],
      },
      {
        startDate: "2024-11-19T00:00:00.000Z",
        places: [
          {
            id: 5,
            title: "Ubud Monkey Forest",
            latitude: -8.5193,
            longitude: 115.2603,
            photoUrl: "/images/Ubud Monkey Forest.jpeg",
            googlePlaceId: "place_id_5",
            travelTime: "N/A",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Winter in Paris",
    cityTitle: "Paris, France",
    startDate: "2024-08-03T00:00:00.000Z",
    endDate: "2024-08-08T00:00:00.000Z",
    total_like: 167,
    user: { id: 2, username: "user2" },
    notes: "Wear warm clothes in Paris!",
    visibility: "PUBLIC",
    itinerary: [
      {
        startDate: "2024-08-03T00:00:00.000Z",
        places: [
          {
            id: 6,
            title: "Eiffel Tower",
            latitude: 48.8584,
            longitude: 2.2945,
            photoUrl: "/images/eiffel.jpeg",
            googlePlaceId: "place_id_6",
            travelTime: "15 mins, 2.1 km",
          },
          {
            id: 7,
            title: "Champ-Élysées",
            latitude: 48.8698,
            longitude: 2.3077,
            photoUrl: "/images/champs-elysees.jpeg",
            googlePlaceId: "place_id_7",
            travelTime: "N/A",
          },
        ],
      },
      {
        startDate: "2024-08-04T00:00:00.000Z",
        places: [
          {
            id: 8,
            title: "Louvre Museum",
            latitude: 48.8606,
            longitude: 2.3376,
            photoUrl: "/images/louvre.jpeg",
            googlePlaceId: "place_id_8",
            travelTime: "N/A",
          },
        ],
      },
    ],
  },
];

// Mock journals to check if a plan has a journal
const mockJournals = [
  {
    id: 1,
    planId: 1,
    userId: 1,
  },
  // Plan 2 has no journal
];

// Mock current user (simulating authentication)
const mockCurrentUser = { id: 1, username: "user1" }; // Change this to test different users

export default function PlanDetail() {
  const router = useRouter();
  const params = useParams();
  const planId = parseInt(params.id);

  const { isMapLoaded, mapError } = useContext(MapContext);

  const [plan, setPlan] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [hasJournal, setHasJournal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [directions, setDirections] = useState({});
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [isClient, setIsClient] = useState(false);

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
    const selectedPlan = mockPlans.find((p) => p.id === planId);
    if (!selectedPlan || selectedPlan.visibility !== "PUBLIC") {
      notFound();
    }

    setPlan(selectedPlan);
    setTotalLikes(selectedPlan.total_like);

    // Check if the current user is the owner
    const owner = mockCurrentUser && selectedPlan.user.id === mockCurrentUser.id;
    setIsOwner(owner);

    // Check if the plan has a journal
    const journalExists = mockJournals.some((j) => j.planId === planId);
    setHasJournal(journalExists);

    // Initialize directions
    if (isMapLoaded && selectedPlan.itinerary) {
      updateDirections(selectedPlan.itinerary);
    }
  }, [planId, isMapLoaded]);

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

  const handleLike = () => {
    setLiked((prev) => !prev);
    setTotalLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  if (!plan) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
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
                  onClick={() => router.back()}
                  className="py-2 px-4 rounded-full border shadow-md bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Return
                </button>
                <h1 className="text-2xl font-bold text-black">Plan Details</h1>
              </div>

              {/* Plan Name */}
              <h2 className="text-4xl mb-4 font-gealova font-bold italic tracking-wider text-indigo-600">
                {plan.title}
              </h2>

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
                              className="flex items-center p-3 border rounded-lg mb-3 bg-gray-50"
                            >
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-4">
                                {placeIndex + 1}
                              </div>
                              <img
                                src={place.photoUrl}
                                alt={place.title}
                                className="w-24 h-24 rounded-lg mr-4"
                                onError={(e) => {
                                  e.target.src = "/images/fallback.jpeg";
                                }}
                              />
                              <div className="flex-1">
                                <h4 className="text-md font-medium">
                                  {place.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  Travel Time to Next Location: {place.travelTime}
                                </p>
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
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Notes
                    </h2>
                    <p className="text-black">
                      {plan.notes || "No notes available."}
                    </p>
                  </div>
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
                          className={`text-lg ${bookmarked ? "fill-current" : ""}`}
                        />
                      </button>
                    </div>
                  )}

                  {/* Journal Buttons */}
                  <div className="mt-2">
                    {isOwner ? (
                      !hasJournal && (
                        <Link href={`/plans/${plan.id}/create_journal`}>
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            Journal this Trip
                          </button>
                        </Link>
                      )
                    ) : (
                      hasJournal && (
                        <Link
                          href={`/journal/${mockJournals.find((j) => j.planId === planId)?.id}`}
                        >
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            Read this plan journal
                          </button>
                        </Link>
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
                                  dayColors[parseInt(dayIndex) % dayColors.length],
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
          <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
        </div>
      )}
    </div>
  );
}
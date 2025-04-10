"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

// Mock data
const mockPlans = [
  {
    id: 1,
    authorId: 1,
    title: "Summer in Bali",
    cityTitle: "Bali, Indonesia",
    notes: "A relaxing summer getaway in Bali",
    startDate: "2024-11-17T00:00:00.000Z",
    endDate: "2024-11-23T00:00:00.000Z",
    visibility: "PUBLIC",
    createdAt: "2024-10-01T00:00:00.000Z",
    updatedAt: "2024-10-02T00:00:00.000Z",
    user: { username: "user1" },
    destinations: [
      {
        id: 1,
        travelPlanId: 1,
        title: "Kuta Beach",
        latitude: -8.7186,
        longitude: 115.1686,
        photoUrl: "/images/kuta.jpeg",
        googlePlaceId: "ChIJk9x8zX1z0i0R7g",
        startDate: "2024-11-17T00:00:00.000Z",
        dailyVisitOrder: 1,
        createdAt: "2024-10-01T00:00:00.000Z",
        updatedAt: "2024-10-01T00:00:00.000Z",
      },
      {
        id: 2,
        travelPlanId: 1,
        title: "Seminyak Beach",
        latitude: -8.6894,
        longitude: 115.1622,
        photoUrl: "/images/seminyak.jpeg",
        googlePlaceId: "ChIJk9x8zX2z0i0R7h",
        startDate: "2024-11-17T00:00:00.000Z",
        dailyVisitOrder: 2,
        createdAt: "2024-10-01T00:00:00.000Z",
        updatedAt: "2024-10-01T00:00:00.000Z",
      },
      {
        id: 3,
        travelPlanId: 1,
        title: "Uluwatu Temple",
        latitude: -8.8291,
        longitude: 115.0849,
        photoUrl: "/images/Uluwatu Temple.jpeg",
        googlePlaceId: "ChIJk9x8zX3z0i0R7i",
        startDate: "2024-11-18T00:00:00.000Z",
        dailyVisitOrder: 1,
        createdAt: "2024-10-01T00:00:00.000Z",
        updatedAt: "2024-10-01T00:00:00.000Z",
      },
      {
        id: 4,
        travelPlanId: 1,
        title: "Jimbaran Beach",
        latitude: -8.7747,
        longitude: 115.1658,
        photoUrl: "/images/Jimbaran Beach.jpeg",
        googlePlaceId: "ChIJk9x8zX4z0i0R7j",
        startDate: "2024-11-18T00:00:00.000Z",
        dailyVisitOrder: 2,
        createdAt: "2024-10-01T00:00:00.000Z",
        updatedAt: "2024-10-01T00:00:00.000Z",
      },
      {
        id: 5,
        travelPlanId: 1,
        title: "Ubud Monkey Forest",
        latitude: -8.5193,
        longitude: 115.2603,
        photoUrl: "/images/Ubud Monkey Forest.jpeg",
        googlePlaceId: "ChIJk9x8zX5z0i0R7k",
        startDate: "2024-11-19T00:00:00.000Z",
        dailyVisitOrder: 1,
        createdAt: "2024-10-01T00:00:00.000Z",
        updatedAt: "2024-10-01T00:00:00.000Z",
      },
    ],
    journal: {
      id: 1,
      travel_plan_id: 1,
      rating: 4,
      notes: "An amazing trip to Bali! The beaches were stunning, and the culture was so rich.",
      fav_notes: "Watching the sunset at Kuta Beach was unforgettable.",
      future_tip: "Bring sunscreen and stay hydrated!",
      createdAt: "2024-11-24T00:00:00.000Z",
      updatedAt: "2024-11-24T00:00:00.000Z",
    },
    attachments: [
      {
        travel_plan_destination_id: 1, // Kuta Beach
        url: "/images/kuta-moment.jpeg",
        order: 1,
        createdAt: "2024-11-24T00:00:00.000Z",
        updatedAt: "2024-11-24T00:00:00.000Z",
      },
      {
        travel_plan_destination_id: 3, // Uluwatu Temple
        url: "/images/uluwatu-moment.jpeg",
        order: 1,
        createdAt: "2024-11-24T00:00:00.000Z",
        updatedAt: "2024-11-24T00:00:00.000Z",
      },
    ],
  },
  {
    id: 2,
    authorId: 2,
    title: "Winter in Paris",
    cityTitle: "Paris, France",
    notes: "A magical winter trip to Paris",
    startDate: "2024-08-03T00:00:00.000Z",
    endDate: "2024-08-08T00:00:00.000Z",
    visibility: "PRIVATE",
    createdAt: "2024-07-01T00:00:00.000Z",
    updatedAt: "2024-07-02T00:00:00.000Z",
    user: { username: "user2" },
    destinations: [
      {
        id: 6,
        travelPlanId: 2,
        title: "Eiffel Tower",
        latitude: 48.8584,
        longitude: 2.2945,
        photoUrl: "/images/eiffel.jpeg",
        googlePlaceId: "ChIJk9x8zX6z0i0R7l",
        startDate: "2024-08-03T00:00:00.000Z",
        dailyVisitOrder: 1,
        createdAt: "2024-07-01T00:00:00.000Z",
        updatedAt: "2024-07-01T00:00:00.000Z",
      },
      {
        id: 7,
        travelPlanId: 2,
        title: "Champ-Élysées",
        latitude: 48.8698,
        longitude: 2.3077,
        photoUrl: "/images/champs-elysees.jpeg",
        googlePlaceId: "ChIJk9x8zX7z0i0R7m",
        startDate: "2024-08-03T00:00:00.000Z",
        dailyVisitOrder: 2,
        createdAt: "2024-07-01T00:00:00.000Z",
        updatedAt: "2024-07-01T00:00:00.000Z",
      },
      {
        id: 8,
        travelPlanId: 2,
        title: "Louvre Museum",
        latitude: 48.8606,
        longitude: 2.3376,
        photoUrl: "/images/louvre.jpeg",
        googlePlaceId: "ChIJk9x8zX8z0i0R7n",
        startDate: "2024-08-04T00:00:00.000Z",
        dailyVisitOrder: 1,
        createdAt: "2024-07-01T00:00:00.000Z",
        updatedAt: "2024-07-01T00:00:00.000Z",
      },
    ],
    journal: {
      id: 2,
      travel_plan_id: 2,
      rating: 5,
      notes: "Paris in winter was magical! The lights and atmosphere were incredible.",
      fav_notes: "Seeing the Eiffel Tower lit up at night was the highlight.",
      future_tip: "Dress warmly and book museum tickets in advance.",
      createdAt: "2024-08-09T00:00:00.000Z",
      updatedAt: "2024-08-09T00:00:00.000Z",
    },
    attachments: [
      {
        travel_plan_destination_id: 6, // Eiffel Tower
        url: "/images/eiffel-moment.jpeg",
        order: 1,
        createdAt: "2024-08-09T00:00:00.000Z",
        updatedAt: "2024-08-09T00:00:00.000Z",
      },
      {
        travel_plan_destination_id: 8, // Louvre Museum
        url: "/images/louvre-moment.jpeg",
        order: 1,
        createdAt: "2024-08-09T00:00:00.000Z",
        updatedAt: "2024-08-09T00:00:00.000Z",
      },
    ],
  },
];

export default function JournalDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [journal, setJournal] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to track the enlarged photo

  useEffect(() => {
    // Fetch plan, journal, and attachments from mock data
    const selectedPlan = mockPlans.find((plan) => plan.id === parseInt(id));
    if (selectedPlan) {
      if (selectedPlan.journal) {
        setPlan(selectedPlan);
        setJournal(selectedPlan.journal);
        setAttachments(selectedPlan.attachments || []);
        setLoading(false);
      } else {
        setError("Journal not found for this plan.");
        setLoading(false);
      }
    } else {
      setError("Plan not found.");
      setLoading(false);
    }
  }, [id]);

  // Calculate the number of days in the trip (inclusive of start and end dates)
  const numberOfDays = plan ? differenceInDays(new Date(plan.endDate), new Date(plan.startDate)) + 1 : 0;

  // Group destinations by startDate
  const groupedDestinations = plan
    ? plan.destinations.reduce((acc, dest) => {
        const dateKey = format(new Date(dest.startDate), "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dest.startDate,
            destinations: [],
          };
        }
        acc[dateKey].destinations.push(dest);
        return acc;
      }, {})
    : {};

  const groupedDestinationsArray = Object.values(groupedDestinations);

  // Function to handle photo click (open modal)
  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-2xl text-indigo-600 font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-600 bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
        {error}
      </div>
    );
  }

  if (!plan || !journal) {
    return (
      <div className="container mx-auto p-6 text-red-600 bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
        Journal not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Back button on the left */}
          <button
            onClick={() => router.push(`/plans/${id}`)}
            className="absolute left-0 flex items-center px-4 py-2 bg-white text-indigo-600 rounded-full cursor-pointer border border-indigo-400 shadow-md transition-transform duration-200 transform hover:scale-110 active:scale-100"
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back to Plan
          </button>

          {/* Centered Title and Info */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-indigo-500 drop-shadow-lg font-gealova">
              {plan.cityTitle} Journal
            </h1>
            <p className="text-gray-600 mt-2 italic">
              Created by {plan.user.username} on {format(new Date(journal.createdAt), "d MMMM yyyy")}
            </p>
          </div>
        </div>


        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Itinerary Timeline */}
          <div className="lg:col-span-1">
            <div className="relative">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Timeline</h2>
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-indigo-300"></div>
                {groupedDestinationsArray.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-8 relative">
                    {/* Date Marker */}
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center z-10">
                        <span className="text-white text-sm font-medium">
                          {format(new Date(group.date), "d")}
                        </span>
                      </div>
                      <h3 className="ml-4 text-lg font-medium text-indigo-600">
                        {format(new Date(group.date), "d MMMM yyyy")}
                      </h3>
                    </div>
                    {/* Destinations for the Day */}
                    {group.destinations
                      .sort((a, b) => a.dailyVisitOrder - b.dailyVisitOrder)
                      .map((dest) => {
                        const attachment = attachments.find(
                          (att) => att.travel_plan_destination_id === dest.id
                        );
                        return (
                          <div
                            key={dest.id}
                            className="ml-12 bg-white p-6 rounded-lg shadow-md mb-4 border border-indigo-100"
                          >
                            <div className="flex flex-col space-y-4">
                              {/* Destination Title */}
                              <h4 className="text-lg font-semibold text-indigo-600 text-left">
                                {dest.title}
                              </h4>
                              {/*Photo on Left, Fav Moment on Right */}
                              <div className="flex items-center justify-between space-x-4">
                                {/* Left: Destination Photo */}
                                <div className="flex-shrink-0">
                                  <img
                                    src={dest.photoUrl || "/images/fallback.jpeg"}
                                    alt={dest.title}
                                    className="w-32 h-32 rounded-full shadow-md object-cover border-4 border-white"
                                  />
                                </div>
                                {/* Right: Fav Moment */}
                                <div className="flex-shrink-0">
                                  <label className="block text-gray-700 mb-2 font-medium text-center">
                                    Favorite Moment
                                  </label>
                                  {attachment ? (
                                    <img
                                      src={attachment.url}
                                      alt="Favorite moment"
                                      className="w-32 h-32 object-cover rounded-lg shadow-lg border border-indigo-300 transition-transform duration-200 hover:scale-105 cursor-pointer"
                                      onClick={() => handlePhotoClick(attachment.url)} // click to view bigger photo
                                    />
                                  ) : (
                                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                                      <span className="text-gray-500 text-sm text-center">
                                        No photo uploaded
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Other Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Trip Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-600">Duration</p>
                  <p className="text-lg font-medium text-indigo-500">{numberOfDays} Days</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Places Visited</p>
                  <p className="text-lg font-medium text-indigo-500">{plan.destinations.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Rating</p>
                  <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-2xl ${
                          star <= journal.rating ? "text-indigo-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Memories Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Memories</h2>
              <p className="text-gray-700 bg-indigo-50 p-4 rounded-lg  min-h-[100px]">
                {journal.notes || "No memories recorded."}
              </p>
            </div>

            {/* Favorite Moment Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Favorite Moment</h2>
              <p className="text-gray-700 bg-indigo-50 p-4 rounded-lg  min-h-[100px]">
                {journal.fav_notes || "No favorite moment recorded."}
              </p>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Tips for Next Time</h2>
              <p className="text-gray-700 bg-indigo-50 p-4 rounded-lg  min-h-[100px]">
                {journal.future_tip || "No tips recorded."}
              </p>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between">
              <p className="text-gray-700 italic flex items-center gap-1">
                {plan.visibility === "PUBLIC"
                  ? "This journal is shared with the community."
                  : "This journal is private."}
                <span className="relative group cursor-pointer">
                  <FiHelpCircle className="text-gray-500 hover:text-indigo-500" />
                  <span className="absolute bottom-full -translate-x-1/2 mb-2 w-48 p-2 text-sm text-white bg-indigo-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-wrap text-left">
                    Sharing choice depends on your plan.
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Enlarged Photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-3xl max-h-[80vh] p-4">
            <img
              src={selectedPhoto}
              alt="Enlarged moment"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import { FaStar } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

// Mock data for plans (aligned with backend schema)
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
  },
];

export default function CreateJournalPage() {
  const router = useRouter();
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    notes: "",
    itineraryPhotos: [],
    favNotes: "",
    futureTip: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch plan from mock data
    const selectedPlan = mockPlans.find((plan) => plan.id === parseInt(id));
    if (selectedPlan) {
      setPlan(selectedPlan);

      const initialItineraryPhotos = selectedPlan.destinations.map(() => ({
        photo: null,
      }));
      setFormData((prev) => ({
        ...prev,
        itineraryPhotos: initialItineraryPhotos,
      }));
      setLoading(false);
    } else {
      setError("Plan not found.");
      setLoading(false);
    }
  }, [id]);

  // Handle star rating
  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo upload
  const handlePhotoUpload = (destIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedItineraryPhotos = [...formData.itineraryPhotos];
      updatedItineraryPhotos[destIndex].photo = file;
      setFormData((prev) => ({ ...prev, itineraryPhotos: updatedItineraryPhotos }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulate photo uploads and create attachments (mock TravelPlanDestinationAttachment)
    const attachments = formData.itineraryPhotos.map((dest, index) => {
      if (dest.photo) {
        return {
          travel_plan_destination_id: plan.destinations[index].id,
          url: URL.createObjectURL(dest.photo),
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      return null;
    }).filter(Boolean);

    console.log("TravelPlanDestinationAttachments:", attachments);

    // Matched to backend
    const journalData = {
      travel_plan_id: parseInt(id),
      rating: formData.rating,
      notes: formData.notes,
      fav_notes: formData.favNotes,
      future_tip: formData.futureTip,
    };

    console.log("Journal Data:", journalData);

    // Simulate a successful save
    alert("Journal saved successfully! Check the console for the data.");
    router.push("/plans");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  if (!plan) {
    return <div className="container mx-auto p-6 text-red-600">Plan not found.</div>;
  }

  // Calculate the number of days in the trip (inclusive of start and end dates)
  const numberOfDays = differenceInDays(new Date(plan.endDate), new Date(plan.startDate)) + 1;

  // Group destinations by startDate
  const groupedDestinations = plan.destinations.reduce((acc, dest, index) => {
    const dateKey = format(new Date(dest.startDate), "yyyy-MM-dd"); // Use a consistent date format for grouping
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dest.startDate,
        destinations: [],
      };
    }
    acc[dateKey].destinations.push({ ...dest, originalIndex: index }); // Include original index for photo mapping
    return acc;
  }, {});

  // Convert grouped destinations to an array for rendering
  const groupedDestinationsArray = Object.values(groupedDestinations);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-black">
          Journal your {plan.cityTitle} Trip!
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Side: Itinerary Section */}
          <div className="max-h-[70vh] overflow-y-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200">
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4 sticky top-0 z-10">
                Itinerary - {numberOfDays} Days - {plan.destinations.length} Places
              </h2>
            </div>

            {groupedDestinationsArray.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h3 className="text-lg font-medium text-indigo-600 mb-2">
                  {format(new Date(group.date), "d MMMM yyyy")}
                </h3>
                {group.destinations
                  .sort((a, b) => a.dailyVisitOrder - b.dailyVisitOrder) // Sort by dailyVisitOrder
                  .map((dest) => (
                    <div
                      key={dest.id}
                      className="bg-white p-6 rounded-lg shadow-md mb-4 border border-indigo-200"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={dest.photoUrl || "/images/fallback.jpeg"}
                          alt={dest.title}
                          className="w-48 h-48 rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-indigo-600">
                            {dest.title}
                          </h4>
                          <div className="mt-6">
                            <label className="block text-gray-700 mb-2">
                              Post your favorite moment here!
                            </label>
                            <label className="inline-block px-4 py-2 bg-white text-indigo-600 rounded-full cursor-pointer border border-indigo-400 shadow-md hover:bg-indigo-100 mb-2 transition-transform duration-200 transform hover:scale-110 active:scale-100">
                              Upload Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(dest.originalIndex, e)}
                                className="hidden"
                              />
                            </label>
                            <label className="block text-gray-600 mb-2 italic">
                              (1 photo per location)
                            </label>
                            {formData.itineraryPhotos[dest.originalIndex]?.photo && (
                              <div className="mt-2">
                                <img
                                  src={URL.createObjectURL(formData.itineraryPhotos[dest.originalIndex].photo)}
                                  alt="Uploaded moment"
                                  className="w-16 h-16 object-cover shadow-md rounded-lg"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Right Side: Rating and note */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200">
            <label className="block text-gray-700 mb-2">
              How would you rate the trip overall?
            </label>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-3xl transition-transform duration-200 transform hover:scale-125 active:scale-100 ${
                    star <= formData.rating ? "text-indigo-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Describe your memories here..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              rows="4"
            />
          </div>
        </div>

        {/* Below Sections: Favorite Moment, Tips, Save Button */}
        <h1 className="text-3xl text-size-700 font-gealova mb-4 font-bold italic tracking-wider text-indigo-600">
          This journey may end here, but its story lives on...
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-200">
          <label className="block text-gray-700 mb-2">
            What was your favorite place or moment during the trip? Why?
          </label>
          <textarea
            name="favNotes"
            value={formData.favNotes}
            onChange={handleInputChange}
            placeholder="Favorite place or moment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            rows="4"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-200">
          <label className="block text-gray-700 mb-2">Any tips for the next trip?</label>
          <textarea
            name="futureTip"
            value={formData.futureTip}
            onChange={handleInputChange}
            placeholder="Tips..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            rows="4"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-700 italic flex items-center gap-1">
            {plan.visibility === "PUBLIC"
              ? "Your journal will be shared to the community."
              : "Your journal won't be shared to the community."}
            <span className="relative group cursor-pointer">
              <FiHelpCircle className="text-gray-500 hover:text-indigo-500" />
              <span className="absolute bottom-full -translate-x-1/2 mb-2 w-48 p-2 text-sm text-white bg-indigo-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-wrap text-left">
                Sharing choice depends on your plan.
              </span>
            </span>
          </p>
          <button
            onClick={handleSubmit}
            className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            Save
          </button>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
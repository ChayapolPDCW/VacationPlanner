"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

// Mock data for plans (updated to include a private plan for testing)
const mockPlans = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    startDate: "2024-11-17T00:00:00.000Z",
    endDate: "2024-11-23T00:00:00.000Z",
    total_like: 198,
    user: { username: "user1" },
    description: "A relaxing summer getaway in Bali",
    visibility: "public", // Public plan
    itinerary: [
      {
        date: "2024-11-17T00:00:00.000Z",
        places: [
          {
            id: 1,
            name: "Kuta Beach",
            description: "Kuta Beach, Bali",
            lat: -8.7186,
            lng: 115.1686,
            image: "/images/kuta.jpeg",
            travelTime: "N/A",
          },
          {
            id: 2,
            name: "Seminyak Beach",
            description: "Seminyak Beach, Bali",
            lat: -8.6894,
            lng: 115.1622,
            image: "/images/seminyak.jpeg",
            travelTime: "15 mins, 4.2 km",
          },
        ],
      },
      {
        date: "2024-11-18T00:00:00.000Z",
        places: [
          {
            id: 3,
            name: "Uluwatu Temple",
            description: "Uluwatu Temple, Bali",
            lat: -8.8291,
            lng: 115.0849,
            image: "/images/Uluwatu Temple.jpeg",
            travelTime: "N/A",
          },
          {
            id: 4,
            name: "Jimbaran Beach",
            description: "Jimbaran Beach, Bali",
            lat: -8.7747,
            lng: 115.1658,
            image: "/images/Jimbaran Beach.jpeg",
            travelTime: "45 mins, 18.3 km",
          },
        ],
      },
      {
        date: "2024-11-19T00:00:00.000Z",
        places: [
          {
            id: 5,
            name: "Ubud Monkey Forest",
            description: "Ubud Monkey Forest, Bali",
            lat: -8.5193,
            lng: 115.2603,
            image: "/images/Ubud Monkey Forest.jpeg",
            travelTime: "N/A",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    destination: "Paris, France",
    startDate: "2024-08-03T00:00:00.000Z",
    endDate: "2024-08-08T00:00:00.000Z",
    total_like: 167,
    user: { username: "user2" },
    description: "A magical winter trip to Paris",
    visibility: "private", // Private plan
    itinerary: [
      {
        date: "2024-08-03T00:00:00.000Z",
        places: [
          {
            id: 6,
            name: "Eiffel Tower",
            description: "Eiffel Tower, Paris",
            lat: 48.8584,
            lng: 2.2945,
            image: "/images/eiffel.jpeg",
            travelTime: "N/A",
          },
          {
            id: 7,
            name: "Champ-Élysées",
            description: "Champ-Élysées, Paris",
            lat: 48.8698,
            lng: 2.3077,
            image: "/images/champs-elysees.jpeg",
            travelTime: "15 mins, 2.1 km",
          },
        ],
      },
      {
        date: "2024-08-04T00:00:00.000Z",
        places: [
          {
            id: 8,
            name: "Louvre Museum",
            description: "Louvre Museum, Paris",
            lat: 48.8606,
            lng: 2.3376,
            image: "/images/louvre.jpeg",
            travelTime: "N/A",
          },
        ],
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
    overallMemories: "",
    itineraryPhotos: [], // Changed to store only photos for each location
    favoriteMoment: "",
    tips: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedPlan = mockPlans.find((plan) => plan.id === parseInt(id));
    if (selectedPlan) {
      setPlan(selectedPlan);

      // Initialize itineraryPhotos to store photos for each location
      const initialItineraryPhotos = selectedPlan.itinerary.map((day) =>
        day.places.map(() => ({
          photo: null, // Only store a photo for each place
        }))
      );
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

  // Handle photo upload (only one photo per location)
  const handlePhotoUpload = (dayIndex, placeIndex, e) => {
    const file = e.target.files[0]; // Only take the first file
    if (file) {
      const updatedItineraryPhotos = [...formData.itineraryPhotos];
      updatedItineraryPhotos[dayIndex][placeIndex].photo = URL.createObjectURL(file); // Store a single photo
      setFormData((prev) => ({ ...prev, itineraryPhotos: updatedItineraryPhotos }));
    }
  };

  // Handle form submission (log to console instead of API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const journalData = {
      planId: id,
      rating: formData.rating,
      overallMemories: formData.overallMemories,
      itineraryPhotos: formData.itineraryPhotos,
      favoriteMoment: formData.favoriteMoment,
      tips: formData.tips,
      visibility: plan.visibility, // Set journal visibility to match plan visibility
    };

    console.log("Journal Data:", journalData);
    alert("Journal saved! Check the console for the data.");
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-black">
          Journal your {plan.destination} Trip!
        </h1>

        {/* Two-column layout: Itinerary on the left, Rating on the right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Side: Itinerary Section with limited height and scrolling */}
          
          <div className="max-h-[70vh] overflow-y-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200">
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4 sticky top-0 z-10">
                Itinerary - {plan.itinerary.length} Days
              </h2>
            </div>
            
            {plan.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6">
                <h3 className="text-lg font-medium text-indigo-600 mb-2">
                  {format(new Date(day.date), "d MMMM yyyy")}
                </h3>
                {day.places.map((place, placeIndex) => (
                  <div
                    key={place.id}
                    className="bg-white p-6 rounded-lg shadow-md mb-4 border border-indigo-200"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={place.image || "/images/fallback.jpeg"}
                        alt={place.name}
                        className="w-48 h-48 rounded-lg shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-md font-medium">{place.name}</h4>
                        <p className="text-sm text-gray-600">{place.description}</p>
                        <div className="mt-6">
                          <label className="block text-gray-700 mb-2">
                            Post your favorite moment here! (1 photo per location)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(dayIndex, placeIndex, e)}
                            className="mb-2"
                          />
                          {formData.itineraryPhotos[dayIndex]?.[placeIndex]?.photo && (
                            <div className="mt-2">
                              <img
                                src={formData.itineraryPhotos[dayIndex][placeIndex].photo}
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

          {/* Right Side: Overall Trip Rating and Memories */}
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
              name="overallMemories"
              value={formData.overallMemories}
              onChange={handleInputChange}
              placeholder="Describe your memories here..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              rows="4"
            />
          </div>
        </div>

        {/* Below Sections: Favorite Moment, Tips, and Save Button */}
        <h1 className="text-3xl text-size-700 font-gealova mb-4 font-bold italic tracking-wider text-indigo-600">
          This journey may end here, but its story lives on...
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-200">
          <label className="block text-gray-700 mb-2">
            What was your favorite place or moment during the trip? Why?
          </label>
          <textarea
            name="favoriteMoment"
            value={formData.favoriteMoment}
            onChange={handleInputChange}
            placeholder="Favorite place or moment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            rows="4"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-200">
          <label className="block text-gray-700 mb-2">Any tips for the next trip?</label>
          <textarea
            name="tips"
            value={formData.tips}
            onChange={handleInputChange}
            placeholder="Tips..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            rows="4"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-700 italic flex items-center gap-1">
            {plan.visibility === "public"
              ? "Your journal will be shared to the community."
              : "Your journal won't be shared to the community."}
            <span className="relative group cursor-pointer">
              <FiHelpCircle className="text-gray-500 hover:text-indigo-500" />
              <span className="absolute bottom-full -translate-x-1/2 mb-2 w-48 p-2 text-sm text-white bg-indigo-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-wrap text-left">
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
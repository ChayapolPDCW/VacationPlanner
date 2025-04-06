"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";

const mockPlans = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    startDate: "2024-11-17T00:00:00.000Z",
    endDate: "2024-11-23T00:00:00.000Z",
    total_like: 198,
    user: { username: "user1" },
    description: "A relaxing summer getaway in Bali",
    visibility: "public",
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
    visibility: "public",
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

export default function JournalPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the plan ID from the URL
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    overallMemories: "",
    itineraryMemories: [],
    favoriteMoment: "",
    tips: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Use mock data instead of fetching from an API
  useEffect(() => {
    // Simulate fetching the plan data
    const selectedPlan = mockPlans.find((plan) => plan.id === parseInt(id));
    if (selectedPlan) {
      setPlan(selectedPlan);

      // Initialize itineraryMemories with the plan's itinerary
      const initialItineraryMemories = selectedPlan.itinerary.map((day) =>
        day.places.map((place) => ({
          placeId: place.id,
          memories: "",
          photos: [], // Array to store uploaded photos
        }))
      );
      setFormData((prev) => ({
        ...prev,
        itineraryMemories: initialItineraryMemories,
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

  // Handle itinerary memories change
  const handleItineraryMemoriesChange = (dayIndex, placeIndex, value) => {
    const updatedItineraryMemories = [...formData.itineraryMemories];
    updatedItineraryMemories[dayIndex][placeIndex].memories = value;
    setFormData((prev) => ({ ...prev, itineraryMemories: updatedItineraryMemories }));
  };

  // Handle photo upload
  const handlePhotoUpload = (dayIndex, placeIndex, e) => {
    const files = Array.from(e.target.files);
    const updatedItineraryMemories = [...formData.itineraryMemories];
    updatedItineraryMemories[dayIndex][placeIndex].photos = [
      ...updatedItineraryMemories[dayIndex][placeIndex].photos,
      ...files.map((file) => URL.createObjectURL(file)), // Create a preview URL
    ];
    setFormData((prev) => ({ ...prev, itineraryMemories: updatedItineraryMemories }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const journalData = {
      planId: id,
      rating: formData.rating,
      overallMemories: formData.overallMemories,
      itineraryMemories: formData.itineraryMemories,
      favoriteMoment: formData.favoriteMoment,
      tips: formData.tips,
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
    <div className="min-h-screen bg-gray-100 font-gealova">
      <div className="container mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-black">
          Journal your {plan.destination || "Trip"}
        </h1>

        {/* Overall Trip Rating and Memories */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-indigo-200">
          <label className="block text-gray-700 mb-2">
            How would you rate the trip overall?
          </label>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= formData.rating ? "text-yellow-400" : "text-gray-300"
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

        {/* Itinerary Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Itinerary - {plan.itinerary.length} Days
          </h2>
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
                      className="w-24 h-24 rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-md font-medium">{place.name}</h4>
                      <p className="text-sm text-gray-600">{place.description}</p>
                      <textarea
                        value={
                          formData.itineraryMemories[dayIndex]?.[placeIndex]?.memories || ""
                        }
                        onChange={(e) =>
                          handleItineraryMemoriesChange(dayIndex, placeIndex, e.target.value)
                        }
                        placeholder="Describe your memories here..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black mt-2"
                        rows="3"
                      />
                      <div className="mt-2">
                        <label className="block text-gray-700 mb-2">Add photos...</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handlePhotoUpload(dayIndex, placeIndex, e)}
                          className="mb-2"
                        />
                        <div className="flex space-x-2">
                          {formData.itineraryMemories[dayIndex]?.[placeIndex]?.photos?.map(
                            (photo, photoIndex) => (
                              <img
                                key={photoIndex}
                                src={photo}
                                alt={`Uploaded ${photoIndex}`}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Favorite Moment */}
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

        {/* Tips for Next Trip */}
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

        {/* Share to Community and Save Button */}
        <div className="flex items-right justify-between">
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
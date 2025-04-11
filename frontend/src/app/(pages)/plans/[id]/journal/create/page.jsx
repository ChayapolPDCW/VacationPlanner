"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import { FaStar } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import axios from "axios";

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
  const [journalExists, setJournalExists] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get(`/api/plans/${id}`, {
          withCredentials: true,
        });
        
        if (response.data.status === "success") {
          const selectedPlan = response.data.data;
          console.log("Plan data:", selectedPlan);
          setPlan(selectedPlan);

          // Extract all destinations from itinerary
          let allDestinations = [];
          if (selectedPlan && selectedPlan.itinerary && Array.isArray(selectedPlan.itinerary)) {
            selectedPlan.itinerary.forEach(day => {
              if (day.places && Array.isArray(day.places)) {
                allDestinations = [...allDestinations, ...day.places];
              }
            });
            
            // Add destinations property to plan for easier access
            selectedPlan.destinations = allDestinations;
            
            const initialItineraryPhotos = allDestinations.map(() => ({
              photo: null,
            }));
            setFormData((prev) => ({
              ...prev,
              itineraryPhotos: initialItineraryPhotos,
            }));
          } else {
            console.warn("No itinerary found in the plan data");
            // Initialize with empty array if no destinations
            setFormData((prev) => ({
              ...prev,
              itineraryPhotos: [],
            }));
          }

          // Check if a journal already exists for this plan
          try {
            // Get all journals
            const journalsResponse = await axios.get(`/api/journals`, {
              withCredentials: true,
            });
            
            if (journalsResponse.data.status === "success" && journalsResponse.data.data) {
              const allJournals = journalsResponse.data.data;
              console.log("All journals:", allJournals);
              
              // Look for a journal that might be for this travel plan
              // Note: This is imperfect since the API doesn't return travelPlanId in the journal data
              // We're looking for matching title/dates as a best guess
              const possibleJournal = allJournals.find(journal => 
                journal.title === selectedPlan.title && 
                journal.startDate === selectedPlan.startDate
              );
              
              if (possibleJournal) {
                console.log("Found possible journal for this plan:", possibleJournal);
                setJournalExists(true);
              }
            }
          } catch (journalsError) {
            console.error("Error checking for existing journal:", journalsError);
            // Continue anyway - we'll let the user try to create a journal
          }
        } else {
          setError("Failed to fetch plan data.");
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Error fetching plan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setSubmitError("");
      
      // Prepare the data for submission
      const journalData = {
        notes: formData.notes,
        futureTip: formData.futureTip,
        favNotes: formData.favNotes,
        rating: formData.rating,
        photoAttachments: []
      };
      
      // Add photo attachments if available
      if (formData.itineraryPhotos && formData.itineraryPhotos.length > 0) {
        // Process photos for destinations that have photos
        const photoAttachments = [];
        
        for (let i = 0; i < formData.itineraryPhotos.length; i++) {
          const photoItem = formData.itineraryPhotos[i];
          
          // Skip if no photo
          if (!photoItem.photo) continue;
          
          // Get the destination for this photo
          if (i < plan.destinations.length) {
            const destination = plan.destinations[i];
            
            // Get the placeId (either id or googlePlaceId)
            const placeId = destination.id || 
                          (destination.googlePlaceId ? destination.googlePlaceId.toString() : null);
            
            if (placeId) {
              // In a real implementation, you would upload the photo to a server
              // For now, we'll use a placeholder URL
              photoAttachments.push({
                placeId: placeId,
                photoUrl: "https://example.com/placeholder.jpg" // Use a placeholder URL
              });
            }
          }
        }
        
        journalData.photoAttachments = photoAttachments;
      }
      
      console.log("Submitting journal data:", journalData);
      
      // Send data to API
      const response = await axios.post(`/api/journals/${id}`, journalData, {
        withCredentials: true,
      });
      
      if (response.data.status === "success") {
        console.log("Journal created successfully:", response.data);
        router.push(`/plans/${id}/journal`);
      } else {
        setSubmitError("Failed to create journal. Please try again.");
      }
    } catch (err) {
      console.error("Error creating journal:", err);
      setSubmitError(err.response?.data?.message || "Error creating journal. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

  if (journalExists) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">A journal already exists for this plan.</h2>
        <button
          onClick={() => router.push(`/plans/${id}/journal`)}
          className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
        >
          View Journal
        </button>
      </div>
    );
  }

  // Calculate the number of days in the trip (inclusive of start and end dates)
  const numberOfDays = differenceInDays(new Date(plan.endDate), new Date(plan.startDate)) + 1;

  // Use the destinations array we created in useEffect
  const destinations = plan.destinations || [];
  
  // Group destinations by startDate (if destinations exist)
  const groupedDestinations = destinations.length > 0
    ? destinations.reduce((acc, dest, index) => {
        const dateKey = format(new Date(dest.startDate), "yyyy-MM-dd"); // Use a consistent date format for grouping
        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dest.startDate,
            destinations: [],
          };
        }
        acc[dateKey].destinations.push({ ...dest, originalIndex: index }); // Include original index for photo mapping
        return acc;
      }, {})
    : {};

  // Convert grouped destinations to an array for rendering
  const groupedDestinationsArray = Object.values(groupedDestinations);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-black">
          Journal your {plan.title} Trip!
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Side: Itinerary Section */}
          <div className="max-h-[70vh] overflow-y-auto bg-white p-6 rounded-lg shadow-md border border-indigo-200">
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4 sticky top-0 z-10">
                Itinerary - {numberOfDays} Days - {destinations.length} Places
              </h2>
            </div>

            {groupedDestinationsArray.length > 0 ? (
              groupedDestinationsArray.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  <h3 className="text-lg font-medium text-indigo-600 mb-2">
                    {format(new Date(group.date), "d MMMM yyyy")}
                  </h3>
                  {group.destinations
                    .sort((a, b) => a.dailyVisitOrder - b.dailyVisitOrder) // Sort by dailyVisitOrder
                    .map((dest, destIndex) => (
                      <div
                        key={dest.id || dest.googlePlaceId || `${groupIndex}-${destIndex}`}
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No destinations found for this plan.</p>
              </div>
            )}
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
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>

        {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
      </div>
    </div>
  );
}
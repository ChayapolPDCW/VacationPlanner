"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import axios from "axios";

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
    const fetchJournalData = async () => {
      try {
        setLoading(true);
        
        // First, fetch the travel plan data
        const planResponse = await axios.get(`/api/plans/${id}`, {
          withCredentials: true,
        });
        
        if (planResponse.data.status === "success") {
          const selectedPlan = planResponse.data.data;
          console.log("Plan data:", selectedPlan);
          
          // Process destinations from itinerary
          let allDestinations = [];
          if (selectedPlan && selectedPlan.itinerary && Array.isArray(selectedPlan.itinerary)) {
            selectedPlan.itinerary.forEach(day => {
              if (day.places && Array.isArray(day.places)) {
                allDestinations = [...allDestinations, ...day.places];
              }
            });
            
            // Add destinations property to plan for easier access
            selectedPlan.destinations = allDestinations;
          }
          
          setPlan(selectedPlan);
          
          // Now try to find the journal for this travel plan
          try {
            // Get all journals
            const journalsResponse = await axios.get(`/api/journals`, {
              withCredentials: true,
            });
            
            if (journalsResponse.data.status === "success" && journalsResponse.data.data) {
              const allJournals = journalsResponse.data.data;
              console.log("All journals:", allJournals);
              
              // Look for a journal that might be for this travel plan
              // We're matching based on title and start date since there's no direct travelPlanId in the response
              const possibleJournal = allJournals.find(journal => 
                journal.title === selectedPlan.title && 
                journal.startDate === selectedPlan.startDate
              );
              
              if (possibleJournal) {
                console.log("Found possible journal for this plan:", possibleJournal);
                
                // Now fetch the detailed journal data
                try {
                  const journalDetailResponse = await axios.get(`/api/journals/${possibleJournal.id}`, {
                    withCredentials: true,
                  });
                  
                  if (journalDetailResponse.data.status === "success" && journalDetailResponse.data.data) {
                    console.log("Journal detail data:", journalDetailResponse.data.data);
                    
                    // Combine the journal detail data with the basic journal data
                    const fullJournalData = {
                      ...journalDetailResponse.data.data,
                      title: possibleJournal.title,
                      cityTitle: possibleJournal.cityTitle,
                      username: possibleJournal.username,
                      createdAt: possibleJournal.createdAt
                    };
                    
                    setJournal(fullJournalData);
                    setLoading(false);
                  } else {
                    setError("Could not fetch journal details.");
                    setLoading(false);
                  }
                } catch (detailError) {
                  console.error("Error fetching journal details:", detailError);
                  setError("Error loading journal details. Please try again later.");
                  setLoading(false);
                }
              } else {
                // No journal found for this plan
                setError("No journal exists for this plan yet. Create one to get started!");
                setLoading(false);
              }
            } else {
              setError("Failed to fetch journals.");
              setLoading(false);
            }
          } catch (journalsError) {
            console.error("Error fetching journals:", journalsError);
            setError("Error loading journals. Please try again later.");
            setLoading(false);
          }
        } else {
          setError("Plan not found.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching plan data:", err);
        setError(err.response?.data?.message || "Error fetching plan data");
        setLoading(false);
      }
    };
    
    fetchJournalData();
  }, [id]);

  // Calculate the number of days in the trip (inclusive of start and end dates)
  const numberOfDays = plan ? differenceInDays(new Date(plan.endDate), new Date(plan.startDate)) + 1 : 0;

  // Group destinations by startDate
  const groupedDestinations = plan && plan.destinations
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10">
        <div className="container mx-auto p-6 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-indigo-200 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-indigo-500 mb-4">Journal Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push(`/plans/${id}/journal/create`)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-full cursor-pointer shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-100"
              >
                Create Journal
              </button>
              <button
                onClick={() => router.push(`/plans/${id}`)}
                className="px-6 py-3 bg-white text-indigo-600 rounded-full cursor-pointer border border-indigo-400 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-100"
              >
                Back to Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan || !journal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10">
        <div className="container mx-auto p-6 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-indigo-200 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-indigo-500 mb-4">No Journal Yet</h1>
            <p className="text-gray-600 mb-6">You haven't created a journal for this trip yet.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push(`/plans/${id}/journal/create`)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-full cursor-pointer shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-100"
              >
                Create Journal
              </button>
              <button
                onClick={() => router.push(`/plans/${id}`)}
                className="px-6 py-3 bg-white text-indigo-600 rounded-full cursor-pointer border border-indigo-400 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-100"
              >
                Back to Plan
              </button>
            </div>
          </div>
        </div>
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
              Created on {format(new Date(journal.createdAt), "d MMMM yyyy")}
            </p>
          </div>
        </div>


        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Itinerary Timeline */}
          <div className="lg:col-span-1">
            <div className="relative">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-6">Timeline</h2>
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
                      .map((dest, destIndex) => {
                        const attachment = attachments.find(
                          (att) => att.travelPlanDestinationId === dest.id
                        );
                        return (
                          <div
                            key={dest.id || dest.googlePlaceId || `${groupIndex}-${destIndex}`}
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
                  <p className="text-lg font-medium text-indigo-500">{plan.destinations?.length || 0}</p>
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
                {journal.favNotes || "No favorite moment recorded."}
              </p>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Tips for Next Time</h2>
              <p className="text-gray-700 bg-indigo-50 p-4 rounded-lg  min-h-[100px]">
                {journal.futureTip || "No tips recorded."}
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
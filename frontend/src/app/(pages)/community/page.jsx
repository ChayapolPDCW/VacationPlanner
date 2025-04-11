"use client";

import Link from "next/link";
import PlanCard from "../../../components/PlanCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart, FiBookmark } from "react-icons/fi";

export default function CommunityPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPlans, setLikedPlans] = useState(new Set()); // liked plans
  const [bookmarkedPlans, setBookmarkedPlans] = useState(new Set()); // bookmarked plans

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/plans", {
          withCredentials: true,
        });
        const plansData = response.data.data;
        
        console.log("plans: ", plansData);
        
        if (plansData && Array.isArray(plansData)) {
          const formattedPlans = plansData.map((plan, index) => {
            return {
              id: index + 1,
              plan_id: plan.id,
              title: plan.title,
              startDate: plan.startDate,
              endDate: plan.endDate,
              totalLike: plan.totalLike,
              photo_url: plan.photoUrl,
              user: {
                username: plan.user?.username || "Unknown"
              }
            };
          });
          
          // เรียงลำดับตามจำนวนไลค์จากมากไปน้อย
          formattedPlans.sort((a, b) => b.totalLike - a.totalLike);
          
          setPlans(formattedPlans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []); // Empty dependency array to run only once on component mount

  // liking/unliking
  const handleLike = (planId) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === planId) {
          const isLiked = likedPlans.has(planId);
          const newTotalLike = isLiked ? plan.total_like - 1 : plan.total_like + 1;
          return { ...plan, total_like: newTotalLike };
        }
        return plan;
      })
    );

    setLikedPlans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId); // Unlike
      } else {
        newSet.add(planId); // Like
      }
      return newSet;
    });
  };

  // bookmarking/unbookmarking
  const handleBookmark = (planId) => {
    setBookmarkedPlans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId); // Unbookmark
      } else {
        newSet.add(planId); // Bookmark
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-2">Community</h2>

        <p className="mb-6 italic text-gray-500">
          Explore travel plans shared by the community. Get inspired, save your favorites, or share your own!
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : plans.length === 0 ? (
          <p className="text-gray-600">No plans available in the community.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="relative">
                {/* Plan Card */}
                <PlanCard plan={plan} />

                {/* Like and Bookmark Buttons */}
                <div className="flex mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click PlanCard's Link
                      handleLike(plan.id);
                    }}
                    className={`p-2 rounded-full border shadow-md mr-2 transition-transform duration-200 transform hover:scale-110 active:scale-100 ${
                      likedPlans.has(plan.id)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white text-gray-700 hover:bg-red-100"
                    }`}
                  >
                    <FiHeart
                      className={`text-lg ${likedPlans.has(plan.id) ? "fill-current" : ""}`}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(plan.id);
                    }}
                    className={`p-2 rounded-full border shadow-md transition-transform duration-200 transform hover:scale-110 active:scale-100 ${
                      bookmarkedPlans.has(plan.id)
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-white text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    <FiBookmark
                      className={`text-lg ${bookmarkedPlans.has(plan.id) ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
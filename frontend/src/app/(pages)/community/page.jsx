"use client";

import Link from "next/link";
import PlanCard from "../../../components/PlanCard";
import { useState, useEffect } from "react";
import { FiHeart, FiBookmark } from "react-icons/fi";

export default function CommunityPage() {
  // Mock data (to be replaced with API call later)
  const communityPlans = [
    {
      id: 1,
      name: "Summer in Bali",
      start_date: "2024-11-17T00:00:00.000Z",
      end_date: "2024-11-23T00:00:00.000Z",
      total_like: 198,
      user: { username: "user1" },
      photo_url: "", // Added photo_url
    },
    {
      id: 2,
      name: "Winter in Paris",
      start_date: "2024-08-03T00:00:00.000Z",
      end_date: "2024-08-08T00:00:00.000Z",
      total_like: 167,
      user: { username: "user2" },
      photo_url: "", // Added photo_url
    },
    {
      id: 3,
      name: "Hiking in Alps",
      start_date: "2024-08-12T00:00:00.000Z",
      end_date: "2024-08-23T00:00:00.000Z",
      total_like: 151,
      user: { username: "user3" },
      photo_url: "", // Added photo_url
    },
    {
      id: 4,
      name: "Beach Getaway in Maldives",
      start_date: "2024-09-05T00:00:00.000Z",
      end_date: "2024-09-10T00:00:00.000Z",
      total_like: 134,
      user: { username: "user4" },
      photo_url: "", // Added photo_url
    },
    {
      id: 5,
      name: "City Tour in Tokyo",
      start_date: "2024-10-20T00:00:00.000Z",
      end_date: "2024-10-25T00:00:00.000Z",
      total_like: 122,
      user: { username: "user5" },
      photo_url: "", // Added photo_url
    },
    {
      id: 6,
      name: "Safari in Kenya",
      start_date: "2024-12-01T00:00:00.000Z",
      end_date: "2024-12-07T00:00:00.000Z",
      total_like: 109,
      user: { username: "user6" },
      photo_url: "", // Added photo_url
    },
  ];

  
  const [sortedPlans, setSortedPlans] = useState([]);
  const [likedPlans, setLikedPlans] = useState(new Set()); // liked plans
  const [bookmarkedPlans, setBookmarkedPlans] = useState(new Set()); // bookmarked plans

  
  useEffect(() => {
    const transformedPlans = communityPlans.map((plan) => ({
      ...plan,
      plan_id: plan.id, // Map id to plan_id
      title: plan.name, // Map name to title
    }));
    const sorted = [...transformedPlans].sort((a, b) => b.total_like - a.total_like);
    setSortedPlans(sorted);
  }, []);

  // liking/unliking
  const handleLike = (planId) => {
    setSortedPlans((prevPlans) =>
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

        {sortedPlans.length === 0 ? (
          <p className="text-gray-600">No plans available in the community.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlans.map((plan) => (
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
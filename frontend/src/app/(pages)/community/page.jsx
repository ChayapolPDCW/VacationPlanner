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

        console.log("Raw plans data:", plansData);

        if (plansData && Array.isArray(plansData)) {
          const formattedPlans = plansData.map((plan, index) => {
            // Log each plan's dates for debugging
            console.log(`Plan ${plan.title} - createdAt: ${plan.createdAt}, startDate: ${plan.startDate}`);
            
            return {
              id: index + 1,
              planId: plan.id,
              title: plan.title,
              startDate: plan.startDate,
              endDate: plan.endDate,
              totalLike: plan.totalLike,
              photoUrl: plan.photoUrl,
              // Try to use the most accurate date for sorting
              createdAt: plan.createdAt || plan.created_at || plan.updatedAt || plan.updated_at || new Date(plan.startDate).toISOString(),
              user: {
                username: plan.user?.username || "Unknown",
              },
            };
          });

          console.log("Before sorting:", formattedPlans.map(p => ({ title: p.title, likes: p.totalLike, date: p.createdAt })));

          // Sort by likes (most to least) and then by date (newest to oldest)
          formattedPlans.sort((a, b) => {
            // First sort by totalLike (descending)
            if (b.totalLike !== a.totalLike) {
              return b.totalLike - a.totalLike;
            }
            
            // If totalLike is the same, sort by date (newest first)
            // Ensure we're comparing dates correctly
            const dateA = new Date(a.createdAt || a.startDate);
            const dateB = new Date(b.createdAt || b.startDate);
            
            // Log the comparison for debugging
            console.log(`Comparing dates for ${a.title} (${dateA}) and ${b.title} (${dateB})`);
            
            // Return newer dates first (descending order)
            return dateB - dateA;
          });

          console.log("After sorting:", formattedPlans.map(p => ({ title: p.title, likes: p.totalLike, date: p.createdAt })));

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
          const newTotalLike = isLiked
            ? plan.totalLike - 1
            : plan.totalLike + 1;
          return { ...plan, totalLike: newTotalLike };
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
          Explore travel plans shared by the community. Get inspired, save your
          favorites, or share your own!
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
                <PlanCard key={plan.id} plan={plan} />

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

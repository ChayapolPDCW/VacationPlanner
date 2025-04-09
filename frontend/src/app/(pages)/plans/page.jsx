"use client";

import Link from "next/link";
import PlanCard from "../../../components/PlanCard";
import { useState } from "react";

export default function PlansPage() {
  // Mock data (to be replaced with API calls later)
  const popularPlans = [
    {
      id: 1,
      plan_id: 1,
      title: "Summer in Bali",
      start_date: "2024-11-17T00:00:00.000Z",
      end_date: "2024-11-23T00:00:00.000Z",
      total_like: 198,
      photo_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      user: { username: "user1" },
    },
    {
      id: 2,
      plan_id: 2,
      title: "Winter in Paris",
      start_date: "2024-08-03T00:00:00.000Z",
      end_date: "2024-08-08T00:00:00.000Z",
      total_like: 167,
      photo_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      user: { username: "user1" },
    },
    {
      id: 3,
      plan_id: 3,
      title: "Hiking in Alps",
      start_date: "2024-08-12T00:00:00.000Z",
      end_date: "2024-08-23T00:00:00.000Z",
      total_like: 151,
      photo_url: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97",
      user: { username: "user1" },
    },
    {
      id: 4,
      plan_id: 4,
      title: "Beach Getaway in Maldives",
      start_date: "2024-09-05T00:00:00.000Z",
      end_date: "2024-09-10T00:00:00.000Z",
      total_like: 134,
      photo_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
      user: { username: "user1" },
    },
    {
      id: 5,
      plan_id: 5,
      title: "City Tour in Tokyo",
      start_date: "2024-10-20T00:00:00.000Z",
      end_date: "2024-10-25T00:00:00.000Z",
      total_like: 122,
      photo_url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      user: { username: "user1" },
    },
    {
      id: 6,
      plan_id: 6,
      title: "Safari in Kenya",
      start_date: "2024-12-01T00:00:00.000Z",
      end_date: "2024-12-07T00:00:00.000Z",
      total_like: 109,
      photo_url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
      user: { username: "user1" },
    },
  ];

  const bookmarks = [
    {
      id: 7,
      plan_id: 7,
      title: "Roadtrip in America",
      start_date: "2024-11-17T00:00:00.000Z",
      end_date: "2024-11-23T00:00:00.000Z",
      total_like: 543,
      photo_url: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96",
      user: { username: "user3" },
    },
    {
      id: 8,
      plan_id: 8,
      title: "Japan first time",
      start_date: "2024-08-03T00:00:00.000Z",
      end_date: "2024-08-08T00:00:00.000Z",
      total_like: 23,
      photo_url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
      user: { username: "user6" },
    },
  ];

  const [view, setView] = useState("My plans");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toggle Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 -mb-6">
        <div className="flex justify-center">
          <button
            onClick={() => setView("My plans")}
            className={`py-2 px-4 rounded-l-full border shadow-md ${
              view === "My plans"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
          >
            My plans
          </button>
          <button
            onClick={() => setView("Bookmarks")}
            className={`py-2 px-4 rounded-r-full border shadow-md ${
              view === "Bookmarks"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
          >
            Bookmarks
          </button>
        </div>
      </div>

      {/* Conditionally Render Plan Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {view === "My plans" && (
          <div>
            {/* My Plans Title and Create a New Plan Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Plans</h2>
              <Link href="/plans/create">
                <button className="py-2 px-4 rounded-full border shadow-md bg-indigo-500 text-white hover:bg-indigo-600">
                  Create a New Plan
                </button>
              </Link>
            </div>
            {popularPlans.length === 0 ? (
              <p className="text-gray-600">You have no plans yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        )}

        {view === "Bookmarks" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
            {bookmarks.length === 0 ? (
              <p className="text-gray-600">You have no bookmarked plans.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
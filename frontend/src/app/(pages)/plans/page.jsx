"use client";

import Link from "next/link";
import PlanCard from "../../../components/PlanCard";
import { useState } from "react";

export default function PlansPage() {
  // Mock data (to be replaced with API calls later)
  const popularPlans = [
    {
      id: 1,
      name: "Summer in Bali",
      start_date: "2024-11-17T00:00:00.000Z",
      end_date: "2024-11-23T00:00:00.000Z",
      total_like: 198,
      user: { username: "user1" },
    },
    {
      id: 2,
      name: "Winter in Paris",
      start_date: "2024-08-03T00:00:00.000Z",
      end_date: "2024-08-08T00:00:00.000Z",
      total_like: 167,
      user: { username: "user1" },
    },
    {
      id: 3,
      name: "Hiking in Alps",
      start_date: "2024-08-12T00:00:00.000Z",
      end_date: "2024-08-23T00:00:00.000Z",
      total_like: 151,
      user: { username: "user1" },
    },
    {
      id: 4,
      name: "Beach Getaway in Maldives",
      start_date: "2024-09-05T00:00:00.000Z",
      end_date: "2024-09-10T00:00:00.000Z",
      total_like: 134,
      user: { username: "user1" },
    },
    {
      id: 5,
      name: "City Tour in Tokyo",
      start_date: "2024-10-20T00:00:00.000Z",
      end_date: "2024-10-25T00:00:00.000Z",
      total_like: 122,
      user: { username: "user1" },
    },
    {
      id: 6,
      name: "Safari in Kenya",
      start_date: "2024-12-01T00:00:00.000Z",
      end_date: "2024-12-07T00:00:00.000Z",
      total_like: 109,
      user: { username: "user1" },
    },
  ];

  const bookmarks = [
    {
      id: 7,
      name: "Roadtrip in America",
      start_date: "2024-11-17T00:00:00.000Z",
      end_date: "2024-11-23T00:00:00.000Z",
      total_like: 543,
      user: { username: "user3" },
    },
    {
      id: 8,
      name: "Japan first time",
      start_date: "2024-08-03T00:00:00.000Z",
      end_date: "2024-08-08T00:00:00.000Z",
      total_like: 23,
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
              <Link href="/create_plan">
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
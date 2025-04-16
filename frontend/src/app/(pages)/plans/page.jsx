"use client";

import Link from "next/link";
import PlanCard from "../../../components/PlanCard";
import { useState, useEffect } from "react";
import axios from "axios";

import { useUser } from "@/context/UserContext";

export default function PlansPage() {
  const { user } = useUser();
  const [currentUserPlans, setCurrentUserPlans] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [view, setView] = useState("My plans");
  const [loading, setLoading] = useState(true);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarksError, setBookmarksError] = useState(null);

  useEffect(() => {
    const fetchUserPlans = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/plans/user`, {
          withCredentials: true,
        });

        const responseJson = await response.json();

        let plansData = responseJson.data;
        console.log("User plans: ", plansData);

        if (plansData) {
          let index = 1;
          // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมสำหรับ PlanCard
          const formattedPlans = plansData.map((plan) => {
            console.log("Plan with photo:", plan); // ตรวจสอบข้อมูลที่ได้รับจาก backend
            return {
              id: index++,
              planId: plan.id,
              title: plan.title,
              startDate: plan.startDate,
              endDate: plan.endDate,
              totalLike: plan.totalLike,
              photoUrl: plan.photoUrl, // ตรวจสอบว่าได้รับข้อมูล photoUrl หรือไม่
              user: {
                username: plan.user?.username || "Unknown",
              },
            };
          });

          setCurrentUserPlans(formattedPlans);
          console.log("userPlans: ", currentUserPlans);
        }
      } catch (error) {
        console.error("Error fetching user plans:", error);
        setError(
          "Failed to load your plans. Please try again later. (try login then will show up : ya writed)"
        );
        setCurrentUserPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlans();
  }, [user]);

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูล bookmarks
    const fetchUserBookmarks = async () => {
      try {
        setBookmarksLoading(true);
        setBookmarksError(null);

        const response = await fetch("/api/plans/bookmarks", {
          withCredentials: true,
        });

        const responseJson = await response.json();
        const bookmarkedTravelPlans = responseJson.data;
        console.log("User bookmarks: ", bookmarkedTravelPlans);

        if (bookmarkedTravelPlans /* && Array.isArray(bookmarkIds) */) {
          // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมสำหรับ PlanCard

          // for (let bookmark in bookmarkedTravelPlans) {
          //   const response = await fetch(`/api/plans/${bookmark.travelPlanId}`);
          //   const responseJson = await response.json();

          //   let bookmarkedPlans = responseJson.data;
          //   console.log("bookmarkedPlans: ", bookmarkedPlans);
          // }

          let index = 1;
          const formattedBookmarks = bookmarkedTravelPlans.map((plan) => {
            console.log("Bookmarked plan with photo:", plan); // ตรวจสอบข้อมูลที่ได้รับจาก backend
            return {
              id: index++,
              planId: plan.id,
              title: plan.title,
              startDate: plan.startDate,
              endDate: plan.endDate,
              totalLike: plan.totalLike,
              photoUrl: plan.photoUrl, // ตรวจสอบว่าได้รับข้อมูล photoUrl หรือไม่
              user: {
                username: plan.user?.username || "Unknown",
              },
            };
          });

          setBookmarks(formattedBookmarks);
        }
      } catch (error) {
        console.error("Error fetching user bookmarks:", error);
        setBookmarksError(
          "Failed to load your bookmarks. Please try again later."
        );
        setBookmarks([]);
      } finally {
        setBookmarksLoading(false);
      }
    };

    fetchUserBookmarks();
  }, [user]);

  // เมื่อกดปุ่ม Bookmarks ให้ดึงข้อมูล bookmarks
  const handleViewChange = (newView) => {
    setView(newView);
    if (
      newView === "Bookmarks" &&
      bookmarks.length === 0 &&
      !bookmarksLoading
    ) {
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toggle Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 -mb-6">
        <div className="flex justify-center">
          <button
            onClick={() => handleViewChange("My plans")}
            className={`py-2 px-4 rounded-l-full border shadow-md ${
              view === "My plans"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
          >
            My Plans
          </button>
          <button
            onClick={() => handleViewChange("Bookmarks")}
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
                <button className="py-1 px-4 rounded-full border shadow-md bg-indigo-500 text-white hover:bg-indigo-600 transition-transform duration-200 transform hover:scale-110 active:scale-100">
                  + Create a New Plan
                </button>
              </Link>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-600">Loading your plans...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-red-500">{error}</p>
              </div>
            ) : currentUserPlans.length === 0 ? (
              <p className="text-gray-600">You have no plans yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUserPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        )}

        {view === "Bookmarks" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
            {bookmarksLoading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-600">Loading your bookmarks...</p>
              </div>
            ) : bookmarksError ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-red-500">{bookmarksError}</p>
              </div>
            ) : bookmarks.length === 0 ? (
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

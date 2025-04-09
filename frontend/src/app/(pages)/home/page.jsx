"use client";

/**
 * plans/1
 * plans/create
 * 
 * profile
 * profile/edit
 * 
 * journals
 */

import { useEffect, useState } from "react";
import Link from 'next/link';
import PlanCard from '../../../components/PlanCard';
import axios from "axios";

export default function Home() {
  const [popularPlans, setPopularPlans] = useState([]);
  const [visiblePlans, setVisiblePlans] = useState(6); // Number of plans to display
  const [expanded, setExpanded] = useState(false); // expand & collapse state
  const [journals, setJournals] = useState([]); // เพิ่ม state สำหรับเก็บข้อมูล journals

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/plans");
        const plansData = response.data.data;
        
        console.log("plans: ", plansData);
        
        if (plansData && Array.isArray(plansData)) {
          const formattedPlans = plansData.map((plan, index) => {
            return {
              id: index + 1,
              plan_id: plan.id,
              title: plan.title,
              start_date: plan.startDate,
              end_date: plan.endDate,
              total_like: plan.totalLike,
              photo_url: plan.photoUrl,
              user: {
                username: plan.user?.username || "Unknown"
              }
            };
          });
          
          // เรียงลำดับตามจำนวนไลค์จากมากไปน้อย
          formattedPlans.sort((a, b) => b.total_like - a.total_like);
          
          setPopularPlans(formattedPlans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    const fetchJournals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/journals");
        const journalsData = response.data.data;
        
        console.log("journals: ", journalsData);
        
        if (journalsData && Array.isArray(journalsData)) {
          setJournals(journalsData);
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchPlans();
    fetchJournals(); // เรียกฟังก์ชันดึงข้อมูล journals
  }, []); // Empty dependency array to run only once on component mount

  // ฟังก์ชันสำหรับสลับการแสดงแผน
  const handleToggleShow = () => {
    if (expanded) {
      // ถ้าขยายอยู่แล้ว ให้หุบกลับเป็น 6 อัน
      setVisiblePlans(6);
      setExpanded(false);
    } else {
      // ถ้ายังไม่ขยาย ให้ขยายเป็น 12 อัน
      setVisiblePlans(12);
      setExpanded(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/landscape.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plan your trip, share your journey, and keep your memories – all in one place.
          </h1>
          <Link href="/plans/create">
            <button className="bg-white text-xl text-indigo-600 font-bold py-3 px-10 rounded-full transition-transform duration-200 transform hover:scale-110 active:scale-100">
              Plan Your Trip
            </button>
          </Link>
        </div>
      </div>

      {/* Popular Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Popular Plans</h2>
          <Link href="/community" className="text-indigo-600 hover:underline">
            See More in Community
          </Link>
        </div>
        {/* Plan Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlans.slice(0, visiblePlans).map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {popularPlans.length > 6 && (
            <div className="text-center mt-8">
              <button 
                onClick={handleToggleShow}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
      </div>

    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";

import Loading from "@/app/feed/loading";
import Avatar from "@/components/Avatar";

import { useUser } from "@/context/UserContext";

// ไม่ใช้ข้อมูลจำลองอีกต่อไป เพราะเราจะดึงข้อมูลจริงจาก API

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  // const [user, setCurrentUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!user || !user.id) {
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // ดึงข้อมูลแผนการเดินทาง
        const plansResponse = await axios.get(`${process.env.NEXT_API_URL}/api/plans/user`, {
          withCredentials: true
        });
        
        if (plansResponse.status === 200) {
          const plansData = await plansResponse.data;
          console.log("My plans:", plansData.data);
          setPlans(plansData.data || []);
          
          // คำนวณจำนวนไลก์ทั้งหมด
          const totalLikesCount = (plansData.data || []).reduce(
            (sum, plan) => sum + (plan.totalLike || 0), 0
          );
          setTotalLikes(totalLikesCount);
        }
        
        // ดึงข้อมูลบันทึกการเดินทาง
        const journalsResponse = await axios.get(`${process.env.NEXT_API_URL}/api/journals/user`, {
          withCredentials: true
        });
        
        if (journalsResponse.status === 200) {
          const journalsData = await journalsResponse.data;
          console.log("My journals:", journalsData.data);
          setJournals(journalsData.data || []);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);


  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle user data is not available
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-red-600">User data not found</div>
      </div>
    );
  }

  // Navigate to Edit Profile page
  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-top justify-center p-6">
      
      <div className="relative w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold flex justify-center mb-4">
        Profile
      </h1>
        {/* Gradient Background */}
        <div className="h-60 w-full bg-gradient-to-b from-indigo-600 to-indigo-200 rounded-lg"></div>

        {/* White Card Section */}
        <div className="bg-white rounded-lg shadow-md -mt-12 mx-4 p-6 relative">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16">
            <Avatar src={user.avatarUrl ? `${process.env.NEXT_API_URL}/avatars/${user.avatarUrl}` : "/images/default-avatar.png"} alt={`${user.username}'s avatar`} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" />
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">{user.username}</h1>
            <p className="text-gray-600 text-center">{user.email}</p>

          </div>

          {/* Stats Section */}
          <div className="mt-6 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">{plans.length}</p>
                <p className="text-sm text-gray-600">Public Plans Created</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{totalLikes}</p>
                <p className="text-sm text-gray-600">Likes Received</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{journals.length}</p>
                <p className="text-sm text-gray-600">Journals Written</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 relative">
            <div className="text-sm text-gray-600 space-y-2 text-left">
              <p>
                <span className="font-medium">Joined: </span>
                {format(new Date(user.createdAt), "d MMMM yyyy")}
              </p>
              <p>
                <span className="font-medium">Last Edited: </span>
                {format(new Date(user.updatedAt), "d MMMM yyyy, h:mm a")}
              </p>
            </div>

            <button
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 w-9 h-9 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center"
            >
              <FaPencilAlt className="text-sm" />
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
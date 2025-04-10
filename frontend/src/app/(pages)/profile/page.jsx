"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FaPencilAlt } from "react-icons/fa";

import Loading from "@/app/feed/loading";
import Avatar from "@/components/Avatar";

import { useUser } from "@/context/UserContext";

// Mock data for user and plans (no journals needed since we're not displaying them)
// const mockUser = {
//   id: 1,
//   username: "SamanthaJones",
//   email: "samantha.jones@example.com",
//   // password: "hashedpassword123",
//   avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
//   createdAt: "2023-01-15T10:00:00Z",
//   updatedAt: "2024-04-07T14:30:00Z",
// };

const mockPlans = [
  {
    id: 1,
    title: "Summer in Bali",
    city_title: "Bali, Indonesia",
    likes: 25,
    visibility: "public",
  },
  {
    id: 2,
    title: "Winter in Paris",
    city_title: "Paris, France",
    likes: 40,
    visibility: "private",
  },
  {
    id: 3,
    title: "Spring in Tokyo",
    city_title: "Tokyo, Japan",
    likes: 15,
    visibility: "public",
  },
];

// Mock journals data (for stats only, not displayed)
const mockJournals = [
  {
    id: 1,
    planId: 1,
    rating: 4,
    overallMemories: "An unforgettable trip to Bali! The beaches were stunning.",
    favoriteMoment: "Watching the sunset at Kuta Beach was magical.",
    visibility: "public",
  },
  {
    id: 2,
    planId: 2,
    rating: 5,
    overallMemories: "Paris in winter was a dream come true.",
    favoriteMoment: "Seeing the Eiffel Tower light up at night.",
    visibility: "private",
  },
];

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Simulate fetching data (replace with API calls later)
      setCurrentUser(user);

      console.log("LLL", `http://localhost:5000/api/plans?author_id=${user.id}`);

      // const getMyPlans = async () => {
      //   const response = await fetch(`http://localhost:5000/api/plans?author_id=${user.id}`, {
      //     withCredentials: true
      //   });
        
      //   const responseJson = response.json();
      //   console.log("my plans: ", responseJson.data);
      //   setPlans(responseJson.data);
      // };

      // getMyPlans();

      setPlans(mockPlans);
      setJournals(mockJournals);
      setIsLoading(false);
    } catch (e) {
      console.error(e.message);
    }
  }, [user]);

  // Calculate total likes from plans
  const totalLikes = plans.reduce((sum, plan) => sum + (plan.likes || 0), 0);

  // Handle loading
  if (isLoading) {
    <Loading />
    // return (
    //   <div className="flex h-screen items-center justify-center">
    //     <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
    //   </div>
    // );
  }

  // Handle user data is not available
  if (!currentUser) {
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
            <Avatar src={`http://localhost:5000/uploads${currentUser.avatarUrl}` || "/images/default-avatar.png"} alt={`${currentUser.username}'s avatar`} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" />
          </div>

          {/* User Info */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">{currentUser.username}</h1>
            <p className="text-gray-600 text-center">{currentUser.email}</p>

          </div>

          {/* Stats Section */}
          <div className="mt-6 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">{plans.length}</p>
                <p className="text-sm text-gray-600">Plans Created</p>
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
                {format(new Date(currentUser.createdAt), "d MMMM yyyy")}
              </p>
              <p>
                <span className="font-medium">Last Edited: </span>
                {format(new Date(currentUser.updatedAt), "d MMMM yyyy, h:mm a")}
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
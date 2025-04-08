"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { FaPencilAlt } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data (replace with API calls later)
  useEffect(() => {
    // Mock user data
    const mockUser = {
      id: 1,
      username: "SamanthaJones",
      email: "samantha.jones@example.com",
      password: "hashedpassword123",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      created_at: "2023-01-15T10:00:00Z",
      updated_at: "2024-04-07T14:30:00Z",
    };

    // Mock plans data
    const mockPlans = [
      {
        id: 1,
        title: "Summer in Bali",
        city_title: "Bali, Indonesia",
        likes: 25,
      },
      {
        id: 2,
        title: "Winter in Paris",
        city_title: "Paris, France",
        likes: 40,
      },
      {
        id: 3,
        title: "Spring in Tokyo",
        city_title: "Tokyo, Japan",
        likes: 15,
      },
    ];

    // Set the mock data
    setUser(mockUser);
    setPlans(mockPlans);
    setIsLoading(false);
  }, []);

  // Calculate total likes from plans
  const totalLikes = plans.reduce((sum, plan) => sum + (plan.likes || 0), 0);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
      </div>
    );
  }

  // Handle case where user data is not available
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-red-600">User data not found</div>
      </div>
    );
  }

  // Navigate to Edit Profile page
  const handleEditProfile = () => {
    router.push("/editProfile");
  };

  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl p-6">
        {/* Gradient bg */}
        <div className="h-60 w-full bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg"></div>

        {/* White Card Section */}
        <div className="bg-white rounded-lg shadow-md -mt-20 mx-4 p-6 relative">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16">
            <img
              src={user.avatar || "/images/default-avatar.png"}
              alt={`${user.username}'s avatar`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around mt-6 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">{plans.length}</p>
              <p className="text-sm text-gray-600">Plans Created</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">{totalLikes}</p>
              <p className="text-sm text-gray-600">Likes Received</p>
            </div>
          </div>

          {/* Dates Section */}
          <div className="mt-6">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Joined:</p>
              <p className="text-sm text-gray-800">
                {format(new Date(user.created_at), "d MMMM yyyy")}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600">Last Edited:</p>
              <p className="text-sm text-gray-800">
                {format(new Date(user.updated_at), "d MMMM yyyy, h:mm a")}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6">
            <button
              onClick={handleEditProfile}
              className="item-right w-md bg-indigo-500 text-white py-3 pl-4 pr-4 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              <FaPencilAlt className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
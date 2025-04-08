"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    created_at: "",
    updated_at: "",
  });
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

    // Set the mock data into formData
    setFormData({
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
      avatar: mockUser.avatar,
      created_at: mockUser.created_at,
      updated_at: mockUser.updated_at,
    });
    setIsLoading(false);

    // Replace this with real API calls when ready
    /*
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const userResponse = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data;
        setFormData({
          username: user.username,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          created_at: user.created_at,
          updated_at: user.updated_at,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
    */
  }, [router]);

  // Handle input changes for editable fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (mock update for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock update logic
    console.log("Updated user data:", {
      username: formData.username,
      password: formData.password,
      avatar: formData.avatar,
    });

    // Update the updated_at field to the current time
    setFormData({
      ...formData,
      updated_at: new Date().toISOString(),
    });

    // Navigate back to the profile page
    router.push("/profile");

    // Replace this with a real API call to update the user
    /*
    const updateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://localhost:5000/api/users/me",
          {
            username: formData.username,
            password: formData.password,
            avatar: formData.avatar,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        router.push("/profile");
      } catch (err) {
        console.error("Error updating user:", err);
      }
    };
    updateUser();
    */
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-indigo-600 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl p-6">
        {/* Gradient Background */}
        <div className="h-60 w-full bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg"></div>

        {/* White Card Section */}
        <div className="bg-white rounded-lg shadow-md -mt-20 mx-4 p-6 relative">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16">
            <img
              src={formData.avatar || "/images/default-avatar.png"}
              alt={`${formData.username}'s avatar`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Edit Profile</h1>

            {/* Avatar URL */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Enter avatar URL"
              />
            </div>

            {/* Username */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Enter username"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed text-black"
                readOnly
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Enter new password"
              />
            </div>

            {/* Dates Section (Read-only) */}
            <div className="mt-6">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Joined:</p>
                <p className="text-sm text-gray-800">
                  {format(new Date(formData.created_at), "d MMMM yyyy")}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">Last Edited:</p>
                <p className="text-sm text-gray-800">
                  {format(new Date(formData.updated_at), "d MMMM yyyy, h:mm a")}
                </p>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
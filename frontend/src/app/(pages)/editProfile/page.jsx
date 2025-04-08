"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";

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
  const [avatarFile, setAvatarFile] = useState(null); // Store the selected file
  const [avatarPreview, setAvatarPreview] = useState(null); // Store the preview URL
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock data (replace with API calls later)
  useEffect(() => {
    // Mock user data
    const mockUser = {
      id: 1,
      username: "SamanthaJones",
      email: "samantha.jones@example.com",
      password: "hashedpassword123",
      avatar: "",
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

    // Set the initial avatar preview to the current avatar
    setAvatarPreview(mockUser.avatar);
    setIsLoading(false);
  }, [router]);

  // Handle input changes for editable fields (username, password)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle avatar file selection and preview
  const handleUploadPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file); // Create a local URL for preview
      setAvatarPreview(previewUrl);
    }
  };

  // Handle form submission (mock update for now)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Mock avatar upload logic
    let avatarUrl = formData.avatar; // Default to existing avatar URL
    if (avatarFile) {
      // Simulate a successful upload
      console.log("Mock uploading avatar file:", avatarFile.name);
      avatarUrl = URL.createObjectURL(avatarFile); // Use the local URL for now

      // Replace this with a real API call to upload the avatar
      /*
      try {
        const avatarFileUploadForm = new FormData();
        avatarFileUploadForm.append("avatarFile", avatarFile);

        const avatarFileUploadResponse = await axios.post(
          "http://localhost:5000/api/files/avatars",
          avatarFileUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (avatarFileUploadResponse.status !== 200) {
          setError("Error uploading avatar file");
          return;
        }

        console.log("avatarFileUploadResponse.data.url:", avatarFileUploadResponse.data.url);
        avatarUrl = avatarFileUploadResponse.data.url;
      } catch (err) {
        console.error("Error uploading avatar:", err);
        setError("Error uploading avatar file");
        return;
      }
      */
    }

    // Mock update logic
    console.log("Updated user data:", {
      username: formData.username,
      password: formData.password,
      avatar: avatarUrl,
    });

    // Update the formData with the new avatar URL and updated_at
    setFormData({
      ...formData,
      avatar: avatarUrl,
      updated_at: new Date().toISOString(),
    });

    // Navigate back to the profile page
    router.push("/profile");
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
        <h1 className="text-3xl font-bold text-indigo-500 text-center mb-4">Edit Profile</h1>
        {/* Gradient Background */}
        <div className="h-60 w-full bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg"></div>

        {/* White Card Section */}
        <div className="bg-white rounded-lg shadow-md -mt-20 mx-4 p-6 relative">
          {/* Form Section */}
          <div className="mt-4">
            

            {/* Avatar Preview and Upload */}
            <div className="mb-6 flex flex-col items-center -mt-16">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                  {avatarPreview || formData.avatar ? (
                    <Image
                      src={avatarPreview || formData.avatar}
                      alt="Avatar preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
              </div>
              <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Upload Avatar
                <input
                  name="avatar"
                  id="avatarFile"
                  type="file"
                  className="hidden"
                  onChange={handleUploadPicture}
                  accept="image/*"
                />
              </label>
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

            {/* Error Message */}
            {error && <p className="text-red-600 mt-4">{error}</p>}

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
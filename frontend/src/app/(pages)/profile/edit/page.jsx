"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import axios from "axios";

import { useUser } from "@/context/UserContext";
import Loading from "@/app/feed/loading";

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
  const [isPasswordEditable, setIsPasswordEditable] = useState(false); // Toggle password edit mode
  const [newPassword, setNewPassword] = useState(""); // Store new password
  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirm password

  const { user, setUser } = useUser();

  // ดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.id) {
        router.push('/login');
        return;
      }

      try {
        // ดึงข้อมูลผู้ใช้จาก API
        const response = await axios.get('/api/users/profile', {
          withCredentials: true
        });

        if (response.data.status === 'success') {
          const userData = response.data.data;
          
          // ตั้งค่าข้อมูลในฟอร์ม
          setFormData({
            username: userData.username,
            email: userData.email,
            password: '',  // ไม่แสดงรหัสผ่านเดิม
            avatar: userData.avatarUrl || '',
            created_at: userData.createdAt,
            updated_at: userData.updatedAt,
          });

          // ตั้งค่ารูปภาพผู้ใช้
          // ไม่ตั้งค่า avatarPreview เพื่อให้แสดงรูปภาพปัจจุบันจาก formData.avatar แทน
          // if (userData.avatarUrl) {
          //   setAvatarPreview(process.env.NEXT_API_URL + userData.avatarUrl);
          // }
        } else {
          setError('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  // Handle input changes for editable fields (username)
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

  // Toggle password edit mode
  const togglePasswordEdit = () => {
    setIsPasswordEditable(!isPasswordEditable);
    setNewPassword(""); // Reset new password field
    setConfirmPassword(""); // Reset confirm password field
    setError(""); // Clear any errors
  };

  // ส่งข้อมูลไปยัง API เพื่อแก้ไขข้อมูลผู้ใช้
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // ตรวจสอบรหัสผ่านหากมีการแก้ไข
      if (isPasswordEditable) {
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match.");
          setIsLoading(false);
          return;
        }
        if (newPassword.length < 8) {
          setError("Password must be at least 8 characters long.");
          setIsLoading(false);
          return;
        }
      }

      // อัปโหลดรูปภาพหากมีการเปลี่ยน
      let avatarUrl = formData.avatar; // ใช้รูปภาพเดิมถ้าไม่มีการเปลี่ยน
      
      if (avatarFile) {
        // สร้าง FormData สำหรับอัปโหลดไฟล์
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        // อัปโหลดรูปภาพ
        const uploadResponse = await axios.post(
          "/api/users/avatar",
          avatarFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true
          }
        );

        if (uploadResponse.data.status === "success") {
          avatarUrl = uploadResponse.data.avatarUrl;
        } else {
          setError("Error uploading avatar");
          setIsLoading(false);
          return;
        }
      }

      // สร้างข้อมูลที่จะอัปเดต
      const updateData = {
        username: formData.username,
        avatarUrl: avatarUrl
      };

      // เพิ่มรหัสผ่านหากมีการแก้ไข
      if (isPasswordEditable && newPassword) {
        updateData.password = newPassword;
      }

      // ส่งข้อมูลไปยัง API เพื่อแก้ไขข้อมูลผู้ใช้
      const updateResponse = await axios.put(
        "/api/users/profile",
        updateData,
        { withCredentials: true }
      );

      if (updateResponse.data.status === "success") {
        // อัปเดตข้อมูลใน UserContext
        setUser({
          ...user,
          username: formData.username,
          avatarUrl: avatarUrl
        });
        
        // กลับไปยังหน้า profile
        router.push("/profile");
      } else {
        setError(updateResponse.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  // แสดงสถานะ loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-indigo-500 text-center mb-4">Edit Profile</h1>
        {/* Gradient Background */}
        <div className="h-40 w-full bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg"></div>

        {/* White Card Section */}
        <div className="bg-white rounded-lg shadow-md -mt-12 mx-4 p-6 relative">
          {/* Combined Form */}
          <form onSubmit={handleSubmit}>
            {/* Avatar Preview and Upload */}
            <div className="mb-6 flex flex-col items-center -mt-16">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : formData.avatar ? (
                    <img
                      src={`${process.env.NEXT_API_URL}/avatars/${formData.avatar}`}
                      alt="Current avatar"
                      className="w-full h-full object-cover"
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

            {/* Password Section */}
            <div className="mt-4">
              {/* <label className="block text-gray-700 mb-2">Password</label>
              <input
                type={isPasswordEditable ? "text" : "password"} // Show text when editing
                name="password"
                value={formData.password}
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed text-black"
                readOnly
              /> */}
              <button
                type="button"
                onClick={togglePasswordEdit}
                className="mt-2 text-indigo-500 hover:underline"
              >
                {isPasswordEditable ? "Cancel" : "Change Password"}
              </button>

              {/* New Password Fields (Visible only when editing) */}
              {isPasswordEditable && (
                <div className="mt-4">
                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-4">{error}</p>}

            {/* Save Changes Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Register Field ${name} updated to: "${value}" (Type: ${typeof value})`);
        setFormData((prev) => {
            const newFormData = { ...prev, [name]: value };
            console.log("Updated formData:", newFormData);
            return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        console.log("Register Form Data Before Validation:", formData);
        console.log(
            `Comparing Password: "${formData.password}" (Type: ${typeof formData.password}) with Confirm Password: "${formData.confirmPassword}" (Type: ${typeof formData.confirmPassword})`
        );
    
        // Trim the values to avoid whitespace issues
        const password = formData.password.trim();
        const confirmPassword = formData.confirmPassword.trim();
    
        // Validate passwords
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            console.log(
                `Password: "${password}", Confirm Password: "${confirmPassword}"`
            );
            return;
        }
    
        // Validate required fields
        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("Registration successful:", response.data);
            router.push("/login");
        } catch (err) {
            console.error("Error registering:", err.response?.data);
            setError(err.response?.data?.message || "Failed to register");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
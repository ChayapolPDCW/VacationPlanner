'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [username, setUsername] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setUsername(payload.username);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    // ฟังก์ชันสำหรับตรวจสอบการ login ก่อนนำทางไปยังหน้าที่ต้องการ
    const handleProtectedNavigation = (e, path) => {
        e.preventDefault();
        
        // ตรวจสอบว่ามี token หรือไม่
        const token = localStorage.getItem('token');
        
        if (token) {
            // ถ้ามี token ให้นำทางไปยังหน้าที่ต้องการ
            window.location.href = path;
        } else {
            // ถ้าไม่มี token ให้นำทางไปยังหน้า login
            window.location.href = '/login';
        }
    };

    return (
        <nav className="relative flex justify-center items-center p-4 bg-white shadow-md">
            <div className="absolute left-4 flex items-center">
                <a href="/" className="text-blue-600 font-semibold ml-4 text-2xl">
                    Vacation Planner
                </a>
            </div>
            <div className="flex space-x-10">
                <a href="/" className="text-blue-600 font-semibold hover:underline">
                    Home
                </a>
                <a href="/plans" onClick={(e) => handleProtectedNavigation(e, '/plans')} className="text-blue-600 font-semibold hover:underline">
                    Plans
                </a>
                <a href="/community" className="text-blue-600 font-semibold hover:underline">
                    Community
                </a>
                <a 
                    href="/journal" 
                    onClick={(e) => handleProtectedNavigation(e, '/journal')}
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Journal 
                </a>
            </div>
            <div className="absolute right-4 flex items-center">
                {username ? (
                    <div className="flex items-center relative">
                        <div className="text-blue-600 font-medium">Good day! {username}</div>
                        <div className="cursor-pointer" onClick={toggleMenu}>
                            <span className="text-2xl text-blue-600">☰</span>
                        </div>
                        {isMenuOpen && (
                            <div className="absolute right-0 top-8 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile
                                </a>
                                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Settings
                                </a>
                                <button 
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center relative">
                        <a href="/login" className="mr-4 text-blue-600 hover:underline">Hi!</a>
                        <div className="cursor-pointer" onClick={toggleMenu}>
                            <span className="text-2xl text-blue-600">☰</span>
                        </div>
                        {isMenuOpen && (
                            <div className="absolute right-0 top-8 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Login
                                </a>
                                <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Register
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
import Image from 'next/image';

export default function Navbar() {
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
                <a href="/plans" className="text-blue-600 font-semibold hover:underline">
                    Plans
                </a>
                <a href="/community" className="text-blue-600 font-semibold hover:underline">
                    Community
                </a>
                <a href="/journal" className="text-blue-600 font-semibold hover:underline">
                    Journal
                </a>
            </div>
            <div className="absolute right-4">
                <span className="text-2xl cursor-pointer">
                    <a href="/register" className="text-blue-600 hover:underline">
                        ☰
                    </a>
                </span>
            </div>
        </nav>
    );
}
export default function Home() {
  return (
      <div className="min-h-screen p-6">
          <h1 className="text-4xl font-bold mb-10">Welcome to Vacation Planner</h1>
                                                 
          <a href="/create_plan" className="w-full bg-blue-600 text-white py-3 px-5 mt-5 shadow-lg rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Plan your trip
          </a>
      </div>
  );
}
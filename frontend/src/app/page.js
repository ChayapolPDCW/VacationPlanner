export default function Home() {
  return (
      <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Vacation Planner</h1>
          <p className="text-lg">Plan your perfect vacation with ease!</p>
          <a href="/create_plan" className="text-blue-600 underline mt-4 inline-block">
              Create a New Plan
          </a>
      </div>
  );
}
export default function Home() {
  return (
      <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">Vacation Planner</h1>
          
          <a href="/create_plan" className="text-blue-600 underline mt-4 inline-block">
              Create a New Plan
          </a>
      </div>
  );
}
import Link from 'next/link';
import PlanCard from '../../components/PlanCard';

export default function Home() {
  // Hardcoded data Popular Plans
  const popularPlans = [
    { id: 1, name: "Summer in Bali", start_date: "2024-11-17T00:00:00.000Z", end_date: "2024-11-23T00:00:00.000Z", total_like: 198, user: { username: "user1" } },
    { id: 2, name: "Winter in Paris", start_date: "2024-08-03T00:00:00.000Z", end_date: "2024-08-08T00:00:00.000Z", total_like: 167, user: { username: "user2" } },
    { id: 3, name: "Hiking in Alps", start_date: "2024-08-12T00:00:00.000Z", end_date: "2024-08-23T00:00:00.000Z", total_like: 151, user: { username: "user3" } },
    { id: 4, name: "Beach Getaway in Maldives", start_date: "2024-09-05T00:00:00.000Z", end_date: "2024-09-10T00:00:00.000Z", total_like: 134, user: { username: "user4" } },
    { id: 5, name: "City Tour in Tokyo", start_date: "2024-10-20T00:00:00.000Z", end_date: "2024-10-25T00:00:00.000Z", total_like: 122, user: { username: "user5" } },
    { id: 6, name: "Safari in Kenya", start_date: "2024-12-01T00:00:00.000Z", end_date: "2024-12-07T00:00:00.000Z", total_like: 109, user: { username: "user6" } },
  ];

  // Journals 
  const journals = [
    { id: 1, title: "Journal's title", username: "username", location: "Chiang Mai, Thailand", date: "12 Jan - 23 Jan 2025" },
    { id: 2, title: "Journal's title", username: "username", location: "Paris, France", date: "29 Mar - 3 Apr 2024" },
    { id: 3, title: "Journal's title", username: "username", location: "Chiang Mai, Thailand", date: "24 July - 8 Aug 2024" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/landscape.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h1>
          <Link href="/create_plan">
            <button className="bg-white text-xl text-indigo-600 font-bold py-3 px-10 rounded-full hover:bg-indigo-100 transition">
              Plan Your Trip
            </button>
          </Link>
        </div>
      </div>

      {/* Popular Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Popular Plans</h2>
          <Link href="/plans" className="text-indigo-600 hover:underline">
            See More in Community
          </Link>
        </div>
        {/* Plan Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
      </div>

      {/* Explore Journals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Journals</h2>
        <div className="space-y-4">
          {journals.map(journal => (
            <div key={journal.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{journal.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-gray-600">by [{journal.username}]</p>
                <p className="text-gray-600">{journal.location}</p>
                <p className="text-gray-600">{journal.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
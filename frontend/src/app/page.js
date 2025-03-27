import Link from 'next/link';

const Home = () => {
  // Mock data 
  const popularPlans = [
    { id: 1, name: "Trip's name", username: "username", dateRange: "17 Nov - 23 Nov", likes: 198 },
    { id: 2, name: "Trip's name", username: "username", dateRange: "3 Aug - 8 Aug", likes: 167 },
    { id: 3, name: "Trip's name", username: "username", dateRange: "3 Aug - 8 Aug", likes: 122 },
  ];

  
  const journals = [
    { id: 1, title: "Journal's title", username: "username", location: "Chiang Mai, Thailand", date: "12 Jan - 23 Jan 2025" },
    { id: 2, title: "Journal's title", username: "username", location: "Paris, France", date: "29 Mar - 3 Apr 2024" },
    { id: 3, title: "Journal's title", username: "username", location: "Chiang Mai, Thailand", date: "24 July - 8 Aug 2024" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:  `url('/images/landscape.jpeg')`,
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
          <Link href="/community" className="text-indigo-600 hover:underline">
            See More in Community
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-indigo-400"></div> {/* Placeholder for image */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600">by [{plan.username}]</p>
                <p className="text-gray-600">{plan.dateRange}</p>
                <p className="text-gray-600">{plan.likes} Likes</p>
              </div>
            </div>
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
};

export default Home;
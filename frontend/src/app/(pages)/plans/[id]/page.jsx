"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { use } from 'react';

const MapComponent = dynamic(() => import('../../../../components/MapComponent'), {
  ssr: false,
});

// Mock data matching Create Plan structure
const mockPlans = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    startDate: "2024-11-17T00:00:00.000Z",
    endDate: "2024-11-23T00:00:00.000Z",
    total_like: 198,
    user: { username: "user1" },
    description: "A relaxing summer getaway in Bali",
    visibility: "public",
    itinerary: [
      {
        date: "2024-11-17T00:00:00.000Z",
        places: [
          {
            id: 1,
            name: "Kuta Beach",
            description: "Kuta Beach, Bali",
            lat: -8.7186,
            lng: 115.1686,
            image: "/images/kuta.jpeg",
            travelTime: "N/A"
          },
          {
            id: 2,
            name: "Seminyak Beach",
            description: "Seminyak Beach, Bali",
            lat: -8.6894,
            lng: 115.1622,
            image: "/images/seminyak.jpeg",
            travelTime: "15 mins, 4.2 km"
          }
        ]
      },
      {
        date: "2024-11-18T00:00:00.000Z",
        places: [
          {
            id: 3,
            name: "Uluwatu Temple",
            description: "Uluwatu Temple, Bali",
            lat: -8.8291,
            lng: 115.0849,
            image: "/images/Uluwatu Temple.jpeg",
            travelTime: "N/A"
          },
          {
            id: 4,
            name: "Jimbaran Beach",
            description: "Jimbaran Beach, Bali",
            lat: -8.7747,
            lng: 115.1658,
            image: "/images/Jimbaran Beach.jpeg",
            travelTime: "45 mins, 18.3 km"
          }
        ]
      },
      {
        date: "2024-11-19T00:00:00.000Z",
        places: [
          {
            id: 5,
            name: "Ubud Monkey Forest",
            description: "Ubud Monkey Forest, Bali",
            lat: -8.5193,
            lng: 115.2603,
            image: "/images/Ubud Monkey Forest.jpeg",
            travelTime: "N/A"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    destination: "Paris, France",
    startDate: "2024-08-03T00:00:00.000Z",
    endDate: "2024-08-08T00:00:00.000Z",
    total_like: 167,
    user: { username: "user2" },
    description: "A magical winter trip to Paris",
    visibility: "public",
    itinerary: [
      {
        date: "2024-08-03T00:00:00.000Z",
        places: [
          {
            id: 6,
            name: "Eiffel Tower",
            description: "Eiffel Tower, Paris",
            lat: 48.8584,
            lng: 2.2945,
            image: "/images/eiffel.jpeg",
            travelTime: "N/A"
          },
          {
            id: 7,
            name: "Champ-Élysées",
            description: "Champ-Élysées, Paris",
            lat: 48.8698,
            lng: 2.3077,
            image: "/images/champs-elysees.jpeg",
            travelTime: "15 mins, 2.1 km"
          }
        ]
      },
      {
        date: "2024-08-04T00:00:00.000Z",
        places: [
          {
            id: 8,
            name: "Louvre Museum",
            description: "Louvre Museum, Paris",
            lat: 48.8606,
            lng: 2.3376,
            image: "/images/louvre.jpeg",
            travelTime: "N/A"
          }
        ]
      }
    ]
  }
];

export default function PlanDetail({ params: paramsPromise }) {
  // Unwrap params using React.use()
  const params = use(paramsPromise);
  const plan = mockPlans.find(p => p.id === parseInt(params.id));

  if (!plan || plan.visibility !== "public") {
    notFound();
  }

  // Calculate map center from locations
  const locations = plan.itinerary.flatMap(day => 
    day.places.map(place => ({
      name: place.name,
      lat: place.lat,
      lng: place.lng,
      image: place.image,
    }))
  );
  
  const mapCenter = locations.length > 0 ? [locations[0].lat, locations[0].lng] : [0, 0];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/plans" className="text-indigo-600 hover:underline mb-6 inline-block">
          ← Back to Plans
        </Link>

        {/* Plan Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.destination}</h1>
          <p className="text-gray-600 mb-2">by [{plan.user.username}]</p>
          <p className="text-gray-600 mb-2">
            {format(new Date(plan.startDate), 'd MMM yyyy')} - 
            {format(new Date(plan.endDate), 'd MMM yyyy')}
          </p>
          <p className="text-gray-600">{plan.total_like} Likes</p>
        </div>

        {/* Plan Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Locations</h2>
          <MapComponent locations={locations} center={mapCenter} />
        </div>

        {/* Locations with Images */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Places</h2>
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "/images/fallback.jpeg"; // Use a fallback image in case of error
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No locations added.</p>
          )}
        </div>

        {/* Itinerary with Timestamps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
          {plan.itinerary.length > 0 ? (
            <div className="space-y-4">
              {plan.itinerary.map((day, index) => (
                <div key={index} className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Day {index + 1} - {format(new Date(day.date), 'd MMMM yyyy')}
                  </h3>
                  {day.places.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-600">
                      {day.places.map((place, placeIndex) => (
                        <li key={place.id}>
                          {place.name}
                          {place.travelTime && place.travelTime !== "N/A" && (
                            <span className="text-sm text-gray-500">
                              {" "}({place.travelTime})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No places added for this day.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No itinerary available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
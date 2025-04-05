import Link from 'next/link';
import PlanCard from '../../../components/PlanCard';

export default function PlansPage() {

    const popularPlans = [
        { id: 1, name: "Summer in Bali", start_date: "2024-11-17T00:00:00.000Z", end_date: "2024-11-23T00:00:00.000Z", total_like: 198, user: { username: "user1" } },
        { id: 2, name: "Winter in Paris", start_date: "2024-08-03T00:00:00.000Z", end_date: "2024-08-08T00:00:00.000Z", total_like: 167, user: { username: "user2" } },
        { id: 3, name: "Hiking in Alps", start_date: "2024-08-12T00:00:00.000Z", end_date: "2024-08-23T00:00:00.000Z", total_like: 151, user: { username: "user3" } },
        { id: 4, name: "Beach Getaway in Maldives", start_date: "2024-09-05T00:00:00.000Z", end_date: "2024-09-10T00:00:00.000Z", total_like: 134, user: { username: "user4" } },
        { id: 5, name: "City Tour in Tokyo", start_date: "2024-10-20T00:00:00.000Z", end_date: "2024-10-25T00:00:00.000Z", total_like: 122, user: { username: "user5" } },
        { id: 6, name: "Safari in Kenya", start_date: "2024-12-01T00:00:00.000Z", end_date: "2024-12-07T00:00:00.000Z", total_like: 109, user: { username: "user6" } },
      ];
    

    return (         
        <div className="min-h-screen bg-gray-100">
            {/* Plan Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularPlans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
            </div>
        </div>

    );
}
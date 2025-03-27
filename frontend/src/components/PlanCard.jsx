export default function PlanCard({ plan }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-40 bg-indigo-400"></div> {/* Placeholder for image */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
          <p className="text-gray-600">by [{plan.user.username}]</p>
          <p className="text-gray-600">
            {new Date(plan.start_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })} - {new Date(plan.end_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </p>
          <p className="text-gray-600">{plan.total_like_received} Likes</p>
        </div>
      </div>
    );
  }
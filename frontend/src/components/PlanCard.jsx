import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PlanCard({ plan }) {
  // ตรวจสอบว่า photo_url เป็น URL รูปภาพที่ถูกต้องหรือไม่
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    // ตรวจสอบว่าเป็น URL ที่มีนามสกุลรูปภาพหรือไม่
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
    
    // ตรวจสอบว่าเป็น URL ที่เริ่มต้นด้วย http:// หรือ https:// หรือไม่
    const hasHttpProtocol = url.startsWith('http://') || url.startsWith('https://');
    
    return hasImageExtension && hasHttpProtocol;
  };

  // กำหนด URL ของรูปภาพที่จะแสดง
  const imageUrl = isValidImageUrl(plan.photo_url) 
    ? plan.photo_url 
    : '/images/default-plan-image.jpg';

  return (
    <Link href={`/plans/${plan.plan_id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-40 relative">
          <Image 
            src={imageUrl}
            alt={plan.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
          <p className="text-gray-600">by {plan.user.username}</p>
          <p className="text-gray-600">
            {new Date(plan.start_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} - {new Date(plan.end_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className="text-gray-600">{plan.total_like} Likes</p>
        </div>
      </div>
    </Link>
  );
}
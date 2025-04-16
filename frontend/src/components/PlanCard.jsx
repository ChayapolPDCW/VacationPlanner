import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PlanCard({ plan }) {
  console.log("planId:", plan.planId);
  console.log("plan.photoUrl:", plan.photoUrl);

  // ตรวจสอบว่า photoUrl เป็น URL รูปภาพที่ถูกต้องหรือไม่
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    // ตรวจสอบว่าเป็น URL ที่มีนามสกุลรูปภาพหรือไม่ หรือเป็น URL ที่มาจาก API ของ Google Places
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
    
    // ตรวจสอบว่าเป็น URL ที่เริ่มต้นด้วย http:// หรือ https:// หรือไม่
    const hasHttpProtocol = url.startsWith('http://') || url.startsWith('https://');
    
    // ตรวจสอบว่าเป็น URL ของ Google Places API หรือไม่
    const isGooglePlacesUrl = url.includes('maps.googleapis.com') || url.includes('maps.gstatic.com');
    
    // ถ้าเป็น URL ของ Google Places API ให้ถือว่าถูกต้อง
    if (isGooglePlacesUrl && hasHttpProtocol) return true;
    
    // ถ้าไม่ใช่ URL ของ Google Places API ให้ตรวจสอบว่ามีนามสกุลรูปภาพหรือไม่
    return hasHttpProtocol; // ไม่ตรวจสอบนามสกุลไฟล์แล้ว เพราะอาจไม่มีนามสกุลไฟล์ใน URL
  };

  // ปรับปรุง URL ของรูปภาพจาก Google Places API ให้มีความละเอียดสูงขึ้น
  const getOptimizedImageUrl = (url) => {
    if (!url || url === '') {
      console.log("Using default image: no URL provided");
      return '/images/default-plan-image.jpg';
    }
    
    // ถ้าเป็น URL จาก Google Places API ให้ใช้รูปภาพ default แทน
    // เนื่องจาก Google Places API ไม่อนุญาตให้เปลี่ยนขนาดรูปภาพโดยตรงผ่าน URL พารามิเตอร์
    if (url.includes('maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto')) {
      console.log("Using default image for Google Places API URL");
      return '/images/default-plan-image.jpg';
    }
    
    // ถ้าไม่ใช่ URL จาก Google Places API ให้ใช้ URL เดิม
    console.log("Using original URL:", url);
    return url;
  };

  // กำหนด URL ของรูปภาพที่จะแสดง
  const imageUrl = isValidImageUrl(plan.photoUrl) 
    ? getOptimizedImageUrl(plan.photoUrl) 
    : '/images/default-plan-image.jpg';

  return (
    <Link href={`/plans/${plan.planId}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-40 relative overflow-hidden">
          {/* ใช้ img แทน next/image เพื่อหลีกเลี่ยงข้อจำกัดของ next/image ในการโหลดรูปภาพจาก Google Places API */}
          {plan.photoUrl && plan.photoUrl.includes('maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto') ? (
            // สำหรับรูปภาพจาก Google Places API ให้แสดงรูปภาพด้วย CSS ที่ปรับแต่งพิเศษ
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${plan.photoUrl})`,
                transform: 'scale(1.5)', // ขยายรูปภาพให้ใหญ่ขึ้น 50%
                transformOrigin: 'center',
                filter: 'contrast(1.1) saturate(1.2)' // เพิ่มความคมชัดและสีสัน
              }}
              onError={(e) => {
                e.target.style.backgroundImage = `url('/images/default-plan-image.jpg')`;
              }}
            />
          ) : (
            // สำหรับรูปภาพทั่วไปให้แสดงด้วย img ตามปกติ
            <img 
              src={plan.photoUrl || '/images/default-plan-image.jpg'}
              alt={plan.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // ป้องกันการวนซ้ำ
                e.target.src = '/images/default-plan-image.jpg'; // ใช้รูป default เมื่อไม่สามารถโหลดรูปภาพได้
              }}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
          <p className="text-gray-600">by {plan.user.username}</p>
          <p className="text-gray-600">
            {new Date(plan.startDate).toLocaleDateString('en-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} - {new Date(plan.endDate).toLocaleDateString('en-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className="text-gray-600">{plan.totalLike} {plan.totalLike == 1 ? "Like" : "Likes"}</p>
        </div>
      </div>
    </Link>
  );
}

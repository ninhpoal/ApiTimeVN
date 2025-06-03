'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTime = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/time');
      const data = await response.json();
      setTime(data);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTime();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Thời Gian Server</h1>
      
      <button 
        onClick={fetchTime}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Đang tải...' : 'Lấy thời gian mới'}
      </button>

      {time && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Thông tin thời gian:</h2>
          <p><strong>Ngày:</strong> {time.date} ({time.dayOfWeek})</p>
          <p><strong>Giờ:</strong> {time.time}:{time.seconds.toString().padStart(2, '0')}</p>
          <p><strong>DateTime:</strong> {time.dateTime}</p>
          <p><strong>Múi giờ:</strong> {time.timeZone}</p>
        </div>
      )}
    </div>
  );
}
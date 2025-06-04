
import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  
  // Sử dụng Intl API để chuyển đổi múi giờ chính xác
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const partsObj = parts.reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  
  // Tính milliseconds cho múi giờ VN
  const vnTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'}));
  const milliSeconds = vnTime.getMilliseconds();
  
  const year = parseInt(partsObj.year);
  const month = parseInt(partsObj.month);
  const day = parseInt(partsObj.day);
  const hour = parseInt(partsObj.hour);
  const minute = parseInt(partsObj.minute);
  const seconds = parseInt(partsObj.second);
  
  const dateStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[vnTime.getDay()];
  
  const dateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliSeconds.toString().padStart(7, '0')}`;
  
  const response = NextResponse.json({
    year,
    month,
    day,
    hour,
    minute,
    seconds,
    milliSeconds,
    dateTime,
    date: dateStr,
    time: timeStr,
    timeZone: "Asia/Ho_Chi_Minh",
    dayOfWeek,
    dstActive: false
  });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

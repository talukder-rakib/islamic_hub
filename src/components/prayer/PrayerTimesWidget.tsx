import React, { useState, useEffect, memo } from 'react'; // Added memo
import { Clock } from 'lucide-react';
// Note: adhan library is for calculating prayer times
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import dayjs from 'dayjs';

// Sample locations
const locations = [
  { name: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { name: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { name: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { name: 'মক্কা', lat: 21.3891, lng: 39.8579 },
  { name: 'মদিনা', lat: 24.5247, lng: 39.5692 },
];

const PrayerTimesWidget: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    // Calculate prayer times
    const coordinates = new Coordinates(selectedLocation.lat, selectedLocation.lng);
    const params = CalculationMethod.MoonsightingCommittee();
    const prayerTimes = new PrayerTimes(coordinates, currentDate, params);
    setPrayerTimes(prayerTimes);
  }, [selectedLocation, currentDate]);

  // Format time
  const formatTime = (date: Date) => {
    return dayjs(date).format('h:mm A');
  };

  if (!prayerTimes) return null;

  return (
    <div className="card">
      <div className="p-4 bg-primary-500 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">নামাজের সময়সূচী</h3>
          <div className="flex items-center">
            <Clock size={18} className="mr-2" />
            <span>{dayjs(currentDate).format('DD MMMM, YYYY')}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            স্থান নির্বাচন করুন
          </label>
          <select
            id="location"
            className="select"
            value={selectedLocation.name}
            onChange={(e) => {
              const selected = locations.find(loc => loc.name === e.target.value);
              if (selected) setSelectedLocation(selected);
            }}
          >
            {locations.map((location) => (
              <option key={location.name} value={location.name}>{location.name}</option>
            ))}
          </select>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">ফজর</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.fajr)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">সূর্যোদয়</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.sunrise)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">যোহর</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.dhuhr)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">আসর</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.asr)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">মাগরিব</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.maghrib)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-gray-200">ইশা</span>
            <span className="text-gray-600 dark:text-gray-400">{formatTime(prayerTimes.isha)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PrayerTimesWidget); // Wrapped with memo
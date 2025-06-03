import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Assuming user info might be pre-filled or used

interface ProfileData {
  needs: string;
  familySize: number;
  contactInfo: string;
}

const ZakatRecipientProfilePage: React.FC = () => {
  const { user } = useAuth(); // Example: to pre-fill email or associate data

  const [needs, setNeeds] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Placeholder for displaying current profile data (could be fetched or from AuthContext)
  const [currentProfile, setCurrentProfile] = useState<ProfileData | null>({
    needs: 'খাদ্য ও বস্ত্রের প্রয়োজন।',
    familySize: 4,
    contactInfo: 'example@email.com / 01xxxxxxxxx',
  });

  // Pre-fill form if user data is available and relevant (optional)
  // useEffect(() => {
  //   if (user && user.profile) { // Assuming profile data might come with user object
  //     setNeeds(user.profile.needs || '');
  //     setFamilySize(user.profile.familySize?.toString() || '');
  //     setContactInfo(user.profile.contactInfo || '');
  //   }
  // }, [user]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProfile: ProfileData = {
      needs,
      familySize: parseInt(familySize) || 0,
      contactInfo,
    };
    console.log('Updated Profile Data:', updatedProfile);
    setCurrentProfile(updatedProfile); // Update local state for display
    alert('প্রোফাইল সফলভাবে হালনাগাদ করা হয়েছে!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">আমার প্রোফাইল</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form Section - Update Profile */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">প্রোফাইল তথ্য হালনাগাদ করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="needs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                আপনার প্রয়োজনসমূহ (বিস্তারিত)
              </label>
              <textarea
                id="needs"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                className="input mt-1 block w-full h-24"
                placeholder="আপনার কী কী প্রয়োজন, বিস্তারিত লিখুন..."
                required
              />
            </div>
            <div>
              <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                পরিবারের সদস্য সংখ্যা
              </label>
              <input
                type="number"
                id="familySize"
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="input mt-1 block w-full"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                যোগাযোগের তথ্য (ফোন/ঠিকানা)
              </label>
              <input
                type="text"
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="input mt-1 block w-full"
                placeholder="আপনার ফোন নম্বর অথবা ঠিকানা"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              প্রোফাইল হালনাগাদ করুন
            </button>
          </form>
        </div>

        {/* Display Section - Current Profile */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">বর্তমান প্রোফাইল তথ্য</h2>
          {currentProfile ? (
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ইমেইল (ব্যবহারকারী)</h3>
                <p className="text-gray-900 dark:text-white">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">প্রয়োজনসমূহ</h3>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{currentProfile.needs || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">পরিবারের সদস্য সংখ্যা</h3>
                <p className="text-gray-900 dark:text-white">{currentProfile.familySize > 0 ? currentProfile.familySize : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">যোগাযোগের তথ্য</h3>
                <p className="text-gray-900 dark:text-white">{currentProfile.contactInfo || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">আপনার প্রোফাইল তথ্য এখানে দেখানো হবে।</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZakatRecipientProfilePage;

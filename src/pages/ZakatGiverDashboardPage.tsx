import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Edit3, PlusCircle, ListChecks, UserCog } from 'lucide-react'; // Example icons

const ZakatGiverDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">যাকাত দাতা ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Link to="/dashboard/giver/data" className="card hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center">
          <PlusCircle size={48} className="text-primary-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2">নতুন যাকাত তথ্য যোগ করুন</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার সম্পদ এবং যাকাতের হিসাব যোগ করুন।</p>
        </Link>

        <div className="card p-6 flex flex-col items-center text-center opacity-50 cursor-not-allowed"> {/* Placeholder for future feature */}
          <ListChecks size={48} className="text-gray-400 mb-3" />
          <h2 className="text-xl font-semibold mb-2">পূর্ববর্তী হিসাব দেখুন</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার পূর্বের যাকাতের রেকর্ড ও ইতিহাস।</p>
        </div>

        <div className="card p-6 flex flex-col items-center text-center opacity-50 cursor-not-allowed"> {/* Placeholder for future feature */}
          <UserCog size={48} className="text-gray-400 mb-3" />
          <h2 className="text-xl font-semibold mb-2">প্রোফাইল সেটিংস</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার অ্যাকাউন্ট সেটিংস পরিচালনা করুন।</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-3">স্বাগতম!</h3>
        <p className="text-gray-700 dark:text-gray-300">
          আপনার যাকাত দাতা ড্যাশবোর্ডে স্বাগতম। এখান থেকে আপনি আপনার যাকাত সম্পর্কিত তথ্য সহজেই পরিচালনা করতে পারবেন।
          উপরের অপশনগুলো থেকে আপনার প্রয়োজনীয় কার্যক্রম শুরু করুন।
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          যদি কোনো সহায়তার প্রয়োজন হয়, অনুগ্রহ করে আমাদের <Link to="/contact" className="text-primary-600 hover:underline">যোগাযোগ</Link> পেজে জানান।
        </p>
      </div>
    </div>
  );
};

export default ZakatGiverDashboardPage;

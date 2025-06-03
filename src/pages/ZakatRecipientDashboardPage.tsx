import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { UserCog, FileText, History, MessageSquarePlus } from 'lucide-react'; // Example icons

const ZakatRecipientDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">যাকাত গ্রহীতা ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Link to="/dashboard/recipient/profile" className="card hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center">
          <UserCog size={48} className="text-primary-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2">প্রোফাইল পরিচালনা করুন</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার ব্যক্তিগত তথ্য ও প্রয়োজন আপডেট করুন।</p>
        </Link>

        <div className="card p-6 flex flex-col items-center text-center opacity-50 cursor-not-allowed"> {/* Placeholder */}
          <MessageSquarePlus size={48} className="text-gray-400 mb-3" />
          <h2 className="text-xl font-semibold mb-2">নতুন আবেদন করুন</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">যাকাতের জন্য নতুন আবেদন জমা দিন।</p>
        </div>

        <div className="card p-6 flex flex-col items-center text-center opacity-50 cursor-not-allowed"> {/* Placeholder */}
          <FileText size={48} className="text-gray-400 mb-3" />
          <h2 className="text-xl font-semibold mb-2">আবেদনের স্থিতি</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার আবেদনের বর্তমান অবস্থা জানুন।</p>
        </div>

        <div className="card p-6 flex flex-col items-center text-center opacity-50 cursor-not-allowed"> {/* Placeholder */}
          <History size={48} className="text-gray-400 mb-3" />
          <h2 className="text-xl font-semibold mb-2">সহায়তার ইতিহাস</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">পূর্বে প্রাপ্ত সহায়তার বিবরণ দেখুন।</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-3">স্বাগতম!</h3>
        <p className="text-gray-700 dark:text-gray-300">
          আপনার যাকাত গ্রহীতা ড্যাশবোর্ডে স্বাগতম। এখান থেকে আপনি আপনার প্রোফাইল, আবেদন এবং প্রাপ্ত সহায়তার তথ্য পরিচালনা করতে পারবেন।
          উপরের অপশনগুলো থেকে আপনার প্রয়োজনীয় কার্যক্রম শুরু করুন।
        </p>
         <p className="mt-2 text-gray-700 dark:text-gray-300">
          যেকোনো প্রয়োজনে বা প্রশ্নের জন্য, আমাদের <Link to="/contact" className="text-primary-600 hover:underline">যোগাযোগ</Link> পৃষ্ঠার মাধ্যমে আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
        </p>
      </div>
    </div>
  );
};

export default ZakatRecipientDashboardPage;

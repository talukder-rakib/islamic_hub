import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorizedPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">অনুমোদিত নয়</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        এই পৃষ্ঠাটি দেখার জন্য আপনার অনুমতি নেই।
      </p>
      <Link to="/" className="btn btn-primary">
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotAuthorizedPage;

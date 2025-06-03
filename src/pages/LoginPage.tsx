import React, { useState, useEffect } from 'react'; // Added useEffect
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom'; // Added Navigate and useLocation

const LoginPage: React.FC = () => {
  const { login, isLoading, user } = useAuth(); // Added user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation(); // For potential redirect from state

  useEffect(() => {
    // If user is already logged in, redirect them from login page
    // For now, redirecting to home. Could be role-based dashboard later.
    if (user) {
      // No explicit navigation needed here as the Navigate component below handles it
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড পূরণ করুন।');
      return;
    }

    try {
      await login(email, password);
      // On successful login, AuthContext state updates, and the useEffect or Navigate component will handle redirection.
      // Alert can be removed if redirection is smooth.
      // alert('লগইন সফল হয়েছে!');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Login failed:', err);
      setError('লগইন ব্যর্থ হয়েছে। আপনার ইমেইল অথবা পাসওয়ার্ড চেক করুন।');
    }
  };

  // If user is logged in, redirect.
  // `location.state?.from?.pathname` allows redirecting back to the page the user was trying to access.
  // If no such state, default to homepage.
  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">লগইন করুন</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ইমেইল <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input mt-1 block w-full"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            পাসওয়ার্ড <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input mt-1 block w-full"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'লগইন করা হচ্ছে...' : 'লগইন'}
        </button>
      </form>
      <p className="text-center mt-4">
        অ্যাকাউন্ট নেই? <a href="/signup" className="text-primary-600 hover:underline">সাইন আপ করুন</a>
      </p>
    </div>
  );
};

export default LoginPage;

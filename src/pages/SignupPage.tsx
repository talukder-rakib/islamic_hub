import React, { useState, useEffect } from 'react'; // Added useEffect
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom'; // Added Navigate and useLocation

// Define role type based on AuthContext User role
type UserRole = 'Zakat Giver' | 'Zakat Recipient' | 'admin';

const SignupPage: React.FC = () => {
  const { signup, isLoading, user } = useAuth(); // Added user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Zakat Giver');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // If user is already logged in, redirect them from signup page
    if (user) {
      // No explicit navigation needed here as the Navigate component below handles it
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('অনুগ্রহ করে নাম, ইমেইল এবং পাসওয়ার্ড পূরণ করুন।');
      return;
    }
    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলছে না।');
      return;
    }

    try {
      await signup(email, password, role);
      // On successful signup, AuthContext state updates, and the Navigate component will handle redirection.
      // Alert can be removed.
      // alert('সাইনআপ সফল হয়েছে!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('Zakat Giver');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('সাইনআপ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  // If user is logged in, redirect.
  // Default to homepage after signup if no other specific redirection logic is in place.
  if (user) {
    // After signup, users are typically redirected to their dashboard or homepage.
    // For now, redirecting to home. This could be role-specific later.
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">সাইন আপ করুন</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input mt-1 block w-full"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input mt-1 block w-full"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            আপনার ভূমিকা নির্বাচন করুন <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            className="select mt-1 block w-full"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            required
            disabled={isLoading}
          >
            <option value="Zakat Giver">যাকাত দাতা (Zakat Giver)</option>
            <option value="Zakat Recipient">যাকাত গ্রহীতা (Zakat Recipient)</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'সাইন আপ করা হচ্ছে...' : 'সাইন আপ'}
        </button>
      </form>
      <p className="text-center mt-4">
        ইতিমধ্যে অ্যাকাউন্ট আছে? <a href="/login" className="text-primary-600 hover:underline">লগইন করুন</a>
      </p>
    </div>
  );
};

export default SignupPage;

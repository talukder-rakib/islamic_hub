import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDirection } from './contexts/DirectionContext';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Layout components
import Layout from './components/layout/Layout';
import MobileNavigation from './components/layout/MobileNavigation';

// Auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages - Lazy Loaded
const HomePage = React.lazy(() => import('./pages/HomePage'));
const QuranPage = React.lazy(() => import('./pages/QuranPage'));
const HadithPage = React.lazy(() => import('./pages/HadithPage'));
const PrayerTimesPage = React.lazy(() => import('./pages/PrayerTimesPage'));
const ZakatCalculatorPage = React.lazy(() => import('./pages/ZakatCalculatorPage'));
const BooksPage = React.lazy(() => import('./pages/BooksPage'));
const LecturesPage = React.lazy(() => import('./pages/LecturesPage'));
const DuaPage = React.lazy(() => import('./pages/DuaPage'));
const DonatePage = React.lazy(() => import('./pages/DonatePage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ZakatGiverDashboardPage = React.lazy(() => import('./pages/ZakatGiverDashboardPage'));
const ZakatDataPage = React.lazy(() => import('./pages/ZakatDataPage'));
const ZakatRecipientDashboardPage = React.lazy(() => import('./pages/ZakatRecipientDashboardPage'));
const ZakatRecipientProfilePage = React.lazy(() => import('./pages/ZakatRecipientProfilePage')); // New Import
const NotAuthorizedPage = React.lazy(() => import('./pages/NotAuthorizedPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));


function App() {
  const { direction } = useDirection();
  const { theme } = useTheme();
  
  useEffect(() => {
    document.documentElement.dir = direction;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('pattern-dark');
      document.body.classList.remove('pattern-light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('pattern-dark');
      document.body.classList.add('pattern-light');
    }
  }, [direction, theme]);

  return (
    <AuthProvider>
      <div className={`font-bengali min-h-screen ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-xl">Loading page...</div>}>
          <Routes>
            {/* Public routes accessible to all */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/not-authorized" element={<NotAuthorizedPage />} />

            {/* Routes with main layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/hadith" element={<HadithPage />} />
              <Route path="/prayer-times" element={<PrayerTimesPage />} />
              <Route path="/zakat-calculator" element={<ZakatCalculatorPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/lectures" element={<LecturesPage />} />
              <Route path="/dua" element={<DuaPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Protected Dashboard Routes */}
              <Route element={<ProtectedRoute allowedRoles={['Zakat Giver']} />}>
                <Route path="/dashboard/giver" element={<ZakatGiverDashboardPage />} />
                <Route path="/dashboard/giver/data" element={<ZakatDataPage />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['Zakat Recipient']} />}>
                <Route path="/dashboard/recipient" element={<ZakatRecipientDashboardPage />} />
                <Route path="/dashboard/recipient/profile" element={<ZakatRecipientProfilePage />} /> {/* New Nested Route */}
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
        <MobileNavigation />
      </div>
    </AuthProvider>
  );
}

export default App;
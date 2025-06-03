import React, { Suspense, useEffect } from 'react'; // Added Suspense
import { Routes, Route } from 'react-router-dom';
import { useDirection } from './contexts/DirectionContext';
import { useTheme } from './contexts/ThemeContext';

// Layout components
import Layout from './components/layout/Layout';
import MobileNavigation from './components/layout/MobileNavigation';

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
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { direction } = useDirection();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply direction to document
    document.documentElement.dir = direction;
    
    // Apply theme to document
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
    <div className={`font-bengali min-h-screen ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      <Suspense fallback={<div>Loading...</div>}> {/* Added Suspense here */}
        <Routes>
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <MobileNavigation />
    </div>
  );
}

export default App;
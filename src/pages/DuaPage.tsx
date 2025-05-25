import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';

// Sample data for dua categories
const duaCategories = [
  { id: 'morning', name: 'সকাল-সন্ধ্যার যিকর', count: 24 },
  { id: 'prayer', name: 'নামাজ সংক্রান্ত দোয়া', count: 18 },
  { id: 'protection', name: 'সুরক্ষার দোয়া', count: 15 },
  { id: 'quran', name: 'কুরআনের দোয়া', count: 20 },
  { id: 'forgiveness', name: 'ক্ষমা প্রার্থনার দোয়া', count: 12 },
  { id: 'travel', name: 'সফরের দোয়া', count: 8 },
  { id: 'food', name: 'খাবারের দোয়া', count: 6 },
  { id: 'home', name: 'ঘরে প্রবেশ ও বের হওয়ার দোয়া', count: 4 },
  { id: 'sleep', name: 'ঘুমানোর দোয়া', count: 10 },
  { id: 'distress', name: 'দুঃখ-কষ্টের দোয়া', count: 14 },
];

// Sample data for duas
const duaSamples = [
  {
    id: 1,
    category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    bengali: 'আমরা সকালে উপনীত হয়েছি এবং সকল রাজত্ব আল্লাহর জন্য সকালে উপনীত হয়েছে। সমস্ত প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন সত্য উপাস্য নেই, তিনি একক, তাঁর কোন শরীক নেই। রাজত্ব তাঁরই এবং প্রশংসাও তাঁর। তিনি সকল বিষয়ের উপর ক্ষমতাবান।',
    reference: 'আবু দাউদ',
    transliteration: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহি, ওয়ালহামদু লিল্লাহি, লা-ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু ওয়া হুয়া 'আলা কুল্লি শাইয়িন ক্বাদীর।",
  },
  {
    id: 2,
    category: 'protection',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    bengali: 'হে আল্লাহ! আমি আপনার কাছে আশ্রয় চাই দুশ্চিন্তা ও দুঃখ থেকে, অপারগতা ও অলসতা থেকে, কৃপণতা ও ভীরুতা থেকে, ঋণের বোঝা ও মানুষের প্রাধান্য থেকে।',
    reference: 'সহিহ বুখারী',
    transliteration: "আল্লাহুম্মা ইন্নী আ'উযু বিকা মিনাল হাম্মি ওয়াল হাযানি, ওয়াল 'আজযি ওয়াল কাসালি, ওয়াল বুখলি ওয়াল জুবনি, ওয়া দালা'ইদ্ দায়নি ওয়া গালাবাতির রিজাল।",
  }
];

const DuaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="দোয়া ও যিকর সংগ্রহ" 
        subtitle="দৈনন্দিন জীবনের বিভিন্ন সময়ের জন্য কুরআন ও হাদিস থেকে সংগৃহীত দোয়া"
      />
      
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <input
          type="text"
          placeholder="দোয়া খুঁজুন"
          className="input pl-10 w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="card sticky top-24">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">দোয়ার প্রকারভেদ</h3>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full flex justify-between py-2 px-3 rounded-md ${
                      selectedCategory === null
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span>সকল দোয়া</span>
                    <span>{duaCategories.reduce((sum, cat) => sum + cat.count, 0)}</span>
                  </button>
                </li>
                
                {duaCategories.map((category) => (
                  <li key={category.id}>
                    <button 
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex justify-between py-2 px-3 rounded-md ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span>{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="space-y-6">
            {duaSamples
              .filter(dua => selectedCategory ? dua.category === selectedCategory : true)
              .map((dua) => (
                <div key={dua.id} className="card p-6">
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="arabic text-right text-xl md:text-2xl mb-2">{dua.arabic}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dua.transliteration}</p>
                  
                  <p className="text-gray-800 dark:text-gray-200 mb-3">{dua.bengali}</p>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>উৎস: {dua.reference}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="btn btn-outline text-sm">
                      শেয়ার করুন
                    </button>
                    <button className="btn btn-primary text-sm">
                      সংরক্ষণ করুন
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaPage;
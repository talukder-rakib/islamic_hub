import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';

const ZakatCalculatorPage: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    property: 0,
    businessInventory: 0,
    debtsReceivable: 0,
    debtsPayable: 0,
    expenses: 0,
  });

  // Current values - in a real app, these would be fetched from an API
  const nisabValueGold = 87.48; // grams of gold
  const goldPricePerGram = 9000; // BDT per gram
  const nisabValueBDT = nisabValueGold * goldPricePerGram;
  const zakatRate = 0.025; // 2.5%

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    setAssets(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Calculate total zakatable wealth
  const totalWealth = 
    assets.cash + 
    assets.gold + 
    assets.silver + 
    assets.investments + 
    assets.property + 
    assets.businessInventory + 
    assets.debtsReceivable - 
    assets.debtsPayable - 
    assets.expenses;

  // Calculate zakat amount
  const isEligible = totalWealth >= nisabValueBDT;
  const zakatAmount = isEligible ? totalWealth * zakatRate : 0;

  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="যাকাত ক্যালকুলেটর" 
        subtitle="আপনার যাকাত গণনা করুন সহজেই"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            যাকাতের মৌলিক তথ্য
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">বর্তমান নিসাব মূল্য (স্বর্ণ অনুযায়ী)</p>
              <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                {nisabValueBDT.toLocaleString()} টাকা
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ({nisabValueGold} গ্রাম স্বর্ণের সমপরিমাণ)
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">যাকাতের হার</p>
              <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                2.5%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                মোট সম্পদের 2.5% (1/40 অংশ)
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            যাকাত হিসাব করার জন্য, আপনার সমস্ত যাকাতযোগ্য সম্পদের মূল্য যোগ করুন এবং দেনা বিয়োগ করুন।
            যদি অবশিষ্ট পরিমাণ নিসাব মূল্যের চেয়ে বেশি হয়, তাহলে 2.5% যাকাত প্রদান করুন।
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  আপনার সম্পদ এন্ট্রি করুন
                </h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">সম্পদ</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          নগদ টাকা (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.cash || ''}
                          onChange={(e) => handleInputChange('cash', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          স্বর্ণ (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.gold || ''}
                          onChange={(e) => handleInputChange('gold', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          রূপা (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.silver || ''}
                          onChange={(e) => handleInputChange('silver', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          বিনিয়োগ (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.investments || ''}
                          onChange={(e) => handleInputChange('investments', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          ব্যবসায়িক পণ্য (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.businessInventory || ''}
                          onChange={(e) => handleInputChange('businessInventory', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          পাওনা ঋণ (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.debtsReceivable || ''}
                          onChange={(e) => handleInputChange('debtsReceivable', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">দেনা ও খরচ</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          দেনা (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.debtsPayable || ''}
                          onChange={(e) => handleInputChange('debtsPayable', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          মৌলিক প্রয়োজনের খরচ (টাকা)
                        </label>
                        <input
                          type="number"
                          className="input"
                          value={assets.expenses || ''}
                          onChange={(e) => handleInputChange('expenses', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  যাকাত হিসাব
                </h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">মোট যাকাতযোগ্য সম্পদ</p>
                    <p className="text-2xl font-medium text-gray-900 dark:text-white">
                      {totalWealth.toLocaleString()} টাকা
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">নিসাব মূল্য</p>
                    <p className="text-lg text-gray-800 dark:text-gray-200">
                      {nisabValueBDT.toLocaleString()} টাকা
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-md ${isEligible ? 'bg-primary-50 dark:bg-primary-900' : 'bg-gray-50 dark:bg-gray-700'}`}>
                    <p className="text-sm font-medium mb-1">
                      {isEligible ? 'আপনার যাকাত দেওয়া ফরজ' : 'আপনার যাকাত দেওয়া ফরজ নয়'}
                    </p>
                    {isEligible && (
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {zakatAmount.toLocaleString()} টাকা
                      </p>
                    )}
                  </div>
                  
                  {isEligible && (
                    <button className="btn btn-primary w-full">
                      যাকাত দিন
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorPage;
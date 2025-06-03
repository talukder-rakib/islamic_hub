import React, { useState } from 'react';

interface ZakatEntry {
  assetType: string;
  value: number;
  zakatAmount: number;
}

const ZakatDataPage: React.FC = () => {
  const [assetType, setAssetType] = useState('');
  const [value, setValue] = useState('');
  const [zakatAmount, setZakatAmount] = useState('');

  // Placeholder for storing and displaying entries
  const [entries, setEntries] = useState<ZakatEntry[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newEntry: ZakatEntry = {
      assetType,
      value: parseFloat(value),
      zakatAmount: parseFloat(zakatAmount),
    };
    console.log('New Zakat Entry:', newEntry);
    setEntries([...entries, newEntry]); // Add to local state for temporary display

    // Clear form
    setAssetType('');
    setValue('');
    setZakatAmount('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">আমার যাকাত তথ্য</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">নতুন যাকাত তথ্য যোগ করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                সম্পদের প্রকার
              </label>
              <input
                type="text"
                id="assetType"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="input mt-1 block w-full"
                placeholder="যেমন: নগদ টাকা, সোনা, রুপা"
                required
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                মূল্য (৳)
              </label>
              <input
                type="number"
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input mt-1 block w-full"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label htmlFor="zakatAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                যাকাতের পরিমাণ (৳)
              </label>
              <input
                type="number"
                id="zakatAmount"
                value={zakatAmount}
                onChange={(e) => setZakatAmount(e.target.value)}
                className="input mt-1 block w-full"
                placeholder="0.00"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              তথ্য যোগ করুন
            </button>
          </form>
        </div>

        {/* Display Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">পূর্ববর্তী যাকাতের তথ্য</h2>
          {entries.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">এখানে আপনার পূর্ববর্তী যাকাতের তথ্য দেখানো হবে।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">সম্পদের প্রকার</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">মূল্য (৳)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">যাকাতের পরিমাণ (৳)</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {entries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{entry.assetType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entry.value.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entry.zakatAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZakatDataPage;


'use client';

import { useState, useEffect } from 'react';

const interestsList = [
  "Reciclagem",
  "Energia Renovável",
  "Moda Sustentável",
  "Agricultura Urbana",
  "Redução de Plástico",
  "Conservação da Água",
  "Transporte Ecológico",
  "Compostagem",
];

const Settings = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedInterests = localStorage.getItem('userInterests');
    if (storedInterests) {
      setSelectedInterests(JSON.parse(storedInterests));
    }
  }, []);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('userInterests', JSON.stringify(selectedInterests));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Personalize a sua experiência</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Selecione os seus interesses para que o assistente de IA possa fornecer respostas mais relevantes para si.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {interestsList.map(interest => (
          <label
            key={interest}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedInterests.includes(interest)
                ? 'bg-green-100 dark:bg-green-800 border-green-500 border'
                : 'bg-gray-100 dark:bg-gray-700 border border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}>
            <input
              type="checkbox"
              checked={selectedInterests.includes(interest)}
              onChange={() => handleInterestChange(interest)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              aria-label={`Selecionar interesse: ${interest}`}
            />
            <span className="font-medium text-gray-800 dark:text-gray-200">{interest}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-end">
        {saved && (
            <p className='text-green-600 dark:text-green-400 mr-4 transition-opacity duration-300'>Definições guardadas!</p>
        )}
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          aria-label="Guardar definições de interesse"
        >
          Guardar Definições
        </button>
      </div>
    </div>
  );
};

export default Settings;

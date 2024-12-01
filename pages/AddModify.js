import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import translationsDataset from '../src/data/translations'; // Adjust the import path as necessary

const AddModifyPage = () => {
  const [englishWord, setEnglishWord] = useState('');
  const [kalenjinWord, setKalenjinWord] = useState('');

  // Load existing translations from local storage or dataset
  useEffect(() => {
    const storedTranslations = localStorage.getItem('translations');
    if (!storedTranslations) {
      // If no stored translations, initialize with the dataset
      localStorage.setItem('translations', JSON.stringify(translationsDataset));
    }
  }, []);

  // Save translations to local storage
  const saveTranslationsToLocalStorage = (translations) => {
    localStorage.setItem('translations', JSON.stringify(translations));
  };

  const handleAddTranslation = async () => {
    if (englishWord.trim() && kalenjinWord.trim()) {
      const translation = {
        english: englishWord,
        kalenjin: kalenjinWord,
      };

      // Update the translations state
      const existingTranslations = JSON.parse(localStorage.getItem('translations')) || [];
      const updatedTranslations = [...existingTranslations, translation];
      saveTranslationsToLocalStorage(updatedTranslations); // Save to local storage

      // Clear input fields
      setEnglishWord('');
      setKalenjinWord('');
      alert("Translation added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div style={{ backgroundColor: '#7941057a', fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '600px',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, textAlign: 'left' }}>ADD TRANSLATION</h1>
          <button
            style={{
              backgroundColor: '#cd6f16',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
            onClick={() => window.location.href = '/'}
          >
            HOME
          </button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column', // Changed to column for better responsiveness
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ fontSize: '16px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
              htmlFor="english"
            >
              Enter text(s) in English
            </label>
            <input
              type="text"
              id="english"
              required
              placeholder="Input text in English"
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
              style={{
                width: '100%',
                height: '50px',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #cd6f16',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ fontSize: '16px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}
              htmlFor="kalenjin"
            >
              Enter translation in Kalenjin
            </label>
            <input
              type="text"
              id="kalenjin"
              required
              placeholder="Input translation in Kalenjin"
              value={kalenjinWord}
              onChange={(e) => setKalenjinWord(e.target.value)}
              style={{
                width: '100%',
                height: '50px',
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #cd6f16',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <button
              style={{
                backgroundColor: '#cd6f16',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={handleAddTranslation}
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModifyPage;
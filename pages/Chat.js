// src/pages/ChatPage.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { db, auth } from '../src/lib/firebase'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';
import translationsDataset from '../src/data/translations'; // Import the dataset

const ChatPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Define dropdownVisible state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid); // Set user ID if logged in
      } else {
        router.push('/login'); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  const handleTranslate = async (text) => {
    const punctuationRegex = /[?!%”.,@]/g;
    const punctuationMatches = text.match(punctuationRegex) || [];
    const trimmedText = text.trim();
    
    // Check for direct sentence translation
    const lowerCaseText = trimmedText.toLowerCase();
    if (translationsDataset[lowerCaseText]) {
        const directTranslation = translationsDataset[lowerCaseText];

        // Check if the original text was in sentence case
        let kalenjinTranslation = directTranslation;
        if (trimmedText.charAt(0) === trimmedText.charAt(0).toUpperCase()) {
            kalenjinTranslation = kalenjinTranslation.charAt(0).toUpperCase() + kalenjinTranslation.slice(1);
        }

        // Add punctuation back to the translation
        punctuationMatches.forEach(punct => {
            kalenjinTranslation += punct; // Append each punctuation mark
        });

        setMessages((prev) => [...prev, { english: trimmedText, kalenjin: kalenjinTranslation }]);

        if (userId) {
            await addDoc(collection(db, 'translations'), {
                english: trimmedText,
                kalenjin: kalenjinTranslation,
                timestamp: new Date(),
                userId: userId,
            });
        }
        return; // Exit the function since we found a direct translation
    }

    // Proceed with word-by-word translation if no direct match
    const removePunctuation = (word) => word.replace(/[.,!?;]$/, '');
    const words = lowerCaseText.split(' ').map(removePunctuation);
    
    let translations = [];
    let unavailableWords = [];

    words.forEach(word => {
        const translation = translationsDataset[word];
        if (translation !== undefined) {
            translations.push(translation);
        } else {
            translations.push("unavailable");
            unavailableWords.push(word);
        }
    });

    let kalenjinTranslation = translations.join(' ');

    // Check if the original text was in sentence case
    if (trimmedText.charAt(0) === trimmedText.charAt(0).toUpperCase()) {
        kalenjinTranslation = kalenjinTranslation.charAt(0).toUpperCase() + kalenjinTranslation.slice(1);
    }

    // Add punctuation back to the translation
    punctuationMatches.forEach(punct => {
        kalenjinTranslation += punct; // Append each punctuation mark
    });

    setMessages((prev) => [...prev, { english: trimmedText, kalenjin: kalenjinTranslation }]);

    if (userId) {
        await addDoc(collection(db, 'translations'), {
            english: trimmedText,
            kalenjin: kalenjinTranslation,
            timestamp: new Date(),
            userId: userId,
        });
    }

    // Log unavailable words if any
    if (unavailableWords.length > 0) {
        console.warn(`Translations unavailable for: ${unavailableWords.join(', ')}`);
    }
};

  const handleSend = () => {
    if (input.trim()) {
      handleTranslate(input.trim());
      setInput(''); // Clear the input field after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      alert('Logged out successfully.');
      router.push('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ margin: 0, cursor: 'pointer', fontSize: '30px', color: '#333333' }}>
          <Link href="/">Kalenjin Translator</Link>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
          <button
            style={{
              backgroundColor: '#CD6F16',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={() => router.push('/login')}
          >
            Login
          </button>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img
              src="/images/menuIcon.png"
              alt="Menu"
              style={{
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            {dropdownVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  backgroundColor: '#ffffff',
                  minWidth: '160px',
                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                <Link
                  href="/profile"
                  style={{
                    color: 'black',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Profile
                </Link>
                <Link
                  href="/AddModify"
                  style={{
                    color: 'black',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Add/Modify
                </Link>
                <Link
                  href="/Help"
                  style={{
                    color: 'black',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Help
                </Link>
                <a
                  href="#"
                  onClick={handleLogout}
                  style={{
                    color: 'black',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ width: '85%', height: 'calc(88.5vh - 80px)', margin: '80px auto', border: '5px solid #CD6F16', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ clear: 'both', margin: '10px 0' }}>
              {/* English message bubble */}
              <div style={{
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '60%', // Adjust width as needed
                float: 'right', // Position to the right
                backgroundColor: '#ffffff',
                color: '#cd6f16',
                border: '2px solid #CD6F16',
                marginLeft: 'auto', // Push to the right
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
              }}>
                {msg.english}
              </div>

              {/* Kalenjin translation bubble */}
              <div style={{
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '60%', // Adjust width as needed
                float: 'left', // Position to the left
                backgroundColor: '#CD6F16',
                color: '#ffffff',
                border: '2px solid #ffffff',
                marginRight: 'auto', // Push to the left
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
              }}>
                Translation: {msg.kalenjin}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '40px', display: 'flex', justifyContent: 'space-between', padding: '10px', borderTop: '1px solid #ccc' }}>
          <input
            type="text"
            id="message-input"
            style={{ width: '80%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            style={{
              backgroundColor: '#CD6F16',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
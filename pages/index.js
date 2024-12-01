import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [input, setInput] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleTranslate = () => {
    router.push({
      pathname: '/Chat',
      query: { message: input },
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  const handleLogout = () => {
    alert('Logging out...');
    setDropdownVisible(false);
    router.push('/login');
  };

  return (
    <div style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff' }}>
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
      <main style={{ paddingTop: '60px', textAlign: 'center', width: '80%', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', color: '#CD6F16' }}>Translate from English to Kalenjin</h2>
        <p style={{ fontSize: '25px', margin: '20px 0' }}>
          Translate any word or sentence from English to Kalenjin. The translation is almost accurate to the one you may need since Kalenjin has many subtribes.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            id="input-box"
            style={{
              width: '70%',
              height: '30px',
              padding: '10px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#333',
              color: '#efefef',
              fontSize: '16px',
            }}
            placeholder="Enter text to translate"
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
              marginLeft: '20px',
            }}
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>
        <p id="translation-result" style={{ fontSize: '18px', marginTop: '20px' }}>
          Hello - Chamgei Thank you - Kongoi Goodbye - Saisere
        </p>
      </main>
    </div>
  );
};

export default HomePage;
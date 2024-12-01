import React from 'react';
import { useRouter } from 'next/router';

const HelpPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#7941057a', color: '#333333', padding: '20px' }}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#f5deb3',
          padding: '10px 20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '30px', color: '#333333' }}>Help Center - Kalenjin Translator</h1>
      </header>
      
      <main style={{ paddingTop: '80px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Intro Section */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', color: '#CD6F16' }}>Welcome to the Help Center</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Need help using the Kalenjin Translator? You’re in the right place! This page provides guidance on how to use our translation system, common issues, and how to get the most out of your experience.
          </p>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', color: '#CD6F16' }}>Frequently Asked Questions</h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '20px', fontSize: '18px', lineHeight: '1.8' }}>
            <li>How accurate are the translations?  
              <p style={{ marginLeft: '20px' }}>
                Translations are based on the most common phrases and meanings in the Kalenjin language. However, due to the diversity of dialects, slight variations may occur.
              </p>
            </li>
            <li>Can I save my translation history?  
              <p style={{ marginLeft: '20px' }}>
                Yes! Once you’re logged in, all your translations are saved and accessible from your profile page.
              </p>
            </li>
            <li>Is this tool free to use?  
              <p style={{ marginLeft: '20px' }}>
                Absolutely. This tool is completely free and intended to promote the Kalenjin language and cultural inclusivity.
              </p>
            </li>
          </ul>
        </section>

        {/* Getting Started Section */}
        <section style={{ marginBottom: '30px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '24px', color: '#CD6F16' }}>Getting Started</h3>
          <ol style={{ fontSize: '18px', lineHeight: '1.8' }}>
            <li>
              <strong>Access the Translator:</strong> Go to the home page and enter text in the provided input box.
            </li>
            <li>
              <strong>Enter text or sentence:</strong> Enter single-word or sentence for translation.
            </li>
            <li>
              <strong>Translate:</strong> Press "Translate" and view the result instantly! in the translation page.
            </li>
          </ol>
        </section>

        {/* Contact Support */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', color: '#CD6F16' }}>Contact Support</h3>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            If you encounter any issues or have suggestions, feel free to reach out:
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px' }}>
            <li>Email: <a href="mailto:support@kalenjintranslator.com" style={{ color: '#CD6F16', textDecoration: 'none' }}>support@kalenjintranslator.com</a></li>
            <li>Phone: +254-700-123-456</li>
          </ul>
        </section>

        {/* Video or Image Section */}
        <section style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', color: '#CD6F16' }}>How to Use the Kalenjin Translator</h3>
          <video
            controls
            style={{
              width: '80%',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <source src="/videos/how-to-use.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            Watch this quick tutorial to learn how to get started!
          </p>
        </section>

        {/* Redirect to Home Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={handleBackToHome}
            style={{
              backgroundColor: '#CD6F16',
              color: '#ffffff',
              border: 'none',
              padding: '15px 30px',
              fontSize: '18px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '30px', padding: '10px', backgroundColor: '#f5deb3', borderTop: '1px solid #ccc' }}>
        <p style={{ fontSize: '16px', color: '#333333' }}>
          &copy; 2024 Kalenjin Translator | All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HelpPage;
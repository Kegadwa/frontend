const handleTranslate = async (text) => {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { english: text, kalenjin: data.kalenjin }]);
  };  
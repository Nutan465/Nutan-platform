import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // This line finds your secret key in Netlify
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
      });
      const data = await res.json();
      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResponse("The neural network is busy. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00f2ff', textAlign: 'center' }}>NUTAN PLATFORM</h1>
      
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #333', borderRadius: '15px', background: '#111' }}>
        <input 
          style={{ width: '70%', padding: '10px', background: 'transparent', border: 'none', color: '#fff', borderBottom: '1px solid #00f2ff', outline: 'none' }}
          placeholder="Ask the AI anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleAskAI}
          style={{ width: '25%', padding: '10px', marginLeft: '5%', backgroundColor: '#00f2ff', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          {loading ? "..." : "ASK AI"}
        </button>

        {response && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1a1a1a', borderRadius: '10px', borderLeft: '4px solid #00f2ff' }}>
            <p style={{ color: '#00f2ff', fontSize: '12px', marginBottom: '10px' }}>AI RESPONSE:</p>
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

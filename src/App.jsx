import React, { useState } from 'react';
import { Search, Cpu, ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // This reaches out to Netlify to find your 'VITE_GEMINI_API_KEY'
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
      });
      const data = await res.json();
      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResponse("Neural link failed. Please check your Netlify Key name.");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Background Stars Effect */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.1, zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header with Logos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: '#00f2ff', fontSize: '24px', fontWeight: '900', letterSpacing: '-1px' }}>NUTAN.</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Cpu color="#00f2ff" size={24} />
            <ShoppingBag color="#00f2ff" size={24} />
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#666', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>FUTURE FLOWS</p>

        {/* Futuristic Search Box */}
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              style={{ width: '75%', padding: '15px', background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '16px' }}
              placeholder="Search the neural network..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={handleAskAI}
              style={{ width: '25%', padding: '15px', backgroundColor: '#00f2ff', color: '#000', border: 'none', borderRadius: '18px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? "..." : "ASK AI"}
            </button>
          </div>

          {/* AI Response Display */}
          {response && (
            <div style={{ marginTop: '20px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#00f2ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px', opacity: 0.6 }}>
                <Sparkles size={12} /> NEURAL RESPONSE:
              </div>
              <div style={{ lineHeight: '1.6', fontSize: '15px', color: '#fff' }}>{response}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

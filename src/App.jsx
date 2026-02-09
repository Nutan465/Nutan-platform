import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Search, ShoppingBag, Cpu, Layout, Sparkles, Box } from 'lucide-react';

// 3D Background Element
function NutanCore() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial color="#4a00e0" speed={3} distort={0.4} />
    </Sphere>
  );
}

export default function App() {
  const [view, setView] = useState('home'); // Controls switching between Home, Shop, and Studio
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
      });
      const data = await res.json();
      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResponse("System link failed. Verify Netlify Key.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Canvas>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <NutanCore />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 flex justify-between items-center p-6 backdrop-blur-md border-b border-white/10">
        <h1 className="text-2xl font-black tracking-tighter text-cyan-400">NUTAN.</h1>
        <div className="flex gap-6">
          <button onClick={() => setView('home')} className="hover:text-cyan-400 transition"><Layout size={20} /></button>
          <button onClick={() => setView('shop')} className="hover:text-cyan-400 transition"><ShoppingBag size={20} /></button>
          <button onClick={() => setView('studio')} className="hover:text-cyan-400 transition"><Cpu size={20} /></button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 p-6 max-w-6xl mx-auto">
        
        {view === 'home' && (
          <div className="text-center mt-20">
            <h2 className="text-6xl font-black mb-4">FUTURE FLOWS</h2>
            <p className="text-gray-400 mb-12">The Next Generation AI Commerce & Studio Platform</p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl flex">
              <input 
                className="bg-transparent w-full p-4 outline-none" 
                placeholder="Ask the neural network..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleAskAI} className="bg-cyan-500 text-black px-8 py-3 rounded-2xl font-bold">
                {loading ? "..." : "ASK AI"}
              </button>
            </div>
            {response && <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-cyan-500/30 text-cyan-100 italic">{response}</div>}
          </div>
        )}

        {view === 'shop' && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2"><Box className="text-cyan-400" /> NUTAN MARKETPLACE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-cyan-500/50 transition">
                  <div className="h-40 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-xl mb-4 flex items-center justify-center">
                    <Sparkles className="text-cyan-500/20" size={48} />
                  </div>
                  <h3 className="font-bold">Neural Asset 00{item}</h3>
                  <p className="text-cyan-400 text-sm">$49.99</p>
                  <button className="w-full mt-4 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20">ADD TO CART</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
                                          }

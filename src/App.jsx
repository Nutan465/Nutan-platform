import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

// The 3D Nutan Core
function NutanCore() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial color="#4a00e0" speed={3} distort={0.4} />
    </Sphere>
  );
}

export default function App() {
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
      setResponse("System offline. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans">
      {/* Background 3D Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <NutanCore />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Interface Layer */}
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-black mt-20 tracking-tighter">NUTAN.</h1>
        <p className="text-gray-400 mt-2">FUTURE FLOWS</p>

        {/* The Functional AI Search Bar */}
        <div className="mt-20 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-3xl">
          <div className="flex">
            <input 
              className="bg-transparent w-full p-4 outline-none text-white" 
              placeholder="Ask the neural network..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleAskAI} className="bg-cyan-500 text-black px-8 py-3 rounded-2xl font-bold">
              {loading ? "..." : "ASK AI"}
            </button>
          </div>
          {response && (
            <div className="p-4 border-t border-white/10 text-cyan-200 text-sm italic">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

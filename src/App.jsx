import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Clapperboard, Cpu, Zap, User, Sparkles, ShoppingCart } from 'lucide-react';

// --- 3D BACKGROUND COMPONENT ---
const NutanCore = () => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial color="#7000FF" distort={0.4} speed={2} roughness={0} emissive="#2a004f" />
      </Sphere>
    </Float>
  );
};

// --- FEATURE CARD COMPONENT ---
function FeatureCard({ icon: Icon, title, text, onClick }) {
  return (
    <div onClick={onClick} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/10 transition cursor-pointer group">
      <Icon className="text-cyan-400 mb-4 group-hover:scale-125 transition" size={32} />
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}

// --- PRODUCT CARD COMPONENT ---
function ProductCard({ title, price, color }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
      <div className="h-48 bg-black flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-20" style={{background: `radial-gradient(circle, ${color} 0%, transparent 70%)`}}></div>
        <div className="w-16 h-16 border-2 border-white/20 rotate-45 group-hover:rotate-90 transition-all duration-700"></div>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <div className="flex justify-between items-center mt-4">
          <span className="text-cyan-400 font-mono">${price}</span>
          <button className="p-2 bg-white/10 rounded-lg hover:bg-white hover:text-black transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN NUTAN PLATFORM ---
export default function Nutan() {
  const [view, setView] = useState('home'); 
  const [query, setQuery] = useState("");

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* 3D CANVAS LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00F2FF" />
          <Stars radius={100} depth={50} count={3000} factor={4} fade />
          <NutanCore />
        </Canvas>
      </div>

      {/* NAVIGATION */}
      <nav className="relative z-50 flex justify-between items-center p-6 md:p-8 backdrop-blur-md border-b border-white/5">
        <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setView('home')}>
          NUTAN<span className="text-cyan-400">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest text-gray-400">
          <button onClick={() => setView('home')} className="hover:text-cyan-400 uppercase">Global</button>
          <button onClick={() => setView('shop')} className="hover:text-cyan-400 uppercase">Market</button>
          <button onClick={() => setView('studio')} className="hover:text-cyan-400 uppercase">AI Studio</button>
        </div>
        <div className="flex gap-4">
          <User className="cursor-pointer hover:text-cyan-400" size={20} />
          <ShoppingBag className="cursor-pointer hover:text-cyan-400" size={20} />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <h1 className="text-5xl md:text-8xl font-black text-center mb-6 tracking-tighter leading-none">
                FUTURE <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">FLOWS</span>
              </h1>
              <p className="text-gray-400 text-center max-w-xl mb-12 text-sm md:text-base italic">
                "Search Everything. Buy Anything. Create with AI."
              </p>
              
              {/* AI SEARCH BAR */}
              <div className="relative w-full max-w-2xl group">
                <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative bg-black/60 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
                  <Cpu className="ml-4 text-cyan-400 hidden sm:block" />
                  <input 
                    className="bg-transparent w-full p-4 outline-none text-white placeholder:text-gray-600" 
                    placeholder="Search the neural network..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="bg-cyan-500 text-black px-6 md:px-8 py-3 rounded-xl font-bold hover:bg-white transition whitespace-nowrap">
                    ASK AI
                  </button>
                </div>
              </div>

              {/* BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 w-full max-w-5xl">
                <FeatureCard icon={Sparkles} title="AI Studio" text="Generate cinematic assets" onClick={() => setView('studio')} />
                <FeatureCard icon={ShoppingBag} title="Marketplace" text="Next-gen products" onClick={() => setView('shop')} />
                <FeatureCard icon={Zap} title="Flash Search" text="Aggregated intelligence" onClick={() => {}} />
              </div>
            </motion.div>
          )}

          {view === 'shop' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-black">Marketplace</h2>
                <button onClick={() => setView('home')} className="text-cyan-400 text-sm">← Back</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 <ProductCard title="Neural Link v4" price="1,299" color="#00f2ff" />
                 <ProductCard title="Void Sneakers" price="450" color="#7000ff" />
                 <ProductCard title="Holo Watch Pro" price="890" color="#ff00c8" />
              </div>
            </motion.div>
          )}

          {view === 'studio' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4"><button onClick={() => setView('home')} className="text-gray-500 hover:text-white">✕</button></div>
                <h2 className="text-3xl font-bold mb-2">AI Synthesis Engine</h2>
                <p className="text-gray-500 mb-8 text-sm">Enter a prompt to manifest digital reality.</p>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-6 h-48 outline-none focus:border-cyan-400 transition text-white placeholder:text-gray-700 resize-none" 
                  placeholder="A cyberpunk city under a neon rain, cinematic lighting, 8k..." 
                />
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button className="flex-1 bg-cyan-500 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:bg-white transition uppercase tracking-widest">Generate Image</button>
                  <button className="flex-1 bg-purple-600 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(112,0,255,0.3)] hover:bg-purple-500 transition uppercase tracking-widest">Generate Video</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER STATS */}
      <footer className="fixed bottom-4 w-full text-center pointer-events-none">
        <div className="inline-flex gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-bold">
          <span>AI Status: Active</span>
          <span className="text-cyan-500/50 underline decoration-cyan-500/50">Neural Link Stable</span>
          <span>v1.0.4</span>
        </div>
      </footer>
    </div>
  );
          }

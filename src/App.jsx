import React, { useState } from 'react';
import { ShoppingBag, Cpu, Search, Layout } from 'lucide-react';

export default function App() {
  const [tab, setTab] = useState('home'); // Switches between Home and Store

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navigation - Top Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #222' }}>
        <h2 style={{ color: '#00f2ff', margin: 0 }}>NUTAN.</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Layout onClick={() => setTab('home')} size={24} style={{ cursor: 'pointer' }} />
          <ShoppingBag onClick={() => setTab('shop')} size={24} style={{ cursor: 'pointer' }} />
        </div>
      </nav>

      {/* View 1: Home & AI Search */}
      {tab === 'home' && (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>FUTURE FLOWS</h1>
          <div style={{ maxWidth: '500px', margin: '40px auto', background: '#111', padding: '10px', borderRadius: '15px', border: '1px solid #333', display: 'flex' }}>
            <input style={{ background: 'transparent', border: 'none', color: '#fff', width: '70%', padding: '10px', outline: 'none' }} placeholder="Search AI..." />
            <button style={{ width: '30%', background: '#00f2ff', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>ASK AI</button>
          </div>
        </div>
      )}

      {/* View 2: Amazon-Style Store */}
      {tab === 'shop' && (
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#00f2ff' }}>MARKETPLACE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} style={{ background: '#111', padding: '15px', borderRadius: '15px', border: '1px solid #222' }}>
                <div style={{ height: '100px', background: '#222', borderRadius: '10px', marginBottom: '10px' }}></div>
                <p style={{ margin: '0', fontWeight: 'bold' }}>Product {item}</p>
                <p style={{ color: '#00f2ff', fontSize: '14px' }}>$49.00</p>
                <button style={{ width: '100%', marginTop: '10px', padding: '5px', background: '#fff', color: '#000', border: 'none', borderRadius: '5px', fontSize: '12px' }}>BUY NOW</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

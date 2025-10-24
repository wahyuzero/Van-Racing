import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SEO from './components/common/SEO';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Workshop from './pages/Workshop';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <SEO />
          <Header />
          <main className="flex-1">
            <Routes>
            <Route path="/" element={<Home />} />
            {/* Placeholder routes - akan diimplementasikan di fase selanjutnya */}
            <Route path="/produk" element={<Products />} />
            <Route path="/produk/:id" element={<ProductDetail />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/testimoni" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Artikel Blog - Coming Soon</h1></div>} />
            <Route path="/galeri" element={<Gallery />} />
            <Route path="/cara-order" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Cara Order - Coming Soon</h1></div>} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/kebijakan/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Kebijakan - Coming Soon</h1></div>} />
          </Routes>
        </main>
        <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

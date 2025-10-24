import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Produk', href: '/produk' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Workshop', href: '/workshop' },
    { name: 'Testimoni', href: '/testimoni' },
    { name: 'Blog', href: '/blog' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Kontak', href: '/kontak' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md shadow-lg' : 'bg-gray-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16 lg:h-20">
          {/* Logo (PNG with black-to-transparent processing) */}
          <Link to="/" className="flex items-center space-x-2 group">
            <ProcessedImage src="/logo.png" alt="Van Racing logo" className="w-40 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-red-600 relative ${
                  isActive(item.href) 
                    ? 'text-red-600' 
                    : isScrolled ? 'text-gray-900' : 'text-black'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex ${
                isScrolled ? 'text-gray-900 hover:text-red-600' : 'text-white hover:text-red-200'
              }`}
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* WhatsApp Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex ${
                isScrolled ? 'text-green hover:text-green-600' : 'text-green hover:text-green-200'
              }`}
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">WhatsApp</span>
            </Button>

            {/* Phone Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex ${
                isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => window.open('tel:+6281234567890', '_blank')}
            >
              <Phone className="w-4 h-4 mr-1" />
              <span className="text-xs">Call</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-900 hover:text-red-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => {
                  window.open('https://wa.me/6281234567890', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => {
                  window.open('tel:+6281234567890', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Telepon Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

// Small helper component that loads an image, converts near-black pixels to transparent
// and renders the result as an <img>. Uses an offscreen canvas.
function ProcessedImage({ src, alt = '', className = '', tolerance = 30 }) {
  const [dataUrl, setDataUrl] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    const handleLoad = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Convert near-black pixels to transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // brightness distance from black
          if (r <= tolerance && g <= tolerance && b <= tolerance) {
            data[i + 3] = 0; // alpha -> transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const url = canvas.toDataURL('image/png');
        if (isMounted.current) setDataUrl(url);
      } catch (e) {
        // if CORS or other error, fall back to original src
        if (isMounted.current) setDataUrl(src);
      }
    };

    const handleError = () => {
      if (isMounted.current) setDataUrl(src);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      isMounted.current = false;
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, tolerance]);

  // While processing, show a simple placeholder same size as final
  return (
    <img
      src={dataUrl || src}
      alt={alt}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Search } from 'lucide-react';
import {
  HomeIcon,
  ShoppingBagIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  PhoneIcon as PhoneIconSolid,
  Bars3Icon as Bars3IconSolid
} from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 10);

      // Auto-hide header logic (mobile only)
      if (window.innerWidth < 1024) {
        if (currentScrollY < 80) {
          // Always show near top
          setIsHeaderVisible(true);
        } else {
          // Only hide/show after scrolling past 80px
          const scrollDifference = currentScrollY - lastScrollYRef.current;

          if (scrollDifference > 5) {
            // Scrolling down significantly - hide header
            setIsHeaderVisible(false);
          } else if (scrollDifference < -5) {
            // Scrolling up significantly - show header
            setIsHeaderVisible(true);
          }
        }
      } else {
        // Always show on desktop
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array!

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Produk', href: '/produk' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Workshop', href: '/workshop' },
    { name: 'Testimoni', href: '/testimoni' },
    { name: 'Blog', href: '/blog' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Garansi & Keaslian', href: '/kontak#garansi-keaslian' },
    { name: 'Kontak', href: '/kontak' }
  ];

  const bottomNavItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      iconSolid: HomeIconSolid
    },
    {
      name: 'Produk',
      href: '/produk',
      icon: ShoppingBagIcon,
      iconSolid: ShoppingBagIconSolid
    },
    {
      name: 'Kontak',
      href: '/kontak',
      icon: PhoneIcon,
      iconSolid: PhoneIconSolid
    },
    {
      name: 'More',
      href: '#',
      icon: Bars3Icon,
      iconSolid: Bars3IconSolid,
      action: () => setIsBottomMenuOpen(true)
    }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
      } ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/logo-wahyu-racing.png"
              alt="WaHyu_Racing logo"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-red-500 relative rounded-md ${
                  isActive(item.href)
                    ? 'text-red-500'
                    : isScrolled ? 'text-gray-900 hover:bg-gray-50' : 'text-white hover:bg-white/10'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex transition-all duration-200 ${
                isScrolled ? 'text-gray-900 hover:text-red-500 hover:bg-gray-100' : 'text-white hover:text-red-400 hover:bg-white/10'
              }`}
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* WhatsApp Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex transition-all duration-200 ${
                isScrolled ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-green-400 hover:text-green-300 hover:bg-white/10'
              }`}
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium">WhatsApp</span>
            </Button>

            {/* Phone Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex transition-all duration-200 ${
                isScrolled ? 'text-gray-900 hover:text-blue-600 hover:bg-blue-50' : 'text-white hover:text-blue-300 hover:bg-white/10'
              }`}
              onClick={() => window.open('tel:+6281234567890', '_blank')}
            >
              <Phone className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium">Call</span>
            </Button>

            {/* Mobile Menu Button - Hidden, replaced by bottom nav */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden transition-all duration-200 ${
                isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      </header>

      {/* Bottom Navigation Bar (Mobile Only) - Outside header */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-4 h-16">
            {bottomNavItems.map((item) => {
              const isItemActive = item.href !== '#' && isActive(item.href);
              const Icon = isItemActive ? item.iconSolid : item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                  }}
                  className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                    isItemActive
                      ? 'text-red-500'
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Menu Slide-Up Panel (Mobile) */}
      <AnimatePresence>
        {isBottomMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsBottomMenuOpen(false)}
            />

            {/* Slide-Up Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 lg:hidden max-h-[80vh] overflow-hidden"
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                <button
                  onClick={() => setIsBottomMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="overflow-y-auto max-h-[calc(80vh-120px)] px-4 py-4">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-all ${
                          isActive(item.href)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-900 hover:text-red-500 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsBottomMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-4 border-t space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400 transition-all"
                    onClick={() => {
                      window.open('https://wa.me/6281234567890', '_blank');
                      setIsBottomMenuOpen(false);
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Chat WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all"
                    onClick={() => {
                      window.open('tel:+6281234567890', '_blank');
                      setIsBottomMenuOpen(false);
                    }}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Telepon Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

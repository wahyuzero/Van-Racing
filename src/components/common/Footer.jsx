import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Youtube,
  Facebook,
  Award,
  Shield,
  Truck,
  Wrench
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Produk', href: '/produk' },
    { name: 'Workshop & Custom', href: '/workshop' },
    { name: 'Cara Order', href: '/cara-order' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Testimoni', href: '/testimoni' }
  ];

  const productCategories = [
    { name: 'Knalpot Full System', href: '/produk/full-system' },
    { name: 'Knalpot Slip On', href: '/produk/slip-on' },
    { name: 'Knalpot Custom', href: '/produk/custom' },
    { name: 'Aksesoris Knalpot', href: '/produk/aksesoris' }
  ];

  const policies = [
    { name: 'Kebijakan Garansi', href: '/kebijakan/garansi' },
    { name: 'Kebijakan Retur', href: '/kebijakan/retur' },
    { name: 'Kebijakan Privasi', href: '/kebijakan/privasi' },
    { name: 'Syarat & Ketentuan', href: '/kebijakan/syarat-ketentuan' }
  ];

  const features = [
    {
      icon: Award,
      title: 'Kualitas Premium',
      description: 'Material berkualitas tinggi'
    },
    {
      icon: Shield,
      title: 'Garansi Resmi',
      description: 'Garansi hingga 1 tahun'
    },
    {
      icon: Truck,
      title: 'Pengiriman Aman',
      description: 'Packing rapi ke seluruh Indonesia'
    },
    {
      icon: Wrench,
      title: 'Custom Order',
      description: 'Sesuai kebutuhan motor Anda'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <div>
                <span className="text-xl font-bold">Van Racing</span>
                <span className="block text-sm text-gray-400">Exhaust Indonesia</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Workshop knalpot motor custom & racing terpercaya. Menghadirkan kualitas premium dengan suara khas yang mantap untuk komunitas bikers Indonesia.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Jl. Otomotif Raya No. 123, Purbalingga
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">info@Van Racingexhaust.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Senin - Sabtu: 08:00 - 17:00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Menu Utama</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kategori Produk</h3>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kebijakan</h3>
            <ul className="space-y-3 mb-6">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link
                    to={policy.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <h4 className="text-md font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/Van Racingexhaust"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@Van Racingexhaust"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/Van Racingexhaust"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Van Racing Exhaust Indonesia. Semua hak cipta dilindungi.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by</span>
              <span className="text-red-500 font-semibold text-sm">#Van Racingsound</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

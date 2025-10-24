import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { faqData, faqCategories } from '../data/faq';

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang produk dan layanan Van Racing
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari pertanyaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                      <span className="float-right text-xs text-gray-400">
                        {category.id === 'all' 
                          ? faqData.length 
                          : faqData.filter(faq => faq.category === category.id).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openAll}
                  className="w-full text-xs"
                >
                  Buka Semua
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeAll}
                  className="w-full text-xs"
                >
                  Tutup Semua
                </Button>
              </div>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Butuh Bantuan Lain?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Tim support kami siap membantu Anda
                </p>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-xs"
                    onClick={() => {
                      const message = 'Halo Van Racing, saya membutuhkan bantuan terkait produk/layanan Anda';
                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Chat WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open('tel:+6281234567890', '_blank')}
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Telepon
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Semua Pertanyaan' : 
                   faqCategories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Menampilkan {filteredFAQs.length} pertanyaan
                  {searchTerm && ` untuk "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* FAQ Items */}
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          openItems.has(faq.id) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openItems.has(faq.id) && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada pertanyaan ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah kata kunci pencarian atau kategori yang dipilih
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    variant="outline"
                    className="border-gray-300"
                  >
                    Reset Filter
                  </Button>
                  <Button
                    onClick={() => {
                      const message = 'Halo Van Racing, saya memiliki pertanyaan yang tidak ada di FAQ';
                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Tanya Langsung
                  </Button>
                </div>
              </div>
            )}

            {/* Still Have Questions */}
            {filteredFAQs.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Masih Ada Pertanyaan?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim support kami. 
                  Kami siap membantu Anda 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                    onClick={() => {
                      const message = 'Halo Van Racing, saya memiliki pertanyaan yang tidak ada di FAQ';
                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat WhatsApp
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8"
                    onClick={() => window.open('tel:+6281234567890', '_blank')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Telepon Sekarang
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

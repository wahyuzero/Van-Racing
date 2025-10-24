import React, { useState } from 'react';
import { Search, Filter, Calendar, Tag, Eye, Download, Share2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { galleryItems, galleryCategories, featuredGallery } from '../data/gallery';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter and sort gallery items
  const filteredItems = galleryItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const downloadImage = (imageUrl, title) => {
    // In a real implementation, this would trigger image download
    console.log(`Downloading: ${title}`);
  };

  const shareImage = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      });
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Galeri Van Racing
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Koleksi foto produk, workshop, customer bikes, dan momen-momen berharga Van Racing Exhaust Indonesia
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{galleryItems.length}</div>
                <div className="text-sm text-purple-100">Total Foto</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{galleryCategories.length - 1}</div>
                <div className="text-sm text-purple-100">Kategori</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-purple-100">Customer Puas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-purple-100">Tahun Berkarya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      {featuredGallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Foto Pilihan
              </h2>
              <p className="text-lg text-gray-600">
                Koleksi foto terbaik yang menunjukkan kualitas dan dedikasi Van Racing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGallery.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => openLightbox(item)}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjYuNTY5IDIwMCAxNjYuNTY5IDIwMCAxNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5HYWxsZXJ5IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(item);
                        }}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareImage(item);
                        }}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                    placeholder="Cari foto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {galleryCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                      <span className="float-right text-xs text-gray-400">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Urutkan</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="title">Nama A-Z</option>
                </select>
              </div>

              {/* Reset Filter */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setSortBy('newest');
                }}
                className="w-full text-sm"
              >
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Gallery Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Semua Foto' : 
                   galleryCategories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Menampilkan {filteredItems.length} foto
                  {searchTerm && ` untuk "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                        onClick={() => openLightbox(item)}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjYuNTY5IDIwMCAxNjYuNTY5IDIwMCAxNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5HYWxsZXJ5IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2">{item.description}</p>
                      </div>
                      
                      <div className="absolute top-3 right-3 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(item);
                          }}
                          className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareImage(item);
                          }}
                          className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString('id-ID')}
                        </div>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {galleryCategories.find(cat => cat.id === item.category)?.name}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada foto ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah kata kunci pencarian atau kategori yang dipilih
                </p>
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
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ingin Motor Anda Tampil di Galeri Kami?
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Bagikan foto motor Anda dengan knalpot Van Racing! Foto terbaik akan kami tampilkan di galeri 
            dan media sosial kami sebagai inspirasi untuk bikers lainnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8"
              onClick={() => {
                const message = 'Halo Van Racing, saya ingin berbagi foto motor saya dengan knalpot Van Racing untuk ditampilkan di galeri';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              Kirim Foto Anda
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8"
              onClick={() => window.open('/produk', '_self')}
            >
              Lihat Produk
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ×
            </button>
            
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white font-semibold text-xl mb-2">{selectedImage.title}</h3>
              <p className="text-white/80 mb-4">{selectedImage.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedImage.date).toLocaleDateString('id-ID')}
                  </div>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {galleryCategories.find(cat => cat.id === selectedImage.category)?.name}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadImage(selectedImage.image, selectedImage.title)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareImage(selectedImage)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

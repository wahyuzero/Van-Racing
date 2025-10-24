import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts, blogCategories } from '../data/blog-posts';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort blog posts
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'popular':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog Van Racing
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Tips, panduan, dan insight terbaru seputar dunia knalpot motor dari para ahli Van Racing
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{blogPosts.length}</div>
                <div className="text-sm text-indigo-100">Total Artikel</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{blogCategories.length - 1}</div>
                <div className="text-sm text-indigo-100">Kategori</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-indigo-100">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Artikel Pilihan
              </h2>
              <p className="text-lg text-gray-600">
                Artikel terpopuler dan paling bermanfaat dari tim Van Racing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-[16/10] bg-gray-200 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTI1QzIwMCAxNDEuNTY5IDIwMCAxNDEuNTY5IDIwMCAxMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5CbG9nIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishDate).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      onClick={() => window.open(`/blog/${post.slug}`, '_self')}
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    placeholder="Cari artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {blogCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                      <span className="float-right text-xs text-gray-400">
                        {category.id === 'all' 
                          ? blogPosts.length 
                          : blogPosts.filter(post => post.category === category.id).length
                        }
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="popular">Terpopuler</option>
                </select>
              </div>

              {/* Newsletter */}
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Newsletter Van Racing</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Dapatkan tips dan update terbaru langsung ke email Anda
                </p>
                <Button
                  size="sm"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs"
                  onClick={() => {
                    const message = 'Halo Van Racing, saya ingin berlangganan newsletter untuk mendapatkan tips dan update terbaru';
                    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Semua Artikel' : 
                   blogCategories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Menampilkan {filteredPosts.length} artikel
                  {searchTerm && ` untuk "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* Blog Posts */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/3">
                        <div className="aspect-[16/10] md:aspect-[4/3] bg-gray-200 overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE1MCAxMTYuNTY5IDE1MCAxMTYuNTY5IDE1MCAxMDBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxNTAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIj5CbG9nIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishDate).toLocaleDateString('id-ID')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                            onClick={() => window.open(`/blog/${post.slug}`, '_self')}
                          >
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada artikel ditemukan
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
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Punya Pertanyaan Seputar Knalpot?
          </h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Tim ahli Van Racing siap membantu Anda dengan konsultasi gratis. 
            Dapatkan rekomendasi knalpot yang tepat sesuai motor dan kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8"
              onClick={() => {
                const message = 'Halo Van Racing, saya ingin konsultasi seputar knalpot motor setelah membaca artikel di blog';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              Konsultasi Gratis
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
    </div>
  );
};

export default Blog;

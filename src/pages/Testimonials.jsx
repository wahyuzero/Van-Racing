import React, { useState } from 'react';
import { Star, Play, Filter, Users, MapPin, Calendar, CheckCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials, testimonialStats } from '../data/testimonials';

const Testimonials = () => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Get unique locations
  const locations = ['all', ...new Set(testimonials.map(t => t.location))];

  // Filter and sort testimonials
  const filteredTestimonials = testimonials
    .filter(testimonial => {
      const matchesRating = selectedRating === 'all' || testimonial.rating >= parseInt(selectedRating);
      const matchesLocation = selectedLocation === 'all' || testimonial.location === selectedLocation;
      return matchesRating && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const ratingDistribution = testimonialStats.ratingDistribution;
  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Testimoni Customer
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
              Kepuasan customer adalah prioritas utama kami. Lihat apa kata mereka tentang produk dan layanan Van Racing.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{testimonialStats.totalReviews}+</div>
                <div className="text-sm text-yellow-100">Total Review</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{testimonialStats.averageRating}</div>
                <div className="text-sm text-yellow-100">Rating Rata-rata</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{testimonialStats.satisfactionRate}%</div>
                <div className="text-sm text-yellow-100">Tingkat Kepuasan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{testimonials.filter(t => t.verified).length}</div>
                <div className="text-sm text-yellow-100">Pembelian Terverifikasi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Rating Distribution */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium w-2">{rating}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all"
                          style={{
                            width: `${(ratingDistribution[rating] / totalReviews) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">
                        {ratingDistribution[rating]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Filter Rating</h4>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Semua Rating</option>
                    <option value="5">5 Bintang</option>
                    <option value="4">4+ Bintang</option>
                    <option value="3">3+ Bintang</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Filter Lokasi</h4>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location === 'all' ? 'Semua Lokasi' : location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Urutkan</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedRating('all');
                  setSelectedLocation('all');
                  setSortBy('newest');
                }}
                className="w-full mt-6 text-sm"
              >
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Testimonials Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <p className="text-gray-600">
                  Menampilkan {filteredTestimonials.length} dari {testimonials.length} review
                </p>
              </div>
            </div>

            {/* Testimonials Grid */}
            {filteredTestimonials.length > 0 ? (
              <div className="space-y-6">
                {filteredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Customer Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMjQiIHI9IjgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xNiA0OEMxNiA0MC4yNjggMjIuMjY4IDM0IDMwIDM0SDM0QzQxLjczMiAzNCA0OCA0MC4yNjggNDggNDhWNDhIMTZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                              {testimonial.verified && (
                                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {testimonial.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(testimonial.date).toLocaleDateString('id-ID')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 mt-2 md:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < testimonial.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-sm text-gray-600">Produk yang dibeli:</div>
                          <div className="font-medium text-gray-900">{testimonial.product}</div>
                          <div className="text-sm text-gray-600">Motor: {testimonial.motor}</div>
                        </div>

                        {/* Review Content */}
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                          <p className="text-gray-700 leading-relaxed pl-4 italic">
                            "{testimonial.comment}"
                          </p>
                        </div>

                        {/* Video Button */}
                        {testimonial.beforeAfterVideo && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => window.open(testimonial.beforeAfterVideo, '_blank')}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Lihat Video Before/After
                            </Button>
                          </div>
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
                  Tidak ada review ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah filter yang dipilih untuk melihat review lainnya
                </p>
                <Button
                  onClick={() => {
                    setSelectedRating('all');
                    setSelectedLocation('all');
                    setSortBy('newest');
                  }}
                  variant="outline"
                  className="border-gray-300"
                >
                  Reset Filter
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredTestimonials.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Menampilkan semua {filteredTestimonials.length} review yang sesuai filter
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Bergabunglah dengan Customer yang Puas
          </h3>
          <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
            Lebih dari 1000 customer telah merasakan kualitas dan pelayanan terbaik Van Racing. 
            Saatnya giliran Anda merasakan pengalaman yang sama!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-yellow-600 hover:bg-gray-100 px-8"
              onClick={() => window.open('/produk', '_self')}
            >
              Lihat Produk
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8"
              onClick={() => {
                const message = 'Halo Van Racing, saya tertarik dengan produk Anda setelah melihat testimoni customer';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

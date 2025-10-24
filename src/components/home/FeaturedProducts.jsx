import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, MessageCircle, ArrowRight, Volume2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '../../data/products';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSoundBadgeColor = (soundType) => {
    switch (soundType) {
      case 'silent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'racing':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSoundLabel = (soundType) => {
    switch (soundType) {
      case 'silent':
        return 'Silent Racing';
      case 'medium':
        return 'Medium Racing';
      case 'racing':
        return 'Racing Loud';
      case 'custom':
        return 'Custom Sound';
      default:
        return soundType;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-red-600 font-medium text-sm">Produk Unggulan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Knalpot Terlaris Van Racing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilihan terbaik dari ribuan bikers Indonesia. Kualitas premium dengan suara khas yang mantap.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/1.jpeg';
                    }}
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.originalPrice > product.price && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      PROMO
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSoundBadgeColor(product.soundType)}`}>
                    {getSoundLabel(product.soundType)}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                    asChild
                  >
                    <Link to={`/produk/${product.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  {product.videoUrl && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                      onClick={() => window.open(product.videoUrl, '_blank')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    <Link to={`/produk/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews.length} review)
                    </span>
                  </div>

                  {/* Compatibility */}
                  <p className="text-sm text-gray-600 mb-3">
                    Cocok untuk: {product.compatibility.join(', ')}
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Material:</span>
                    <div className="font-medium text-gray-900">{product.specifications.material}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Diameter:</span>
                    <div className="font-medium text-gray-900">{product.specifications.diameter}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">
                      {product.price > 0 ? formatPrice(product.price) : 'Konsultasi'}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-sm text-green-600 font-medium">
                      Hemat {formatPrice(product.originalPrice - product.price)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      const message = `Halo, saya tertarik dengan ${product.name}. Bisa info lebih lanjut?`;
                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Order WA
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-red-200 text-red-600 hover:bg-red-50"
                    asChild
                  >
                    <Link to={`/produk/${product.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 text-lg group"
          >
            <Link to="/produk">
              Lihat Semua Produk
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

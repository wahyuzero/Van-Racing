import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, MessageCircle, Volume2, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, showFullDetails = false }) => {
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
      case 'custom':
        return 'bg-purple-100 text-purple-800 border-purple-200';
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

  const getMaterialBadgeColor = (material) => {
    switch (material) {
      case 'stainless':
        return 'bg-blue-100 text-blue-800';
      case 'carbon':
        return 'bg-gray-100 text-gray-800';
      case 'titanium':
        return 'bg-orange-100 text-orange-800';
      case 'custom':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 5;

  const handleWhatsAppOrder = () => {
    const message = `Halo Van Racing, saya tertarik dengan ${product.name}. Bisa info lebih lanjut?`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNzIuMDkxIDIwMCAxNzIuMDkxIDIwMCAxNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
            }}
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.originalPrice > product.price && product.price > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              PROMO
            </span>
          )}
          {product.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              UNGGULAN
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
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
              Stok Habis
            </span>
          </div>
        )}
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
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({product.reviews.length} review)
            </span>
          </div>

          {/* Category & Material */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getMaterialBadgeColor(product.material)}`}>
              {product.specifications.material}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-600 capitalize">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          {/* Compatibility */}
          {showFullDetails && (
            <p className="text-sm text-gray-600 mb-3">
              Cocok untuk: {product.compatibility.join(', ')}
            </p>
          )}
        </div>

        {/* Specifications */}
        {showFullDetails && (
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Material:</span>
              <div className="font-medium text-gray-900">{product.specifications.material}</div>
            </div>
            <div>
              <span className="text-gray-500">Diameter:</span>
              <div className="font-medium text-gray-900">{product.specifications.diameter}</div>
            </div>
            <div>
              <span className="text-gray-500">Berat:</span>
              <div className="font-medium text-gray-900">{product.specifications.weight}</div>
            </div>
            <div>
              <span className="text-gray-500">Garansi:</span>
              <div className="font-medium text-gray-900">{product.specifications.warranty}</div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">
              {product.price > 0 ? formatPrice(product.price) : 'Konsultasi'}
            </span>
            {product.originalPrice > product.price && product.price > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice > product.price && product.price > 0 && (
            <div className="text-sm text-green-600 font-medium">
              Hemat {formatPrice(product.originalPrice - product.price)}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
            onClick={handleWhatsAppOrder}
            disabled={!product.inStock}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {product.inStock ? 'Order WA' : 'Stok Habis'}
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

        {/* Additional Info */}
        {showFullDetails && product.features && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Keunggulan:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1 h-1 bg-red-600 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

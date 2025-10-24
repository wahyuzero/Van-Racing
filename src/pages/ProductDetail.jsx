import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MessageCircle, 
  Share2, 
  Heart, 
  ShoppingCart, 
  Play, 
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);

    if (foundProduct) {
      // Get related products (same category, different product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
          <Link to="/produk" className="text-red-600 hover:text-red-700">
            Kembali ke katalog produk
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
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

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 5;

  const handleWhatsAppOrder = () => {
    const message = `Halo Van Racing, saya tertarik dengan ${product.name}. Bisa info lebih lanjut?

Detail produk:
- Nama: ${product.name}
- Harga: ${product.price > 0 ? formatPrice(product.price) : 'Konsultasi'}
- Material: ${product.specifications.material}
- Cocok untuk: ${product.compatibility.join(', ')}

Mohon info ketersediaan stok dan proses pemesanan. Terima kasih!`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const tabs = [
    { id: 'description', label: 'Deskripsi' },
    { id: 'specifications', label: 'Spesifikasi' },
    { id: 'reviews', label: `Review (${product.reviews.length})` },
    { id: 'compatibility', label: 'Kompatibilitas' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <span>/</span>
          <Link to="/produk" className="hover:text-red-600">Produk</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMjUwQzI1MCAyODYuNDIxIDI1MCAyODYuNDIxIDI1MCAyNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                }}
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Video Play Button */}
              {product.videoUrl && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.originalPrice > product.price && product.price > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    PROMO
                  </span>
                )}
                {product.featured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    UNGGULAN
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({product.reviews.length} review)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    {product.price > 0 ? formatPrice(product.price) : 'Konsultasi'}
                  </span>
                  {product.originalPrice > product.price && product.price > 0 && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice > product.price && product.price > 0 && (
                  <div className="text-green-600 font-medium">
                    Hemat {formatPrice(product.originalPrice - product.price)} ({Math.round((1 - product.price / product.originalPrice) * 100)}%)
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Material</div>
                  <div className="font-semibold text-gray-900">{product.specifications.material}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Tipe Suara</div>
                  <div className="font-semibold text-gray-900">{getSoundLabel(product.soundType)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Diameter</div>
                  <div className="font-semibold text-gray-900">{product.specifications.diameter}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Garansi</div>
                  <div className="font-semibold text-gray-900">{product.specifications.warranty}</div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Stok Tersedia</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <span className="w-5 h-5 mr-2 bg-red-600 rounded-full"></span>
                    <span className="font-medium">Stok Habis</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={handleWhatsAppOrder}
                    disabled={!product.inStock}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg disabled:bg-gray-400"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {product.inStock ? 'Order via WhatsApp' : 'Stok Habis'}
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-gray-300 hover:bg-gray-50"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-gray-300 hover:bg-gray-50"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {product.videoUrl && (
                  <Button
                    variant="outline"
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Dengar Suara Knalpot
                  </Button>
                )}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Garansi Resmi
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2 text-blue-600" />
                  Pengiriman Aman
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2 text-yellow-600" />
                  Kualitas Premium
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi Produk</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                </div>

                {product.features && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Keunggulan Produk</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spesifikasi Teknis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Review Customer</h3>
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.name}</h4>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        {review.verified && (
                          <span className="inline-flex items-center mt-2 text-xs text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Pembelian Terverifikasi
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Belum ada review untuk produk ini.</p>
                )}
              </div>
            )}

            {selectedTab === 'compatibility' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Motor yang Kompatibel</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.compatibility.map((motor, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <span className="font-medium text-gray-900">{motor}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Catatan:</strong> Jika motor Anda tidak tercantum dalam daftar, silakan konsultasi dengan tim kami untuk memastikan kompatibilitas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Produk Terkait</h2>
              <Link
                to="/produk"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium group"
              >
                Lihat Semua
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoPlaying && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors text-2xl"
                onClick={() => setIsVideoPlaying(false)}
              >
                ×
              </button>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <p className="text-lg mb-2">Demo Suara {product.name}</p>
                  <p className="text-sm text-gray-400">
                    Video akan ditampilkan di sini (integrasi YouTube)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

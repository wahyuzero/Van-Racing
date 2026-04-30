import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { 
  Star, 
  MessageCircle, 
  Share2, 
  Heart, 
  Play, 
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Award,
  CheckCircle,
  ArrowRight,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/products/ProductCard';
import { getProductRelationSummary, getRelatedWorkshopServices, products } from '@/content';
import { openWhatsAppCta } from '@/lib/site';
import { emitAvailabilityInteraction, emitProofMediaEngagement } from '@/lib/analytics';

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

  const normalizedAvailabilityStatus = product?.availabilityState?.status;

  const getAvailabilityConfig = () => {
    switch (normalizedAvailabilityStatus) {
      case 'ready_stock':
      case 'available':
        return {
          status: 'ready_stock',
          label: 'Ready Stock',
          badgeClassName: 'bg-green-100 text-green-800 border-green-200',
          textClassName: 'text-green-700',
          detail: 'Siap diproses setelah konfirmasi pembayaran dan detail pengiriman.',
          ctaLabel: 'Order via WhatsApp',
          ctaMode: 'order',
          primaryButtonClassName: 'bg-red-600 hover:bg-red-700 text-white',
          secondaryPrompt: 'Butuh konfirmasi terakhir soal suara, fitment, atau pengiriman? Tim kami siap bantu via WhatsApp.',
        };
      case 'pre_order':
        return {
          status: 'pre_order',
          label: 'Pre-order',
          badgeClassName: 'bg-amber-100 text-amber-800 border-amber-200',
          textClassName: 'text-amber-700',
          detail: 'Produksi dijadwalkan setelah spesifikasi disepakati. Tim akan bantu jelaskan antrean dan estimasi pengerjaan.',
          ctaLabel: 'Tanya Pre-order',
          ctaMode: 'consult',
          primaryButtonClassName: 'bg-amber-600 hover:bg-amber-700 text-white',
          secondaryPrompt: 'Cocok untuk Anda yang oke menunggu proses produksi terjadwal dan ingin konfirmasi detail setup lebih dulu.',
        };
      case 'made_by_request':
        return {
          status: 'made_by_request',
          label: 'Made by Request',
          badgeClassName: 'bg-purple-100 text-purple-800 border-purple-200',
          textClassName: 'text-purple-700',
          detail: 'Produk dibuat berdasarkan kebutuhan setup, material, dan karakter suara yang Anda cari.',
          ctaLabel: 'Konsultasi Build',
          ctaMode: 'consult',
          primaryButtonClassName: 'bg-purple-600 hover:bg-purple-700 text-white',
          secondaryPrompt: 'Siapkan info motor, preferensi suara, dan kebutuhan riding agar tim bisa arahkan opsi build paling tepat.',
        };
      case 'workshop_only':
        return {
          status: 'workshop_only',
          label: 'Workshop Only',
          badgeClassName: 'bg-slate-100 text-slate-800 border-slate-300',
          textClassName: 'text-slate-700',
          detail: 'Pengecekan langsung di workshop diperlukan agar proses pemasangan dan hasil akhirnya tidak menyesatkan.',
          ctaLabel: 'Atur Kunjungan Workshop',
          ctaMode: 'workshop',
          primaryButtonClassName: 'bg-slate-800 hover:bg-slate-900 text-white',
          secondaryPrompt: 'Tim akan bantu cek kondisi motor, kebutuhan pemasangan, dan langkah workshop yang paling sesuai.',
        };
      case 'unknown':
        return {
          status: 'unknown',
          label: 'Unknown',
          badgeClassName: 'bg-gray-100 text-gray-700 border-gray-300',
          textClassName: 'text-gray-700',
          detail: 'Status terbaru perlu dicek manual dengan tim. Kami sengaja tidak menampilkan klaim stok yang belum terkonfirmasi.',
          ctaLabel: 'Hubungi Tim WaHyu_Racing',
          ctaMode: 'contact',
          primaryButtonClassName: 'bg-gray-800 hover:bg-gray-900 text-white',
          secondaryPrompt: 'Hubungi tim untuk cek status terbaru, alternatif terdekat, atau opsi workshop yang masih relevan.',
        };
      default:
        return product?.inStock
          ? {
              status: 'ready_stock',
              label: 'Ready Stock',
              badgeClassName: 'bg-green-100 text-green-800 border-green-200',
              textClassName: 'text-green-700',
              detail: 'Siap diproses setelah konfirmasi pembayaran dan detail pengiriman.',
              ctaLabel: 'Order via WhatsApp',
              ctaMode: 'order',
              primaryButtonClassName: 'bg-red-600 hover:bg-red-700 text-white',
              secondaryPrompt: 'Butuh konfirmasi terakhir soal suara, fitment, atau pengiriman? Tim kami siap bantu via WhatsApp.',
            }
          : {
              status: 'unknown',
              label: 'Unknown',
              badgeClassName: 'bg-gray-100 text-gray-700 border-gray-300',
              textClassName: 'text-gray-700',
              detail: 'Status terbaru perlu dicek manual dengan tim. Kami sengaja tidak menampilkan klaim stok yang belum terkonfirmasi.',
              ctaLabel: 'Hubungi Tim WaHyu_Racing',
              ctaMode: 'contact',
              primaryButtonClassName: 'bg-gray-800 hover:bg-gray-900 text-white',
              secondaryPrompt: 'Hubungi tim untuk cek status terbaru, alternatif terdekat, atau opsi workshop yang masih relevan.',
            };
    }
  };

  const availability = getAvailabilityConfig();

  const proofSummary = getProductRelationSummary(product.id);
  const relatedTestimonials = proofSummary.testimonials || [];
  const relatedGallery = proofSummary.gallery || [];
  const relatedBlogPosts = proofSummary.blog || [];
  const hasProductProofRelations = proofSummary.total > 0;
  const relatedWorkshopServices = getRelatedWorkshopServices([
    ...relatedTestimonials.flatMap((item) => item.relatedWorkshopServiceIds || []),
    ...relatedGallery.flatMap((item) => item.relatedWorkshopServiceIds || []),
    ...relatedBlogPosts.flatMap((item) => item.relatedWorkshopServiceIds || []),
  ]);

  const soundProofItems = [
    ...relatedTestimonials
      .filter((testimonial) => testimonial.beforeAfterVideo)
      .map((testimonial) => ({
        id: `sound-testimonial-${testimonial.id}`,
        title: `Video before/after ${testimonial.motor}`,
        description: testimonial.comment,
        badge: `${testimonial.rating}/5`,
        href: '/testimoni',
        ctaLabel: 'Buka testimoni',
      })),
    ...relatedBlogPosts
      .filter((post) => /suara|sound|audio/i.test(`${post.title} ${post.excerpt}`))
      .map((post) => ({
        id: `sound-blog-${post.id}`,
        title: post.title,
        description: post.excerpt,
        badge: post.readTime,
        href: '/blog',
        ctaLabel: 'Baca di blog',
      })),
    ...relatedGallery
      .filter((item) => /sound|suara|testing|before after/i.test(`${item.title} ${item.description} ${(item.tags || []).join(' ')}`))
      .map((item) => ({
        id: `sound-gallery-${item.id}`,
        title: item.title,
        description: item.description,
        badge: 'Galeri',
        href: '/galeri',
        ctaLabel: 'Lihat galeri',
      })),
  ];

  const installProofItems = [
    ...relatedWorkshopServices.map((service) => ({
      id: `install-service-${service.id}`,
      title: service.title,
      description: service.description,
      badge: service.availabilityLabel || 'Workshop',
      href: `/workshop#${service.id}`,
      ctaLabel: 'Lihat layanan',
    })),
    ...relatedGallery
      .filter((item) => /instal|install|fitment|before after|teknisi/i.test(`${item.category} ${item.title} ${item.description} ${(item.tags || []).join(' ')}`))
      .map((item) => ({
        id: `install-gallery-${item.id}`,
        title: item.title,
        description: item.description,
        badge: 'Dokumentasi',
        href: '/galeri',
        ctaLabel: 'Lihat galeri',
      })),
    ...relatedBlogPosts
      .filter((post) => /instal|install|fitment|pasang/i.test(`${post.title} ${post.excerpt}`))
      .map((post) => ({
        id: `install-blog-${post.id}`,
        title: post.title,
        description: post.excerpt,
        badge: post.readTime,
        href: '/blog',
        ctaLabel: 'Baca panduan',
      })),
  ];

  const evidenceItems = [
    ...relatedTestimonials.map((testimonial) => ({
      id: `evidence-testimonial-${testimonial.id}`,
      title: testimonial.name,
      eyebrow: testimonial.motor,
      description: `“${testimonial.comment}”`,
        badge: testimonial.verified ? 'Data review tim' : `${testimonial.rating}/5`,
      href: '/testimoni',
      ctaLabel: 'Buka testimoni',
    })),
    ...relatedGallery.map((item) => ({
      id: `evidence-gallery-${item.id}`,
      title: item.title,
      eyebrow: 'Galeri terkait',
      description: item.description,
      badge: 'Galeri',
      href: '/galeri',
      ctaLabel: 'Lihat galeri',
    })),
    ...relatedBlogPosts.map((post) => ({
      id: `evidence-blog-${post.id}`,
      title: post.title,
      eyebrow: post.category,
      description: post.excerpt,
      badge: post.readTime,
      href: '/blog',
      ctaLabel: 'Buka blog',
    })),
  ];

  const dedupeModuleItems = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      if (!item?.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const soundModuleItems = dedupeModuleItems(soundProofItems).slice(0, 3);
  const installModuleItems = dedupeModuleItems(installProofItems).slice(0, 3);
  const evidenceModuleItems = dedupeModuleItems(evidenceItems).slice(0, 6);
  const hasAnyProofModule = soundModuleItems.length > 0 || installModuleItems.length > 0 || evidenceModuleItems.length > 0;

  const proofModules = [
    {
      id: 'sound',
      title: 'Proof karakter suara',
      description: 'Rangkuman bukti suara dari review, video before/after, dan konten yang sudah terhubung ke produk ini.',
      items: soundModuleItems,
      emptyTitle: 'Belum ada proof suara yang aman ditampilkan',
      emptyDescription: 'Jika Anda butuh referensi suara sebelum order, buka WhatsApp agar tim kirimkan opsi contoh yang paling dekat dengan setup motor Anda.',
      accentClassName: 'bg-red-50 text-red-700',
    },
    {
      id: 'install',
      title: 'Proof instalasi & fitment',
      description: 'Dokumentasi pemasangan, panduan, dan layanan workshop yang paling relevan untuk membantu Anda menilai kecocokannya.',
      items: installModuleItems,
      emptyTitle: 'Belum ada dokumentasi instalasi spesifik untuk produk ini',
      emptyDescription: 'Kami sengaja tidak menampilkan klaim fitment tambahan tanpa bukti yang cukup. Konsultasi workshop akan membantu cek kebutuhan pemasangan Anda.',
      accentClassName: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'evidence',
      title: 'Proof lain yang masih relevan',
      description: 'Testimoni, galeri, dan artikel terkait yang sudah dipetakan ke produk ini melalui adapter konten pusat.',
      items: evidenceModuleItems,
      emptyTitle: 'Belum ada evidence tambahan yang terhubung',
      emptyDescription: 'Halaman ini tidak akan menampilkan shell kosong. Saat relasi proof tersedia, modul ini akan muncul otomatis.',
      accentClassName: 'bg-indigo-50 text-indigo-700',
    },
  ];

  const handleWhatsAppOrder = () => {
    emitAvailabilityInteraction({
      surface: 'product_detail_primary_cta',
      action: 'click',
      product_id: product.id,
      availability_status: availability.status,
      availability_label: availability.label,
    });

    const intentByMode = {
      order: 'order_product',
      consult: 'product_consultation',
      workshop: 'workshop_booking',
      contact: 'contact_support',
    };

    openWhatsAppCta({
      source: 'product_detail_primary_cta',
      userIntent: intentByMode[availability.ctaMode] || 'product_consultation',
      product,
      availability: {
        status: availability.status,
        label: availability.label,
      },
      bike: product.compatibility?.[0] || null,
      notes: availability.secondaryPrompt,
    });
  };

  const handleTrustVerification = () => {
    openWhatsAppCta({
      source: 'product_detail_trust_manual_verification',
      userIntent: 'contact_support',
      product,
      availability: {
        status: availability.status,
        label: availability.label,
      },
      bike: product.compatibility?.[0] || null,
      notes: 'Butuh panduan garansi atau cek keaslian manual untuk produk ini. Mohon bantu cek channel pembelian, bukti transaksi, dan foto produk.',
    });
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
    <div className="min-h-screen bg-gray-50 pt-20 pb-28 sm:pb-8">
      <SEO
        title={`${product.name} - Knalpot Motor WaHyu_Racing`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, knalpot ${product.compatibility?.[0] || 'motor'}, WaHyu_Racing, ${getSoundLabel(product.soundType)}`}
        image={product.images?.[0]}
        url={`/produk/${product.id}`}
        type="product"
        product={{
          name: product.name,
          description: product.description,
          images: product.images,
          price: product.price,
          availability: availability.status === 'ready_stock'
            ? 'https://schema.org/InStock'
            : availability.status === 'pre_order' || availability.status === 'made_by_request'
              ? 'https://schema.org/PreOrder'
              : 'https://schema.org/LimitedAvailability',
          rating: product.reviews.length > 0
            ? {
                average: averageRating.toFixed(1),
                count: product.reviews.length,
              }
            : null,
          category: product.category,
          sku: product.id,
          mpn: product.id,
        }}
      />

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
                <span className={`px-3 py-1 rounded-md text-sm font-medium border ${availability.badgeClassName}`}>
                  {availability.label}
                </span>
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
              <div className="mb-6 space-y-3">
                <div className={`flex items-center ${availability.textClassName}`}>
                  {availability.status === 'ready_stock' ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : availability.status === 'workshop_only' ? (
                    <Wrench className="w-5 h-5 mr-2" />
                  ) : (
                    <span className="w-5 h-5 mr-2 rounded-full bg-current/20 border border-current/30"></span>
                  )}
                  <span className="font-medium">{availability.label}</span>
                </div>

                <p className="text-sm text-gray-600 max-w-xl">{availability.detail}</p>
                <p className="text-sm text-gray-600 max-w-xl">{availability.secondaryPrompt}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={handleWhatsAppOrder}
                    className={`w-full flex-1 py-3 text-base sm:text-lg ${availability.primaryButtonClassName}`}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {availability.ctaLabel}
                  </Button>
                  <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3">
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
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Garansi & keaslian</p>
                      <h2 className="text-base font-semibold text-slate-900">Perlu cek manual sebelum Anda lanjut?</h2>
                      <p className="max-w-2xl text-sm text-slate-700">
                        Untuk tahap MVP ini, verifikasi dilakukan manual oleh tim WaHyu_Racing. Jika Anda ragu soal keaslian produk, channel pembelian, atau langkah klaim garansi, siapkan foto produk, bukti transaksi, dan detail motor lalu hubungi kami.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:min-w-[220px]">
                      <Button
                        variant="outline"
                        className="border-slate-300 text-slate-900 hover:bg-white"
                        onClick={handleTrustVerification}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Cek Manual via WhatsApp
                      </Button>
                      <Link
                        to="/kontak#garansi-keaslian"
                        className="inline-flex items-center justify-center text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                      >
                        Baca panduan lengkap
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
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

              {hasProductProofRelations && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Ringkasan proof</p>
                      <h2 className="text-lg font-semibold text-gray-900">Sebelum order, cek tiga hal ini</h2>
                      <p className="max-w-2xl text-sm text-gray-600">
                        Kami memisahkan proof suara, instalasi, dan evidence pendukung supaya Anda tidak perlu menebak-nebak kecocokan produk ini.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[220px]">
                      <div className="rounded-xl bg-gray-50 px-3 py-3">
                        <div className="text-lg font-bold text-gray-900">{soundModuleItems.length}</div>
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">Sound</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 px-3 py-3">
                        <div className="text-lg font-bold text-gray-900">{installModuleItems.length}</div>
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">Install</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 px-3 py-3">
                        <div className="text-lg font-bold text-gray-900">{proofSummary.total}</div>
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">Evidence</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Garansi dibantu manual oleh tim
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
            <nav className="flex space-x-6 overflow-x-auto px-6">
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
                            Data review tim
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

        {(hasProductProofRelations || hasAnyProofModule) && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Proof untuk membantu keputusan Anda</h2>
              <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                Semua modul di bawah ini memakai relasi proof terpusat dari adapter konten. Jadi halaman hanya menampilkan bukti yang memang tersedia, lalu menyembunyikan bagian kosong atau memberi fallback yang jelas.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {proofModules.map((module) => (
                <section key={module.id} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${module.accentClassName}`}>
                        {module.id}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    {module.items.length > 0 && (
                      <div className="text-sm font-medium text-gray-500">
                        {module.items.length} bukti tersedia
                      </div>
                    )}
                  </div>

                  {module.items.length > 0 ? (
                    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {module.items.map((item) => (
                        <Link
                          key={item.id}
                          to={item.href}
                          onClick={() => {
                            emitProofMediaEngagement({
                              surface: `product_detail_${module.id}`,
                              media_type: module.id,
                              item_id: item.id,
                              item_label: item.title,
                              product_id: product.id,
                            });
                          }}
                          className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              {item.eyebrow && (
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-2">{item.eyebrow}</p>
                              )}
                              <h4 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{item.title}</h4>
                            </div>
                            <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                              {item.badge}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">{item.description}</p>
                          <div className="mt-4 inline-flex items-center text-sm font-medium text-red-600 group-hover:text-red-700">
                            {item.ctaLabel}
                            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-6">
                      <h4 className="text-base font-semibold text-gray-900">{module.emptyTitle}</h4>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{module.emptyDescription}</p>
                    </div>
                  )}
                </section>
              ))}

              {!hasAnyProofModule && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-6">
                  <h3 className="text-lg font-semibold text-gray-900">Belum ada proof terhubung untuk produk ini</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                    Kami sengaja tidak membuat shell kosong atau klaim tambahan tanpa sumber. Gunakan WhatsApp untuk minta proof paling relevan berdasarkan motor, target suara, dan kebutuhan pemasangan Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">WhatsApp cepat</p>
            <p className="truncate text-sm font-medium text-gray-900">{availability.ctaLabel} untuk {product.name}</p>
          </div>
          <Button
            onClick={handleWhatsAppOrder}
            className={`min-w-[148px] ${availability.primaryButtonClassName}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

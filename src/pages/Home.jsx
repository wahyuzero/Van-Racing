import React, { useMemo, useState } from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { 
  Shield, 
  Award, 
  Truck, 
  Wrench, 
  Star, 
  MessageCircle,
  ArrowRight,
  Play,
  Users,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { testimonials } from '../data/testimonials';
import { openWhatsAppCta } from '@/lib/site';
import { emitFitmentUsage } from '@/lib/analytics';
import { blogPosts } from '@/content';

const Home = () => {
  const navigate = useNavigate();
  const [fitmentForm, setFitmentForm] = useState({
    make: '',
    model: '',
    year: '',
    useCase: '',
  });

  const makeOptions = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Lainnya'];
  const useCaseOptions = [
    { value: 'harian', label: 'Harian / commuting' },
    { value: 'weekend', label: 'Weekend ride' },
    { value: 'track', label: 'Track day / racing' },
    { value: 'custom', label: 'Butuh arahan custom' },
  ];

  const modelOptionsByMake = {
    Yamaha: ['R25', 'Vixion', 'R15', 'NMAX', 'MT-25'],
    Honda: ['CBR150R', 'CB150R', 'CBR250RR', 'PCX'],
    Kawasaki: ['Ninja 250', 'Z250', 'KLX'],
    Suzuki: ['GSX-R150', 'Satria F150'],
    Lainnya: ['Tulis manual di katalog'],
  };

  const features = [
    {
      icon: Award,
      title: 'Material Premium',
      description: 'Stainless steel 304, carbon fiber, dan titanium look berkualitas tinggi yang tahan lama dan anti karat.',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Garansi Resmi',
      description: 'Garansi hingga 1 tahun untuk semua produk dengan layanan after sales yang responsif.',
      color: 'text-green-600'
    },
    {
      icon: Wrench,
      title: 'Custom Order',
      description: 'Layanan custom knalpot sesuai motor dan preferensi suara Anda dengan konsultasi gratis.',
      color: 'text-purple-600'
    },
    {
      icon: Truck,
      title: 'Pengiriman Aman',
      description: 'Packing rapi dan aman ke seluruh Indonesia dengan asuransi pengiriman.',
      color: 'text-orange-600'
    }
  ];

  const soundTypes = [
    {
      type: 'Silent Racing',
      description: 'Cocok untuk penggunaan harian, suara tidak terlalu berisik namun tetap berkarakter racing.',
      icon: '🔇',
      products: ['CBR150R', 'Vixion', 'PCX']
    },
    {
      type: 'Medium Racing',
      description: 'Keseimbangan sempurna antara performa dan kenyamanan untuk daily ride dan weekend.',
      icon: '🔊',
      products: ['R25', 'Ninja 250', 'CB150R']
    },
    {
      type: 'Racing Loud',
      description: 'Suara gahar untuk track day dan sport riding, memberikan sensasi racing sejati.',
      icon: '📢',
      products: ['R6', 'CBR600RR', 'Ninja ZX']
    }
  ];

  const testimonialPreview = testimonials.slice(0, 3);

  const blogPreview = useMemo(() => blogPosts.slice(0, 3), []);

  const handleFitmentFieldChange = (field) => (event) => {
    const value = event.target.value;
    setFitmentForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'make' ? { model: '' } : {}),
    }));
  };

  const handleFitmentSubmit = () => {
    emitFitmentUsage({
      surface: 'home_fitment_discovery',
      action: 'submit',
      bike_make: fitmentForm.make || null,
      bike_model: fitmentForm.model || null,
      bike_year: fitmentForm.year || null,
      use_case: fitmentForm.useCase || null,
      matched_by: 'structured_fitment_query',
    });

    const params = new URLSearchParams();

    if (fitmentForm.make) params.set('make', fitmentForm.make);
    if (fitmentForm.model) params.set('model', fitmentForm.model);
    if (fitmentForm.year) params.set('year', fitmentForm.year);
    if (fitmentForm.useCase) params.set('useCase', fitmentForm.useCase);

    navigate(`/produk${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Knalpot Custom & Racing Motor Berkualitas Premium"
        description="Van Racing Exhaust Indonesia - Spesialis knalpot custom dan racing motor. Full System, Slip On, Custom Order dengan material premium. Garansi resmi, pengiriman ke seluruh Indonesia."
        keywords="knalpot motor, knalpot racing, knalpot custom, full system, slip on, Van Racing, exhaust motor, knalpot stainless steel, knalpot carbon, knalpot titanium"
        url="/"
        type="website"
      />
      
      {/* Hero Section */}
      <Hero />

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 mb-4">
                Mulai dari motor Anda
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Cari rekomendasi knalpot berdasarkan make, model, tahun, dan gaya pakai
              </h2>
              <p className="text-gray-600 text-lg">
                Kami sengaja menaruh jalur fitment di depan agar Anda tidak perlu menebak-nebak dari katalog umum. Setelah ini, filter material dan suara tetap tersedia sebagai langkah lanjutan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              <label className="block">
                <span className="block text-sm font-medium text-gray-900 mb-2">Make motor</span>
                <select
                  value={fitmentForm.make}
                  onChange={handleFitmentFieldChange('make')}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih make</option>
                  {makeOptions.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-900 mb-2">Model motor</span>
                <select
                  value={fitmentForm.model}
                  onChange={handleFitmentFieldChange('model')}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={!fitmentForm.make}
                >
                  <option value="">Pilih model</option>
                  {(modelOptionsByMake[fitmentForm.make] || []).map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-900 mb-2">Tahun motor</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={fitmentForm.year}
                  onChange={handleFitmentFieldChange('year')}
                  placeholder="Contoh: 2022"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-900 mb-2">Kebutuhan utama</span>
                <select
                  value={fitmentForm.useCase}
                  onChange={handleFitmentFieldChange('useCase')}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih use case</option>
                  {useCaseOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleFitmentSubmit}>
                Lihat hasil fitment di katalog
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => openWhatsAppCta({
                  source: 'home_fitment_assist',
                  userIntent: 'check_fitment',
                  bike: {
                    make: fitmentForm.make || null,
                    model: fitmentForm.model || null,
                    year: fitmentForm.year || null,
                  },
                  notes: fitmentForm.useCase ? `Use case: ${fitmentForm.useCase}` : 'Pengunjung butuh bantuan memilih fitment dari homepage.',
                })}
              >
                Minta bantuan pilih fitment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Pilih Van Racing?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Komitmen kami untuk memberikan yang terbaik bagi komunitas bikers Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Sound Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pilih Karakter Suara Anda
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Setiap knalpot Van Racing dirancang dengan karakteristik suara yang berbeda sesuai kebutuhan riding style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {soundTypes.map((sound, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{sound.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{sound.type}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{sound.description}</p>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-gray-700">Cocok untuk:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {sound.products.map((product, i) => (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => window.open('/galeri', '_blank')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Dengar Suara
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full mb-4">
              <Star className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-600 font-medium text-sm">Testimoni Customer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kepuasan customer adalah prioritas utama kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonialPreview.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  "{testimonial.comment}"
                </p>
                
                <div className="text-xs text-gray-500">
                  {testimonial.motor} • {testimonial.product}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 text-lg group"
            >
              <Link to="/testimoni">
                Lihat Semua Testimoni
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tips & Artikel Terbaru
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pelajari lebih lanjut tentang dunia knalpot dan modifikasi motor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPreview.map((post) => (
              <article key={post.id} className="group">
                <div className="aspect-[16/10] bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/A1.jpeg';
                    }}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{new Date(post.publishDate).toLocaleDateString('id-ID')}</span>
                    <span>•</span>
                    <span>{post.readTime} baca</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium group"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 text-lg group"
            >
              <Link to="/blog">
                Lihat Semua Artikel
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Upgrade Knalpot Motor Anda?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Konsultasi gratis dengan tim ahli Van Racing untuk mendapatkan knalpot yang tepat sesuai motor dan kebutuhan Anda
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg group"
              onClick={() => {
                openWhatsAppCta({
                  source: 'home_footer_consultation',
                  userIntent: 'product_consultation',
                  notes: 'CTA konsultasi utama dari footer homepage.',
                });
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Konsultasi Gratis
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg group"
            >
              <Link to="/produk">
                Lihat Katalog
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Konsultasi Gratis</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Garansi Resmi</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Pengiriman Aman</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

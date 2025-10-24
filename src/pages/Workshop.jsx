import React from 'react';
import SEO from '../components/common/SEO';
import { 
  Wrench, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  Star,
  Calendar,
  Users,
  Award,
  Shield,
  Truck,
  ArrowRight,
  MessageCircle,
  Camera,
  Settings,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Workshop = () => {
  const services = [
    {
      icon: Settings,
      title: 'Custom Knalpot',
      description: 'Desain dan pembuatan knalpot custom sesuai spesifikasi dan kebutuhan motor Anda',
      features: ['Konsultasi gratis', 'Desain 3D', 'Material premium', 'Garansi 1 tahun'],
      price: 'Mulai dari Rp 1.500.000',
      duration: '3-5 hari kerja'
    },
    {
      icon: Wrench,
      title: 'Instalasi Profesional',
      description: 'Pemasangan knalpot oleh teknisi berpengalaman dengan tools lengkap',
      features: ['Teknisi bersertifikat', 'Tools lengkap', 'Test ride', 'Garansi pemasangan'],
      price: 'Rp 150.000 - 300.000',
      duration: '1-2 jam'
    },
    {
      icon: Zap,
      title: 'Tuning & Dyno Test',
      description: 'Optimasi performa mesin dan pengujian dyno untuk hasil maksimal',
      features: ['Dyno test', 'ECU tuning', 'Air/fuel ratio', 'Performance report'],
      price: 'Rp 500.000 - 1.000.000',
      duration: '2-4 jam'
    },
    {
      icon: Shield,
      title: 'Maintenance & Repair',
      description: 'Perawatan berkala dan perbaikan knalpot untuk menjaga performa optimal',
      features: ['Cleaning service', 'Repacking', 'Welding repair', 'Coating refresh'],
      price: 'Rp 100.000 - 500.000',
      duration: '1-3 jam'
    }
  ];

  const workshopFeatures = [
    {
      icon: Award,
      title: 'Teknisi Berpengalaman',
      description: '5+ tahun pengalaman dalam modifikasi dan custom knalpot motor'
    },
    {
      icon: Settings,
      title: 'Equipment Lengkap',
      description: 'Peralatan modern dan lengkap untuk semua jenis pekerjaan knalpot'
    },
    {
      icon: Target,
      title: 'Precision Work',
      description: 'Setiap pekerjaan dilakukan dengan presisi tinggi dan quality control ketat'
    },
    {
      icon: Clock,
      title: 'Fast Service',
      description: 'Pengerjaan cepat tanpa mengurangi kualitas hasil akhir'
    }
  ];

  const customProcess = [
    {
      step: 1,
      title: 'Konsultasi',
      description: 'Diskusi kebutuhan, budget, dan preferensi suara knalpot Anda',
      icon: MessageCircle
    },
    {
      step: 2,
      title: 'Desain & Quote',
      description: 'Pembuatan desain 3D dan penawaran harga yang detail',
      icon: Settings
    },
    {
      step: 3,
      title: 'Produksi',
      description: 'Proses pembuatan dengan material premium dan teknologi modern',
      icon: Wrench
    },
    {
      step: 4,
      title: 'Quality Check',
      description: 'Pengecekan kualitas dan test fitting sebelum diserahkan',
      icon: CheckCircle
    },
    {
      step: 5,
      title: 'Instalasi',
      description: 'Pemasangan profesional dan test ride untuk memastikan hasil optimal',
      icon: Zap
    }
  ];

  const testimonials = [
    {
      name: 'Andi Wijaya',
      motor: 'Yamaha R25',
      service: 'Custom Full System',
      rating: 5,
      comment: 'Hasil custom knalpot sangat memuaskan! Suaranya pas sesuai request, build quality premium, dan pelayanan workshop sangat profesional.',
      image: '/images/testimonials/andi.jpg'
    },
    {
      name: 'Budi Santoso',
      motor: 'Honda CBR150R',
      service: 'Instalasi + Tuning',
      rating: 5,
      comment: 'Teknisinya sangat ahli, instalasi rapi dan dyno test hasilnya impressive. Performa motor jadi jauh lebih responsif.',
      image: '/images/testimonials/budi.jpg'
    },
    {
      name: 'Reza Pratama',
      motor: 'Kawasaki Ninja 250',
      service: 'Custom Slip On',
      rating: 5,
      comment: 'Workshop Van Racing recommended banget! Dari konsultasi sampai hasil akhir semuanya perfect. Worth every penny!',
      image: '/images/testimonials/reza.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO 
        title="Workshop & Custom Order - Layanan Profesional Knalpot Motor"
        description="Workshop Van Racing menyediakan layanan custom knalpot, instalasi profesional, tuning dyno test, dan maintenance. Teknisi berpengalaman dengan equipment lengkap."
        keywords="workshop knalpot, custom knalpot, instalasi knalpot, tuning motor, dyno test, maintenance knalpot, Van Racing workshop"
        url="/workshop"
        type="website"
      />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Workshop & Custom Order
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Layanan profesional untuk semua kebutuhan knalpot motor Anda. Dari custom order hingga maintenance berkala.
            </p>
            
            {/* Workshop Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Lokasi Workshop</div>
                <div className="text-xs text-gray-300">Jl. Otomotif Raya No. 123, Purbalingga</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Jam Operasional</div>
                <div className="text-xs text-gray-300">Senin - Sabtu: 08:00 - 17:00</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Phone className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Reservasi</div>
                <div className="text-xs text-gray-300">+62 812-3456-7890</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Layanan Workshop Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Berbagai layanan profesional untuk memenuhi semua kebutuhan knalpot motor Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold text-red-600">{service.price}</div>
                        <div className="text-gray-500">{service.duration}</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          const message = `Halo Van Racing, saya ingin reservasi layanan ${service.title}`;
                          window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        Reservasi
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Keunggulan Workshop Van Racing
            </h2>
            <p className="text-lg text-gray-600">
              Mengapa memilih workshop kami untuk kebutuhan knalpot motor Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workshopFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proses Custom Order
            </h2>
            <p className="text-lg text-gray-600">
              Langkah-langkah mudah untuk mendapatkan knalpot custom impian Anda
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {customProcess.map((process, index) => (
                <div key={index} className="relative text-center">
                  {/* Step Circle */}
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                    {process.step}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Testimoni Workshop
            </h2>
            <p className="text-lg text-gray-600">
              Pengalaman customer yang telah menggunakan layanan workshop kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.motor}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}.0)</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                  "{testimonial.comment}"
                </p>
                
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  Layanan: {testimonial.service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Menggunakan Layanan Workshop Kami?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Reservasi sekarang dan dapatkan konsultasi gratis untuk semua kebutuhan knalpot motor Anda
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg group"
              onClick={() => {
                const message = 'Halo Van Racing, saya ingin reservasi layanan workshop dan konsultasi gratis';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Reservasi Sekarang
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg group"
              onClick={() => {
                const message = 'Halo Van Racing, saya ingin konsultasi untuk custom knalpot motor saya';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Konsultasi Custom
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Konsultasi Gratis</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Teknisi Berpengalaman</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Garansi Layanan</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Equipment Lengkap</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;

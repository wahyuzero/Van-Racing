import React from 'react';
import { 
  Award, 
  Users, 
  Target, 
  Heart, 
  Wrench, 
  Shield, 
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const stats = [
    { icon: Users, value: '1000+', label: 'Customer Puas', color: 'text-blue-600' },
    { icon: Award, value: '5+', label: 'Tahun Pengalaman', color: 'text-green-600' },
    { icon: Star, value: '4.9', label: 'Rating Customer', color: 'text-yellow-600' },
    { icon: Wrench, value: '500+', label: 'Custom Order', color: 'text-purple-600' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Kualitas Terjamin',
      description: 'Setiap produk Van Racing melalui quality control ketat untuk memastikan standar kualitas premium yang konsisten.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Kepuasan customer adalah prioritas utama. Kami berkomitmen memberikan pelayanan terbaik dari konsultasi hingga after sales.',
      color: 'text-red-600'
    },
    {
      icon: Wrench,
      title: 'Inovasi Berkelanjutan',
      description: 'Terus berinovasi dalam desain dan teknologi untuk menghadirkan produk knalpot terdepan sesuai perkembangan otomotif.',
      color: 'text-green-600'
    },
    {
      icon: Target,
      title: 'Fokus Performa',
      description: 'Mengutamakan performa optimal tanpa mengorbankan kenyamanan berkendara dan ketahanan produk jangka panjang.',
      color: 'text-orange-600'
    }
  ];

  const team = [
    {
      name: 'Joko Susanto',
      position: 'Founder & Master Craftsman',
      experience: '15+ tahun',
      specialty: 'Custom Exhaust Design',
      image: '/images/team/joko.jpg'
    },
    {
      name: 'Andi Wijaya',
      position: 'Head of Production',
      experience: '10+ tahun',
      specialty: 'Stainless Steel Fabrication',
      image: '/images/team/andi.jpg'
    },
    {
      name: 'Rudi Hartono',
      position: 'Quality Control Manager',
      experience: '8+ tahun',
      specialty: 'Sound Engineering',
      image: '/images/team/rudi.jpg'
    },
    {
      name: 'Sari Indah',
      position: 'Customer Relations',
      experience: '5+ tahun',
      specialty: 'Customer Service',
      image: '/images/team/sari.jpg'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Berdirinya Van Racing',
      description: 'Memulai workshop kecil dengan fokus pada kualitas dan kepuasan customer'
    },
    {
      year: '2020',
      title: 'Ekspansi Produk',
      description: 'Mengembangkan lini produk full system dan slip on untuk berbagai motor'
    },
    {
      year: '2021',
      title: 'Custom Order Service',
      description: 'Meluncurkan layanan custom order untuk memenuhi kebutuhan spesifik customer'
    },
    {
      year: '2022',
      title: '500+ Customer',
      description: 'Mencapai milestone 500 customer puas dengan rating 4.8/5'
    },
    {
      year: '2023',
      title: 'Online Presence',
      description: 'Memperkuat kehadiran online dan jangkauan ke seluruh Indonesia'
    },
    {
      year: '2024',
      title: '1000+ Customer',
      description: 'Melampaui 1000 customer dengan komitmen kualitas yang tidak berubah'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang Van Racing Exhaust Indonesia
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Dari workshop kecil hingga menjadi brand knalpot custom terpercaya di Indonesia
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg"
                onClick={() => {
                  const message = 'Halo Van Racing, saya ingin konsultasi untuk knalpot motor saya';
                  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                Konsultasi Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cerita Van Racing
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  <strong>Van Racing Exhaust Indonesia</strong> lahir dari passion mendalam terhadap dunia otomotif, 
                  khususnya modifikasi knalpot motor. Dimulai pada tahun 2019 oleh Joko Susanto, seorang 
                  craftsman berpengalaman 15+ tahun di bidang fabrikasi logam dan exhaust system.
                </p>
                <p>
                  Berawal dari workshop kecil di Jakarta Timur, Van Racing fokus pada satu hal: 
                  <em>menghadirkan knalpot berkualitas premium dengan suara khas yang mantap</em>. 
                  Setiap produk dibuat dengan perhatian detail tinggi, menggunakan material terbaik, 
                  dan melalui quality control yang ketat.
                </p>
                <p>
                  Filosofi <strong>"Dari Bikers, Untuk Bikers"</strong> menjadi landasan setiap keputusan bisnis. 
                  Kami memahami kebutuhan komunitas motor Indonesia yang menginginkan produk berkualitas 
                  dengan harga yang fair dan pelayanan yang memuaskan.
                </p>
                <p>
                  Hingga kini, Van Racing telah melayani lebih dari 1000 customer di seluruh Indonesia 
                  dengan rating kepuasan 4.9/5. Komitmen terhadap kualitas dan inovasi terus mendorong 
                  kami untuk berkembang dan memberikan yang terbaik bagi komunitas bikers Indonesia.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/Logo-big.png"
                  alt="Van Racing Workshop"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjM3NSIgdmlld0JveD0iMCAwIDUwMCAzNzUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzc1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNTAgMTg3LjVDMjUwIDIyMC42MjEgMjUwIDIyMC42MjEgMjUwIDE4Ny41WiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHR5cGU+V29ya3Nob3AgSlZPVVNFPC90eXBlPgo8L3N2Zz4K';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Tahun</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visi & Misi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Komitmen kami untuk terus berkembang dan memberikan yang terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi brand knalpot custom terdepan di Indonesia yang dikenal karena kualitas premium, 
                inovasi berkelanjutan, dan kepuasan customer yang tinggi. Kami berkomitmen untuk terus 
                menghadirkan produk-produk berkualitas yang memenuhi kebutuhan komunitas bikers Indonesia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Menghadirkan produk knalpot berkualitas premium dengan harga yang fair
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Memberikan pelayanan customer service yang excellent dan responsif
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Terus berinovasi dalam desain dan teknologi exhaust system
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Membangun komunitas bikers yang solid dan saling mendukung
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi setiap keputusan dan tindakan Van Racing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perjalanan Van Racing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Milestone penting dalam perjalanan Van Racing dari tahun ke tahun
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 ${
                    index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'
                  }`}>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="text-2xl font-bold text-red-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg z-10 my-4 lg:my-0 hidden lg:block"></div>

                  {/* Spacer */}
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Van Racing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Orang-orang berpengalaman dan berdedikasi di balik kualitas produk Van Racing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjQ4IiBjeT0iMzYiIHI9IjEyIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjQgNzJDMjQgNjEuNTA3NiAzMi41MDc2IDUzIDQzIDUzSDUzQzYzLjQ5MjQgNTMgNzIgNjEuNTA3NiA3MiA3MlY3MkgyNFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=';
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-2">{member.position}</p>
                <p className="text-sm text-gray-600 mb-1">{member.experience}</p>
                <p className="text-xs text-gray-500">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kunjungi Workshop Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Datang langsung ke workshop untuk konsultasi dan melihat proses pembuatan knalpot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600 text-sm">
                Jl. Otomotif Raya No. 123<br />
                Jakarta Timur 13220
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Jam Operasional</h3>
              <p className="text-gray-600 text-sm">
                Senin - Sabtu<br />
                08:00 - 17:00 WIB
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600 text-sm">
                +62 812-3456-7890<br />
                (WhatsApp Ready)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                info@Van Racingexhaust.com<br />
                support@Van Racingexhaust.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Bergabung dengan Keluarga Van Racing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Konsultasi gratis dengan tim ahli kami untuk mendapatkan knalpot yang tepat sesuai motor dan kebutuhan Anda
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={() => {
                const message = 'Halo Van Racing, saya ingin konsultasi untuk knalpot motor saya setelah membaca tentang perusahaan Anda';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              Konsultasi Gratis
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
              onClick={() => window.open('/produk', '_self')}
            >
              Lihat Produk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

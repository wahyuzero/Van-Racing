import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, MessageCircle, ArrowRight, Star, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Knalpot Custom & Performance",
      subtitle: "Suara Mantap, Kualitas Premium",
      description: "Rasakan pengalaman berkendara yang berbeda dengan knalpot custom Van Racing. Material premium, suara khas, dan kualitas terjamin.",
      image: "/images/hero/hero-1.jpg",
      cta: "Lihat Produk",
      ctaLink: "/produk"
    },
    {
      id: 2,
      title: "Workshop Custom Terpercaya",
      subtitle: "Dari Bikers, Untuk Bikers",
      description: "Lebih dari 5 tahun melayani komunitas motor Indonesia dengan dedikasi tinggi dan hasil yang memuaskan.",
      image: "/images/hero/hero-2.jpg",
      cta: "Tentang Kami",
      ctaLink: "/tentang"
    },
    {
      id: 3,
      title: "Dengar Suara Knalpot Van Racing",
      subtitle: "Silent, Medium, Racing - Pilih Karaktermu",
      description: "Setiap knalpot Van Racing dirancang dengan karakter suara yang berbeda sesuai kebutuhan riding style Anda.",
      image: "/images/hero/hero-3.jpg",
      cta: "Dengar Suara",
      ctaLink: "/galeri",
      hasVideo: true
    }
  ];

  const stats = [
    { icon: Users, value: "1000+", label: "Customer Puas" },
    { icon: Award, value: "5+", label: "Tahun Pengalaman" },
    { icon: Star, value: "4.9", label: "Rating Customer" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentHero.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30">
                <span className="text-red-400 text-sm font-medium">🔥 #Van Racingsound</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {currentHero.title}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-red-400 font-semibold">
                {currentHero.subtitle}
              </h2>
              
              <p className="text-lg text-gray-300 max-w-lg">
                {currentHero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg group"
              >
                <Link to={currentHero.ctaLink}>
                  {currentHero.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {currentHero.hasVideo && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Dengar Suara
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-3 text-lg group"
                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Order Custom
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Featured Product/Video */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gray-800 rounded-xl mb-6 flex items-center justify-center group cursor-pointer"
                     onClick={() => setIsVideoPlaying(true)}>
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  Dengar Suara Knalpot Van Racing
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Rasakan perbedaan karakter suara dari setiap produk knalpot Van Racing. 
                  Dari silent racing hingga racing loud.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Volume2 className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">HD Audio</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">Video Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-red-500 w-8' : 'bg-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm rotate-90 origin-center whitespace-nowrap">Scroll Down</span>
          <div className="w-px h-12 bg-white/30"></div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
              onClick={() => setIsVideoPlaying(false)}
            >
              <span className="text-2xl">×</span>
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <p>Video demo akan ditampilkan di sini</p>
                <p className="text-sm text-gray-400 mt-2">
                  Integrasi dengan YouTube atau video player
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

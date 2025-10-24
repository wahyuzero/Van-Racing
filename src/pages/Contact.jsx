import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Youtube,
  Navigation,
  Car,
  Bike,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motor: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Send to WhatsApp
      const message = `Halo Van Racing, saya ${formData.name} ingin ${formData.subject}.\n\nDetail:\n- Motor: ${formData.motor}\n- Email: ${formData.email}\n- Phone: ${formData.phone}\n- Pesan: ${formData.message}`;
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        motor: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat Workshop',
      details: [
        'Jl. Otomotif Raya No. 123',
        'Purbalingga, Bobotsari 13220',
        'Indonesia'
      ],
      action: 'Lihat di Maps',
      actionUrl: 'https://www.google.com/maps/place/KNALPOT+Van Racing+EXHAUST'
    },
    {
      icon: Phone,
      title: 'Nomor Telepon',
      details: [
        '+62 812-3456-7890 (WhatsApp)',
        '+62 21-8765-4321 (Workshop)',
        'Customer Service 24/7'
      ],
      action: 'Hubungi Sekarang',
      actionUrl: 'tel:+6281234567890'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@Van Racingexhaust.com',
        'workshop@Van Racingexhaust.com',
        'custom@Van Racingexhaust.com'
      ],
      action: 'Kirim Email',
      actionUrl: 'mailto:info@Van Racingexhaust.com'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: [
        'Senin - Jumat: 08:00 - 17:00',
        'Sabtu: 08:00 - 15:00',
        'Minggu: Tutup'
      ],
      action: 'Reservasi',
      actionUrl: 'https://wa.me/6281234567890?text=Halo%20Van Racing%2C%20saya%20ingin%20reservasi%20kunjungan%20workshop'
    }
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@Van Racing_exhaust_indonesia',
      url: 'https://www.instagram.com/Van Racing_exhaust_indonesia/',
      color: 'text-pink-600'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Van Racing Exhaust Indonesia',
      url: 'https://facebook.com/Van Racingexhaust',
      color: 'text-blue-600'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'Van Racing Exhaust',
      url: 'https://youtube.com/@Van Racingrecingexhaust1436',
      color: 'text-red-600'
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Konsultasi Gratis',
      description: 'Chat langsung dengan tim ahli Van Racing',
      action: 'Chat WhatsApp',
      url: 'https://wa.me/6281234567890?text=Halo%20Van Racing%2C%20saya%20ingin%20konsultasi%20gratis',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Car,
      title: 'Kunjungi Workshop',
      description: 'Datang langsung ke workshop untuk melihat produk',
      action: 'Lihat Lokasi',
      url: 'https://www.google.com/maps/place/KNALPOT+Van Racing+EXHAUST',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Bike,
      title: 'Custom Order',
      description: 'Pesan knalpot custom sesuai motor Anda',
      action: 'Order Custom',
      url: 'https://wa.me/6281234567890?text=Halo%20Van Racing%2C%20saya%20ingin%20order%20custom%20knalpot',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO 
        title="Kontak Kami - Van Racing Exhaust Indonesia"
        description="Hubungi Van Racing Exhaust Indonesia untuk konsultasi gratis, custom order, atau kunjungi workshop kami di Jakarta Timur. Customer service 24/7."
        keywords="kontak Van Racing, workshop knalpot Jakarta, konsultasi knalpot, custom order knalpot, alamat Van Racing"
        url="/kontak"
        type="website"
      />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hubungi Kami
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Siap membantu Anda dengan konsultasi gratis, custom order, atau pertanyaan seputar knalpot motor
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Customer Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">&lt; 1 Jam</div>
                <div className="text-sm text-blue-100">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-100">Customer Puas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Aksi Cepat
            </h2>
            <p className="text-lg text-gray-600">
              Pilih cara tercepat untuk terhubung dengan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 mb-6">{action.description}</p>
                <Button
                  className={`${action.color} text-white px-6`}
                  onClick={() => window.open(action.url, '_blank')}
                >
                  {action.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kirim Pesan
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700">Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="08123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motor Anda
                  </label>
                  <input
                    type="text"
                    name="motor"
                    value={formData.motor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yamaha R25, Honda CBR150R, dll"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjek *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih subjek</option>
                  <option value="konsultasi gratis">Konsultasi Gratis</option>
                  <option value="custom order">Custom Order</option>
                  <option value="informasi produk">Informasi Produk</option>
                  <option value="reservasi workshop">Reservasi Workshop</option>
                  <option value="komplain">Komplain</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jelaskan kebutuhan atau pertanyaan Anda..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(info.actionUrl, '_blank')}
                    >
                      {info.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ikuti Media Sosial Kami
              </h3>
              <div className="space-y-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <social.icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`} />
                    <div>
                      <div className="font-medium text-gray-900">{social.name}</div>
                      <div className="text-sm text-gray-600">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lokasi Workshop
            </h3>
            <p className="text-gray-600">
              Kunjungi workshop kami untuk melihat langsung produk dan berkonsultasi dengan tim ahli
            </p>
          </div>
          
          <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Peta Lokasi Workshop Van Racing</p>
              <Button
                onClick={() => window.open('https://www.google.com/maps/place/KNALPOT+Van Racing+EXHAUST', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Buka di Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami kapan saja!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg group"
              onClick={() => {
                const message = 'Halo Van Racing, saya memiliki pertanyaan dan ingin berbicara dengan customer service';
                window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Chat Customer Service
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
              onClick={() => window.open('tel:+6281234567890', '_self')}
            >
              <Phone className="mr-2 w-5 h-5" />
              Telepon Langsung
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

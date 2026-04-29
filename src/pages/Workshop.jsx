import React, { useMemo, useState } from 'react';
import SEO from '../components/common/SEO';
import {
  Wrench,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  Star,
  Calendar,
  Users,
  MessageCircle,
  AlertCircle,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl, openWhatsAppCta } from '@/lib/site';
import { emitWorkshopHelperStart } from '@/lib/analytics';
import {
  workshopBookingHelper,
  workshopCategories,
  workshopContact,
  workshopDurationGuidance,
  workshopFeatures,
  workshopJourney,
  workshopPreparationChecklist,
  workshopServices,
  workshopTestimonials,
} from '@/data/workshop';

const Workshop = () => {
  const [helperForm, setHelperForm] = useState({
    serviceId: 'general-workshop',
    bike: '',
    issue: '',
    schedule: '',
  });

  const selectedService = useMemo(
    () => workshopServices.find((service) => service.id === helperForm.serviceId) || null,
    [helperForm.serviceId]
  );

  const selectedCategory = useMemo(
    () => workshopCategories.find((category) => category.id === selectedService?.categoryId) || null,
    [selectedService]
  );

  const helperAvailability = selectedService
    ? {
        status: selectedService.availabilityStatus,
        label: selectedService.availabilityLabel,
      }
    : {
        status: 'unknown',
        label: workshopBookingHelper.fallbackState.availabilityLabel,
      };

  const helperSummary = [
    selectedService
      ? `Intent layanan: ${selectedService.title}`
      : 'Intent layanan: Pertanyaan umum workshop',
    helperForm.bike.trim() ? `Motor: ${helperForm.bike.trim()}` : 'Motor: belum disebutkan',
    helperForm.issue.trim() ? `Kebutuhan: ${helperForm.issue.trim()}` : 'Kebutuhan: masih perlu dipetakan tim',
    helperForm.schedule.trim() ? `Perkiraan waktu datang: ${helperForm.schedule.trim()}` : 'Perkiraan waktu datang: fleksibel atau belum ditentukan',
    selectedService?.durationRange ? `Rentang durasi: ${selectedService.durationRange}` : 'Rentang durasi: dikonfirmasi setelah tim menilai scope',
    workshopBookingHelper.workshopStateFallbacks.ambiguous,
    workshopBookingHelper.workshopStateFallbacks.unavailable,
  ];

  const selectedPreparation = selectedService?.preparationChecklist?.length
    ? selectedService.preparationChecklist
    : workshopPreparationChecklist;

  const selectedDurationGuidance = selectedService?.durationRange || 'Tim akan jelaskan rentang durasi paling realistis setelah menilai scope.';

  const helperLink = buildWhatsAppUrl({
    source: 'workshop_guided_helper',
    userIntent: selectedService?.intent || 'workshop_booking',
    availability: helperAvailability,
    bike: helperForm.bike.trim() || null,
    notes: helperSummary.join('. '),
  }).url;

  const handleHelperChange = (field) => (event) => {
    const { value } = event.target;
    setHelperForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleHelperSubmit = () => {
    emitWorkshopHelperStart({
      surface: 'workshop_guided_helper',
      service_id: helperForm.serviceId,
      bike_label: helperForm.bike.trim() || null,
    });

    openWhatsAppCta({
      source: 'workshop_guided_helper',
      userIntent: selectedService?.intent || 'workshop_booking',
      availability: helperAvailability,
      bike: helperForm.bike.trim() || null,
      notes: helperSummary.join('. '),
      rawContext: {
        serviceId: helperForm.serviceId,
        issue: helperForm.issue.trim() || null,
        schedule: helperForm.schedule.trim() || null,
      },
    });
  };

  const serviceOptions = [
    {
      id: 'general-workshop',
      title: 'Pertanyaan umum workshop',
      intent: 'workshop_booking',
      availabilityStatus: 'unknown',
      availabilityLabel: workshopBookingHelper.fallbackState.availabilityLabel,
      description: workshopBookingHelper.fallbackState.description,
    },
    ...workshopServices,
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
                <div className="text-xs text-gray-300">{workshopContact.locationLabel}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Jam Operasional</div>
                <div className="text-xs text-gray-300">{workshopContact.hoursLabel}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Phone className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">WhatsApp Workshop</div>
                <div className="text-xs text-gray-300">{workshopContact.reservationLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pilih jalur workshop yang paling dekat dengan kebutuhan Anda
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Halaman ini tetap fokus pada konsultasi terarah. Tidak ada booking slot otomatis, jadi tim akan review dulu intent layanan dan kondisi motor Anda.
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshopCategories.map((category) => (
                <div key={category.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <category.icon className="w-6 h-6" />
                  </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-700 mb-2">{category.summary}</p>
                      <p className="text-sm text-gray-500 mb-3">{category.notes}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-900">Siapkan:</span> {category.preparation}</p>
                        <p><span className="font-medium text-gray-900">Gambaran durasi:</span> {category.durationRange}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              Setiap layanan punya jalur konsultasi yang sedikit berbeda. Pilih intent yang paling dekat agar chat WhatsApp Anda langsung terbaca konteksnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshopServices.map((service) => (
              <div id={service.id} key={service.id} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow scroll-mt-28">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 mb-4">
                      {workshopCategories.find((category) => category.id === service.categoryId)?.title}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold text-red-600">{service.price}</div>
                        <div className="text-gray-500">{service.duration}</div>
                        <div className="text-xs text-gray-500 mt-1">{service.durationRange}</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          openWhatsAppCta({
                            source: 'workshop_service_card',
                            userIntent: service.intent,
                            availability: {
                              status: service.availabilityStatus,
                              label: service.availabilityLabel,
                            },
                            notes: `${service.bookingPrompt} Harga acuan ${service.price}. Durasi ${service.duration}. Intent layanan ${service.title}.`,
                          });
                        }}
                      >
                        Tanya layanan ini
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Persiapan sebelum chat atau datang
              </h2>
              <p className="text-gray-600 mb-6">
                Anda tidak harus mengisi semuanya. Tapi makin jelas info dasarnya, makin cepat tim workshop bisa arahkan jalur yang realistis.
              </p>
              <div className="space-y-3">
                {workshopPreparationChecklist.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white border border-gray-200 p-4 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rentang waktu yang realistis
              </h2>
              <p className="text-gray-600 mb-6">
                Kami sengaja tidak menjanjikan tanggal atau durasi pasti di depan. Angka di bawah hanya panduan awal sebelum teknisi melihat scope nyata.
              </p>
              <div className="space-y-4">
                {workshopDurationGuidance.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{item.label}</h3>
                      <span className="text-sm font-medium text-red-600">{item.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-10">
            <div className="max-w-3xl mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {workshopBookingHelper.heading}
              </h2>
              <p className="text-lg text-gray-600">
                {workshopBookingHelper.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
              <div className="space-y-6">
                <label className="block">
                  <span className="block text-sm font-medium text-gray-900 mb-2">{workshopBookingHelper.serviceQuestion}</span>
                  <select
                    value={helperForm.serviceId}
                    onChange={handleHelperChange('serviceId')}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {serviceOptions.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-900 mb-2">{workshopBookingHelper.bikeQuestion}</span>
                  <input
                    type="text"
                    value={helperForm.bike}
                    onChange={handleHelperChange('bike')}
                    placeholder={workshopBookingHelper.bikePlaceholder}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-900 mb-2">{workshopBookingHelper.issueQuestion}</span>
                  <textarea
                    value={helperForm.issue}
                    onChange={handleHelperChange('issue')}
                    rows={4}
                    placeholder={workshopBookingHelper.issuePlaceholder}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium text-gray-900 mb-2">{workshopBookingHelper.scheduleQuestion}</span>
                  <input
                    type="text"
                    value={helperForm.schedule}
                    onChange={handleHelperChange('schedule')}
                    placeholder={workshopBookingHelper.schedulePlaceholder}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700" onClick={handleHelperSubmit}>
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Kirim ke WhatsApp
                  </Button>
                  <a
                    href={helperLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Preview pesan WhatsApp
                  </a>
                </div>

                <p className="text-sm text-gray-500">
                  {workshopBookingHelper.fallbackSummary}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Search className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {selectedService?.title || workshopBookingHelper.fallbackState.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedService?.description || workshopBookingHelper.fallbackState.description}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 border border-gray-200 mb-3">
                  <div className="font-medium text-gray-900 mb-2">Jenis layanan yang terbaca</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{selectedCategory?.title || 'Pertanyaan umum workshop'}</p>
                    <p className="text-gray-500">{selectedDurationGuidance}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-white p-4 border border-gray-200">
                    <div className="font-medium text-gray-900 mb-1">Status arahan awal</div>
                    <div>{helperAvailability.label}</div>
                  </div>

                  <div className="rounded-xl bg-white p-4 border border-gray-200">
                    <div className="font-medium text-gray-900 mb-2">Yang sebaiknya disiapkan</div>
                    <ul className="space-y-2">
                      {selectedPreparation.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-4 border border-gray-200">
                    <div className="font-medium text-gray-900 mb-1">{workshopBookingHelper.helperNotesTitle}</div>
                    <div className="text-xs text-gray-500 mb-2">Source dan intent akan ikut otomatis supaya tim langsung baca konteks inquiry Anda.</div>
                    <ul className="space-y-2">
                      {helperSummary.map((line) => (
                        <li key={line} className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-amber-50 text-amber-900 p-4 border border-amber-200">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>
                        Workshop helper ini hanya menyiapkan inquiry yang lebih jelas. Konfirmasi slot, inspeksi, dan estimasi akhir tetap lewat chat dengan tim.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              Kami menjaga ekspektasi tetap jelas sejak awal, supaya inquiry yang masuk lebih mudah diarahkan dan tidak membingungkan rider.
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
              Alur workshop dan custom order
            </h2>
            <p className="text-lg text-gray-600">
              Jalur ini membantu rider yang sudah tahu kebutuhannya, maupun pengunjung yang baru punya info minimum dan butuh arahan awal.
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {workshopJourney.map((process) => (
                <div key={process.step} className="relative text-center">
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
            {workshopTestimonials.map((testimonial) => (
              <div key={`${testimonial.name}-${testimonial.service}`} className="bg-white rounded-2xl p-6 shadow-lg">
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
            Mulai dari chat yang lebih jelas dulu. Tim workshop akan arahkan langkah berikutnya, termasuk fallback saat scope atau jadwal belum bisa dipastikan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg group"
              onClick={() => {
                openWhatsAppCta({
                  source: 'workshop_footer_reservation',
                  userIntent: 'workshop_booking',
                  availability: {
                    status: 'workshop_only',
                    label: 'Arahan kunjungan workshop',
                  },
                  notes: 'Saya ingin tanya jalur kunjungan workshop yang paling sesuai. Jika jadwal penuh atau scope saya belum jelas, mohon arahkan alternatif langkah yang tersedia.',
                });
              }}
            >
              <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Tanya Jalur Workshop
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg group"
              onClick={() => {
                openWhatsAppCta({
                  source: 'workshop_footer_custom_cta',
                  userIntent: 'custom_build',
                  availability: {
                    status: 'made_by_request',
                    label: 'Custom build sesuai brief',
                  },
                  notes: 'Saya ingin konsultasi custom build. Jika brief saya masih kurang jelas, mohon bantu arahkan info minimum yang perlu saya siapkan.',
                });
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

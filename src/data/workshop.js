import {
  Award,
  CheckCircle,
  Clock,
  MessageCircle,
  Settings,
  Shield,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';

export const workshopContact = {
  locationLabel: 'Jl. Otomotif Raya No. 123, Purbalingga',
  hoursLabel: 'Senin - Sabtu, 08:00 - 17:00',
  reservationLabel: '+62 812-3456-7890',
};

export const workshopCategories = [
  {
    id: 'custom-fabrication',
    icon: Settings,
    title: 'Custom fabrication',
    summary: 'Untuk rider yang butuh knalpot dibuat atau diubah sesuai karakter motor dan gaya pakai.',
    notes: 'Cocok untuk custom build, revisi desain, dan permintaan suara tertentu.',
    preparation: 'Siapkan info motor, target suara, budget kisaran, dan referensi visual bila ada.',
    durationRange: 'Brief 10 - 15 menit, estimasi kerja menyusul setelah inspeksi.',
  },
  {
    id: 'install-fitment',
    icon: Wrench,
    title: 'Instalasi dan pengecekan fitment',
    summary: 'Untuk pemasangan, test fit, dan konfirmasi part yang paling aman untuk setup motor Anda.',
    notes: 'Cocok jika Anda sudah punya produk atau masih membandingkan opsi.',
    preparation: 'Bawa info part yang dipakai atau foto part, lalu jelaskan apakah motor sudah dimodifikasi.',
    durationRange: 'Pengecekan awal 10 menit, pengerjaan umum sekitar 1 - 2 jam.',
  },
  {
    id: 'performance-support',
    icon: Zap,
    title: 'Tuning dan support performa',
    summary: 'Untuk penyetelan lanjutan setelah pemasangan, termasuk dyno dan evaluasi respons mesin.',
    notes: 'Scope akhir kami konfirmasi dulu berdasarkan motor dan modifikasi pendukungnya.',
    preparation: 'Siapkan daftar modifikasi pendukung, keluhan performa, dan target hasil yang ingin dicapai.',
    durationRange: 'Review awal 10 - 20 menit, durasi final bergantung scope dan ketersediaan alat.',
  },
  {
    id: 'maintenance-repair',
    icon: Shield,
    title: 'Maintenance dan repair',
    summary: 'Untuk servis berkala, repacking, perbaikan sambungan, dan refresh komponen knalpot.',
    notes: 'Cocok untuk rider yang ingin restore performa tanpa ganti sistem penuh.',
    preparation: 'Ceritakan gejala utama, umur pemakaian, dan kirim foto area yang bermasalah jika memungkinkan.',
    durationRange: 'Pemeriksaan awal 10 menit, pengerjaan tergantung kondisi unit dan temuan teknisi.',
  },
];

export const workshopServices = [
  {
    id: 'custom-exhaust',
    categoryId: 'custom-fabrication',
    icon: Settings,
    title: 'Custom Knalpot',
    description: 'Desain dan pembuatan knalpot berdasarkan kebutuhan motor, target suara, dan gaya riding Anda.',
    features: ['Konsultasi awal', 'Review kebutuhan motor', 'Pilihan material premium', 'Estimasi pengerjaan setelah brief jelas'],
    price: 'Mulai dari Rp 1.500.000',
    duration: 'Estimasi setelah inspeksi',
    durationRange: 'Diskusi awal 10 - 15 menit, timeline final mengikuti tingkat custom dan antrean workshop.',
    intent: 'custom_build',
    availabilityStatus: 'made_by_request',
    availabilityLabel: 'Dibuat sesuai brief',
    bookingPrompt: 'Saya ingin konsultasi custom knalpot.',
    preparationChecklist: [
      'Tipe motor, tahun, dan modifikasi yang sudah terpasang',
      'Target suara atau karakter riding yang diinginkan',
      'Referensi desain bila ada',
    ],
  },
  {
    id: 'professional-installation',
    categoryId: 'install-fitment',
    icon: Wrench,
    title: 'Instalasi Profesional',
    description: 'Pemasangan knalpot dengan pengecekan fitment, posisi, dan finishing sebelum motor dibawa pulang.',
    features: ['Pengecekan titik pasang', 'Tools lengkap', 'Review hasil instalasi', 'Saran langkah lanjut bila perlu'],
    price: 'Rp 150.000 - 300.000',
    duration: 'Sekitar 1 - 2 jam',
    durationRange: 'Pengecekan awal 10 menit, pemasangan umum 1 - 2 jam bila tidak ada revisi tambahan.',
    intent: 'workshop_booking',
    availabilityStatus: 'workshop_only',
    availabilityLabel: 'Datang ke workshop',
    bookingPrompt: 'Saya ingin reservasi pemasangan knalpot di workshop.',
    preparationChecklist: [
      'Info motor dan part yang akan dipasang',
      'Foto area pemasangan bila part bukan produk WaHyu_Racing',
      'Perkiraan waktu datang yang paling memungkinkan',
    ],
  },
  {
    id: 'tuning-dyno',
    categoryId: 'performance-support',
    icon: Zap,
    title: 'Tuning dan Dyno Test',
    description: 'Evaluasi performa setelah upgrade knalpot untuk membantu Anda memahami perubahan setup.',
    features: ['Review setup motor', 'Dyno test bila tersedia', 'Catatan hasil pengecekan', 'Rekomendasi tahap berikutnya'],
    price: 'Rp 500.000 - 1.000.000',
    duration: 'Scope dikonfirmasi tim',
    durationRange: 'Brief awal 10 - 20 menit, durasi sesi mengikuti kebutuhan tuning dan kesiapan setup motor.',
    intent: 'workshop_booking',
    availabilityStatus: 'workshop_only',
    availabilityLabel: 'Perlu konfirmasi scope',
    bookingPrompt: 'Saya ingin konsultasi tuning atau dyno untuk motor saya.',
    preparationChecklist: [
      'Daftar modifikasi mesin, ECU, dan intake bila ada',
      'Keluhan performa atau target hasil',
      'Kesiapan motor untuk dites di workshop',
    ],
  },
  {
    id: 'maintenance-repair',
    categoryId: 'maintenance-repair',
    icon: Shield,
    title: 'Maintenance dan Repair',
    description: 'Servis untuk knalpot yang butuh pembersihan, repacking, welding repair, atau pemeriksaan kondisi.',
    features: ['Inspeksi kondisi awal', 'Pilihan perbaikan sesuai temuan', 'Update sebelum tindakan tambahan', 'Saran perawatan berikutnya'],
    price: 'Rp 100.000 - 500.000',
    duration: 'Tergantung kondisi unit',
    durationRange: 'Pemeriksaan awal 10 menit, durasi akhir mengikuti tingkat kerusakan dan parts yang perlu ditangani.',
    intent: 'workshop_booking',
    availabilityStatus: 'workshop_only',
    availabilityLabel: 'Cek kondisi lebih dulu',
    bookingPrompt: 'Saya ingin cek maintenance atau repair knalpot.',
    preparationChecklist: [
      'Gejala utama seperti bocor, suara berubah, atau bracket longgar',
      'Riwayat perbaikan sebelumnya bila ada',
      'Foto area rusak jika motor belum bisa dibawa segera',
    ],
  },
];

export const workshopFeatures = [
  {
    icon: Award,
    title: 'Teknisi berpengalaman',
    description: 'Tim workshop terbiasa menangani custom, pemasangan, dan penyesuaian berbagai setup motor.'
  },
  {
    icon: Settings,
    title: 'Pengerjaan berbasis kebutuhan',
    description: 'Kami mulai dari brief motor, tujuan pemakaian, dan kondisi part yang Anda bawa.'
  },
  {
    icon: Target,
    title: 'Ekspektasi dijelaskan di awal',
    description: 'Jika scope masih abu-abu, tim akan bantu jelaskan langkah aman sebelum pengerjaan lanjut.'
  },
  {
    icon: Clock,
    title: 'Estimasi sesuai kondisi nyata',
    description: 'Kami tidak menjanjikan slot instan atau durasi pasti sebelum detail motor dan pekerjaan jelas.'
  },
];

export const workshopJourney = [
  {
    step: 1,
    title: 'Pilih jenis layanan',
    description: 'Mulai dari custom, instalasi, tuning, atau maintenance supaya inquiry langsung masuk ke jalur yang tepat.',
    icon: MessageCircle,
  },
  {
    step: 2,
    title: 'Kirim info minimum',
    description: 'Minimal kirim tipe motor dan kebutuhan utama. Jika ada, tambahkan gejala, target suara, atau part yang dipakai.',
    icon: Settings,
  },
  {
    step: 3,
    title: 'Tim review scope',
    description: 'Tim cek apakah kasus Anda bisa langsung diarahkan, perlu inspeksi awal, atau masih perlu pertanyaan tambahan.',
    icon: Wrench,
  },
  {
    step: 4,
    title: 'Konfirmasi langkah aman',
    description: 'Kami jelaskan jalur kunjungan, konsultasi custom, atau tindak lanjut paling realistis tanpa menjanjikan slot otomatis.',
    icon: CheckCircle,
  },
  {
    step: 5,
    title: 'Lanjut via WhatsApp',
    description: 'Semua tahap awal tetap lewat chat WhatsApp. Estimasi final dan jadwal hanya dikonfirmasi setelah tim menilai scope.',
    icon: Zap,
  },
];

export const workshopPreparationChecklist = [
  'Tipe motor, tahun, dan modifikasi pendukung bila ada.',
  'Keluhan utama, target suara, atau alasan ingin datang ke workshop.',
  'Foto part atau area bermasalah jika motor belum bisa dibawa segera.',
  'Kisaran waktu datang yang paling realistis, atau tulis fleksibel jika belum yakin.',
];

export const workshopDurationGuidance = [
  {
    id: 'quick-check',
    label: 'Review inquiry awal',
    value: 'Sekitar 5 - 15 menit via chat',
    notes: 'Biasanya cukup untuk membaca intent, data motor, dan kebutuhan minimum.',
  },
  {
    id: 'workshop-visit',
    label: 'Pengecekan saat datang',
    value: 'Sekitar 10 - 20 menit',
    notes: 'Dipakai untuk cek kondisi riil, part bawaan, dan tingkat revisi yang dibutuhkan.',
  },
  {
    id: 'service-range',
    label: 'Durasi pengerjaan umum',
    value: 'Mulai 1 - 2 jam sampai mengikuti scope custom/repair',
    notes: 'Kami hanya memberi estimasi final setelah teknisi melihat kondisi motor dan antrean kerja.',
  },
];

export const workshopBookingHelper = {
  heading: 'Bantu tim baca kebutuhan Anda lebih cepat',
  description: 'Isi seperlunya. Kalau belum tahu detailnya, Anda tetap bisa kirim pertanyaan umum dan tim akan bantu arahkan tanpa booking slot otomatis.',
  serviceQuestion: 'Anda butuh bantuan untuk apa?',
  bikeQuestion: 'Motor yang dipakai',
  bikePlaceholder: 'Contoh: NMAX 155 2022 atau CBR150R',
  issueQuestion: 'Keluhan atau target',
  issuePlaceholder: 'Contoh: ingin suara lebih padat, butuh cek fitment, atau knalpot bocor',
  scheduleQuestion: 'Perkiraan waktu datang',
  schedulePlaceholder: 'Contoh: minggu ini, Sabtu pagi, atau masih fleksibel',
  fallbackSummary: 'Belum ada detail lengkap tidak masalah. Tim tetap bisa mulai dari tipe motor atau pertanyaan singkat Anda.',
  helperNotesTitle: 'Helper ini akan menyiapkan ringkasan inquiry',
  fallbackState: {
    title: 'Belum yakin pilih layanan?',
    description: 'Pilih pertanyaan umum. Tim workshop akan bantu memilah apakah kasus Anda masuk custom, instalasi, tuning, atau repair.',
    availabilityLabel: 'Perlu review tim workshop',
  },
  workshopStateFallbacks: {
    unavailable: 'Jika jadwal workshop penuh, tim akan arahkan alternatif waktu lewat WhatsApp.',
    ambiguous: 'Jika kebutuhan Anda belum jelas, kirim info dasar dulu. Tim akan bantu petakan langkah yang paling aman.',
  },
};

export const workshopTestimonials = [
  {
    name: 'Andi Wijaya',
    motor: 'Yamaha R25',
    service: 'Custom Full System',
    rating: 5,
    comment: 'Hasil custom knalpot sangat memuaskan. Suaranya sesuai brief, build quality rapi, dan proses konsultasinya jelas.',
    image: '/images/testimonials/andi.jpg'
  },
  {
    name: 'Budi Santoso',
    motor: 'Honda CBR150R',
    service: 'Instalasi dan tuning',
    rating: 5,
    comment: 'Teknisinya komunikatif. Instalasi rapi, lalu saya dapat arahan jelas soal langkah tuning berikutnya.',
    image: '/images/testimonials/budi.jpg'
  },
  {
    name: 'Reza Pratama',
    motor: 'Kawasaki Ninja 250',
    service: 'Custom Slip On',
    rating: 5,
    comment: 'Dari konsultasi sampai hasil akhir terasa aman. Saya tidak dijanjikan berlebihan, tapi semua update-nya jelas.',
    image: '/images/testimonials/reza.jpg'
  }
];

import { getAvailabilityContext, getBikeContext, getProductContext } from './products';
import { dispatchAnalytics, emitWhatsAppSourceContext } from './analytics';

const WHATSAPP_NUMBER = '6281234567890';

function sanitizeValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || null;
  }

  return value;
}

function normalizeMetadata(metadata = {}) {
  const source = sanitizeValue(metadata.source) || 'unknown_source';
  const userIntent = sanitizeValue(metadata.userIntent) || 'general_inquiry';
  const bike = getBikeContext(metadata.bike || metadata.selectedBike || null);
  const product = getProductContext(metadata.product || null);
  const availability = metadata.availability?.status
    ? {
        status: sanitizeValue(metadata.availability.status) || 'unknown',
        label: sanitizeValue(metadata.availability.label) || 'Perlu konfirmasi tim',
      }
    : getAvailabilityContext(metadata.product || null, metadata.availabilityLabel);

  return {
    source,
    userIntent,
    bike,
    product,
    availability,
    notes: sanitizeValue(metadata.notes),
    customer: metadata.customer || null,
    rawContext: metadata.rawContext || null,
  };
}

export function buildWhatsAppMessage(metadata = {}) {
  const normalized = normalizeMetadata(metadata);

  const introByIntent = {
    order_product: 'Halo WaHyu_Racing, saya ingin order produk berikut.',
    product_consultation: 'Halo WaHyu_Racing, saya ingin konsultasi soal produk berikut.',
    check_fitment: 'Halo WaHyu_Racing, saya ingin cek kecocokan produk untuk motor saya.',
    workshop_booking: 'Halo WaHyu_Racing, saya ingin reservasi workshop.',
    custom_build: 'Halo WaHyu_Racing, saya ingin konsultasi custom build knalpot.',
    customer_service: 'Halo WaHyu_Racing, saya ingin berbicara dengan customer service.',
    contact_support: 'Halo WaHyu_Racing, saya ingin menghubungi tim WaHyu_Racing.',
  };

  const messageSections = [
    introByIntent[normalized.userIntent] || 'Halo WaHyu_Racing, saya ingin konsultasi lebih lanjut.',
    '',
    'Ringkasan permintaan:',
    `- Source: ${normalized.source}`,
    `- Intent: ${normalized.userIntent}`,
  ];

  if (normalized.bike?.label) {
    messageSections.push(`- Motor dipilih: ${normalized.bike.label}`);
  }

  if (normalized.product?.name) {
    messageSections.push(`- Produk: ${normalized.product.name}`);
  }

  if (normalized.product?.category) {
    messageSections.push(`- Kategori: ${normalized.product.category}`);
  }

  if (normalized.product?.priceLabel) {
    messageSections.push(`- Harga: ${normalized.product.priceLabel}`);
  }

  if (normalized.product?.material) {
    messageSections.push(`- Material: ${normalized.product.material}`);
  }

  if (normalized.product?.compatibility?.length) {
    messageSections.push(`- Fitment produk: ${normalized.product.compatibility.join(', ')}`);
  }

  if (normalized.availability?.label) {
    messageSections.push(`- Availability: ${normalized.availability.label}`);
  }

  if (normalized.notes) {
    messageSections.push(`- Catatan: ${normalized.notes}`);
  }

  if (normalized.customer) {
    const { name, email, phone, message } = normalized.customer;
    messageSections.push('', 'Data pengirim:');

    if (sanitizeValue(name)) {
      messageSections.push(`- Nama: ${name.trim()}`);
    }

    if (sanitizeValue(email)) {
      messageSections.push(`- Email: ${email.trim()}`);
    }

    if (sanitizeValue(phone)) {
      messageSections.push(`- WhatsApp: ${phone.trim()}`);
    }

    if (sanitizeValue(message)) {
      messageSections.push(`- Pesan: ${message.trim()}`);
    }
  }

  messageSections.push('', 'Mohon bantu arahkan langkah berikutnya. Terima kasih!');

  return {
    text: messageSections.join('\n'),
    metadata: normalized,
  };
}

export function buildWhatsAppUrl(metadata = {}) {
  const payload = buildWhatsAppMessage(metadata);
  return {
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(payload.text)}`,
    metadata: payload.metadata,
    text: payload.text,
  };
}

export function emitWhatsAppAnalytics(metadata = {}) {
  const normalized = normalizeMetadata(metadata);
  const payload = {
    event: 'whatsapp_cta_click',
    source: normalized.source,
    user_intent: normalized.userIntent,
    bike_label: normalized.bike?.label || null,
    bike_make: normalized.bike?.make || null,
    bike_model: normalized.bike?.model || null,
    bike_year: normalized.bike?.year || null,
    product_id: normalized.product?.id || null,
    product_name: normalized.product?.name || null,
    product_category: normalized.product?.category || null,
    availability_status: normalized.availability?.status || null,
    availability_label: normalized.availability?.label || null,
  };

  dispatchAnalytics(payload);
  emitWhatsAppSourceContext({
    source: normalized.source,
    user_intent: normalized.userIntent,
    product_id: normalized.product?.id || null,
    availability_status: normalized.availability?.status || null,
    bike_label: normalized.bike?.label || null,
  });

  return payload;
}

export function openWhatsAppCta(metadata = {}) {
  const { url, metadata: normalized } = buildWhatsAppUrl(metadata);
  emitWhatsAppAnalytics(normalized);

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return { url, metadata: normalized };
}

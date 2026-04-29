const dispatchAnalytics = (payload = {}) => {
  try {
    if (!payload || !payload.event) {
      return payload;
    }

    if (typeof window === 'undefined') {
      return payload;
    }

    window.dispatchEvent(new CustomEvent('van-racing:analytics', { detail: payload }));

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', payload.event, payload);
    }
  } catch {
    return payload;
  }

  return payload;
};

export const emitFitmentUsage = (payload = {}) => dispatchAnalytics({
  event: 'fitment_usage',
  surface: payload.surface || 'unknown',
  action: payload.action || 'submit',
  bike_make: payload.bike_make || null,
  bike_model: payload.bike_model || null,
  bike_year: payload.bike_year || null,
  use_case: payload.use_case || null,
  matched_by: payload.matched_by || null,
});

export const emitAvailabilityInteraction = (payload = {}) => dispatchAnalytics({
  event: 'availability_interaction',
  surface: payload.surface || 'unknown',
  action: payload.action || 'view',
  product_id: payload.product_id || null,
  availability_status: payload.availability_status || null,
  availability_label: payload.availability_label || null,
});

export const emitProofMediaEngagement = (payload = {}) => dispatchAnalytics({
  event: 'proof_media_engagement',
  surface: payload.surface || 'unknown',
  media_type: payload.media_type || null,
  item_id: payload.item_id || null,
  item_label: payload.item_label || null,
  product_id: payload.product_id || null,
});

export const emitWorkshopHelperStart = (payload = {}) => dispatchAnalytics({
  event: 'workshop_helper_start',
  surface: payload.surface || 'unknown',
  service_id: payload.service_id || null,
  bike_label: payload.bike_label || null,
});

export const emitWhatsAppSourceContext = (payload = {}) => dispatchAnalytics({
  event: 'whatsapp_source_context',
  source: payload.source || 'unknown_source',
  user_intent: payload.user_intent || null,
  product_id: payload.product_id || null,
  availability_status: payload.availability_status || null,
  bike_label: payload.bike_label || null,
});

export { dispatchAnalytics };

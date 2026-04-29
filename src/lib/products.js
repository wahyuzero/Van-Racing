const FALLBACK_AVAILABILITY_LABELS = {
  ready_stock: 'Ready Stock',
  available: 'Ready Stock',
  pre_order: 'Pre-order',
  made_by_request: 'Made by Request',
  workshop_only: 'Workshop Only',
  unknown: 'Perlu konfirmasi tim',
};

export function getProductContext(product) {
  if (!product) {
    return null;
  }

  return {
    id: product.id || null,
    name: product.name || null,
    category: product.category || null,
    priceLabel: typeof product.price === 'number' && product.price > 0
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(product.price)
      : 'Konsultasi',
    material: product?.specifications?.material || product?.material || null,
    soundType: product?.soundType || null,
    compatibility: Array.isArray(product?.compatibility) ? product.compatibility.filter(Boolean) : [],
    fitment: product?.fitment || null,
    relatedWorkshopServiceIds: Array.isArray(product?.relatedWorkshopServiceIds) ? product.relatedWorkshopServiceIds : [],
    proofTags: Array.isArray(product?.proofTags) ? product.proofTags : [],
  };
}

export function getAvailabilityContext(product, fallbackLabel) {
  const status = product?.availabilityState?.status || (product?.inStock ? 'ready_stock' : 'unknown');
  const label = fallbackLabel || FALLBACK_AVAILABILITY_LABELS[status] || 'Perlu konfirmasi tim';

  return {
    status,
    label,
    inStock: Boolean(product?.inStock),
  };
}

export function getBikeContext(bike) {
  if (!bike) {
    return null;
  }

  if (typeof bike === 'string') {
    const trimmed = bike.trim();
    return trimmed
      ? {
          label: trimmed,
          make: null,
          model: null,
          year: null,
        }
      : null;
  }

  const make = bike.make?.trim() || null;
  const model = bike.model?.trim() || null;
  const year = bike.year?.toString().trim() || null;
  const label = [make, model, year].filter(Boolean).join(' ').trim() || bike.label?.trim() || null;

  if (!label) {
    return null;
  }

  return {
    label,
    make,
    model,
    year,
  };
}

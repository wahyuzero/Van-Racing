import { products as rawProducts } from '@/data/products';
import { testimonials as rawTestimonials } from '@/data/testimonials';
import { galleryItems as rawGalleryItems, galleryCategories, featuredGallery as rawFeaturedGallery } from '@/data/gallery';
import { blogPosts as rawBlogPosts, blogCategories } from '@/data/blog-posts';
import { workshopServices } from '@/data/workshop';

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/van racing|jvouse/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const hasToken = (haystack, needle) => haystack.includes(normalize(needle));

const productMatchers = {
  'fs-r25-stainless': ['r25', 'yamaha r25', 'full system r25', 'full system yamaha r25'],
  'so-cbr150-carbon': ['cbr150r', 'honda cbr150r', 'slip on cbr150r', 'carbon look cbr150r'],
  'fs-ninja250-titanium': ['ninja 250', 'kawasaki ninja 250', 'full system ninja 250', 'titanium look ninja 250'],
  'so-vixion-stainless': ['vixion', 'yamaha vixion', 'slip on vixion'],
  'custom-order': ['custom', 'custom order', 'custom knalpot'],
};

const workshopMatchers = {
  'custom-exhaust': ['custom', 'custom order', 'custom knalpot', 'fabrication'],
  'professional-installation': ['instalasi', 'installation', 'pasang', 'fitment'],
  'tuning-dyno': ['tuning', 'dyno', 'track', 'performa'],
  'maintenance-repair': ['maintenance', 'repair', 'service', 'repacking', 'welding'],
};

const rawProductsById = Object.fromEntries(rawProducts.map((product) => [product.id, product]));

const buildStructuredFitmentMatchers = (product) => {
  const fitment = product?.fitment || {};
  const rangeLabel = fitment.yearStart && fitment.yearEnd ? `${fitment.yearStart}-${fitment.yearEnd}` : null;

  return [fitment.make, fitment.model, rangeLabel, ...(fitment.useCaseTags || [])].filter(Boolean);
};

const inferProductIds = (...values) => {
  const text = normalize(values.filter(Boolean).join(' '));
  return rawProducts
    .filter((product) => {
      const matchers = [product.name, ...(product.compatibility || []), ...buildStructuredFitmentMatchers(product), ...(productMatchers[product.id] || [])];
      return matchers.some((matcher) => hasToken(text, matcher));
    })
    .map((product) => product.id);
};

const inferWorkshopServiceIds = (...values) => {
  const text = normalize(values.filter(Boolean).join(' '));
  return workshopServices
    .filter((service) => {
      const matchers = [service.title, service.description, ...(workshopMatchers[service.id] || [])];
      return matchers.some((matcher) => hasToken(text, matcher));
    })
    .map((service) => service.id);
};

const dedupeById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const workshopServicesById = Object.fromEntries(
  workshopServices.map((service) => [service.id, service])
);

export const testimonials = rawTestimonials.map((testimonial) => ({
  ...testimonial,
  relatedProductIds: inferProductIds(testimonial.product, testimonial.motor, testimonial.comment),
  relatedWorkshopServiceIds: inferWorkshopServiceIds(testimonial.product, testimonial.comment),
}));

export const galleryItems = rawGalleryItems.map((item) => ({
  ...item,
  relatedProductIds: inferProductIds(item.title, item.description, ...(item.tags || [])),
  relatedWorkshopServiceIds: inferWorkshopServiceIds(item.category, item.title, item.description, ...(item.tags || [])),
}));

export const blogPosts = rawBlogPosts.map((post) => ({
  ...post,
  relatedProductIds: inferProductIds(post.title, post.excerpt, post.content, ...(post.tags || [])),
  relatedWorkshopServiceIds: inferWorkshopServiceIds(post.title, post.excerpt, post.content, ...(post.tags || [])),
}));

const proofIndexByProduct = {
  testimonials: new Map(),
  gallery: new Map(),
  blog: new Map(),
};

const pushIndexed = (map, productId, item) => {
  if (!map.has(productId)) map.set(productId, []);
  map.get(productId).push(item);
};

testimonials.forEach((item) => item.relatedProductIds.forEach((productId) => pushIndexed(proofIndexByProduct.testimonials, productId, item)));
galleryItems.forEach((item) => item.relatedProductIds.forEach((productId) => pushIndexed(proofIndexByProduct.gallery, productId, item)));
blogPosts.forEach((item) => item.relatedProductIds.forEach((productId) => pushIndexed(proofIndexByProduct.blog, productId, item)));

export const products = rawProducts.map((product) => ({
  ...product,
  relatedProof: {
    testimonials: dedupeById(proofIndexByProduct.testimonials.get(product.id) || []),
    gallery: dedupeById(proofIndexByProduct.gallery.get(product.id) || []),
    blog: dedupeById(proofIndexByProduct.blog.get(product.id) || []),
  },
}));

export const productsById = Object.fromEntries(products.map((product) => [product.id, product]));

export const featuredGallery = rawFeaturedGallery.map((item) =>
  galleryItems.find((galleryItem) => galleryItem.id === item.id) || item
);

export { blogCategories, galleryCategories };

export const getRelatedProducts = (productIds = []) =>
  dedupeById(productIds.map((id) => productsById[id]).filter(Boolean));

export const getRelatedWorkshopServices = (serviceIds = []) =>
  dedupeById(serviceIds.map((id) => workshopServicesById[id]).filter(Boolean));

const withResolvedRelations = (item) => {
  const relatedProducts = getRelatedProducts(item?.relatedProductIds);
  const relatedWorkshopServices = getRelatedWorkshopServices(item?.relatedWorkshopServiceIds);

  return {
    ...item,
    relationSummary: {
      relatedProducts,
      relatedWorkshopServices,
      hasRelations: relatedProducts.length > 0 || relatedWorkshopServices.length > 0,
    },
  };
};

const testimonialsWithRelations = testimonials.map(withResolvedRelations);
const galleryItemsWithRelations = galleryItems.map(withResolvedRelations);
const blogPostsWithRelations = blogPosts.map(withResolvedRelations);

const relationCollections = {
  testimonial: testimonialsWithRelations,
  gallery: galleryItemsWithRelations,
  blog: blogPostsWithRelations,
};

export const getContentRelationSummary = (collectionKey, itemId) => {
  const item = relationCollections[collectionKey]?.find((entry) => String(entry.id) === String(itemId));

  return (
    item?.relationSummary || {
      relatedProducts: [],
      relatedWorkshopServices: [],
      hasRelations: false,
    }
  );
};

export const getTestimonialRelationSummary = (itemId) => getContentRelationSummary('testimonial', itemId);
export const getGalleryRelationSummary = (itemId) => getContentRelationSummary('gallery', itemId);
export const getBlogRelationSummary = (itemId) => getContentRelationSummary('blog', itemId);

export const getProductRelationSummary = (productId) => {
  const product = productsById[productId] || rawProductsById[productId];
  if (!product?.relatedProof) {
    return {
      testimonials: [],
      gallery: [],
      blog: [],
      total: 0,
    };
  }

  const { testimonials: productTestimonials = [], gallery = [], blog = [] } = product.relatedProof;
  return {
    testimonials: productTestimonials,
    gallery,
    blog,
    total: productTestimonials.length + gallery.length + blog.length,
  };
};

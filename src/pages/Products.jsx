import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import { products, categories } from '../data/products';
import { openWhatsAppCta } from '@/lib/site';
import { emitFitmentUsage } from '@/lib/analytics';

const createFitmentStateFromParams = (params) => ({
  make: params.get('make') || '',
  model: params.get('model') || '',
  year: params.get('year') || '',
  useCase: params.get('useCase') || '',
});

const createSearchValueFromFitment = (fitment) => [fitment.make, fitment.model, fitment.year].filter(Boolean).join(' ');

const createFilterStateFromParams = (params) => {
  const fitment = createFitmentStateFromParams(params);

  return {
    category: params.get('category') || 'all',
    material: [],
    soundType: [],
    priceRange: 'all',
    search: params.get('search') || createSearchValueFromFitment(fitment),
  };
};

const normalizeValue = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokenizeValue = (value) => normalizeValue(value).split(' ').filter(Boolean);

const productMatchesFitment = (product, fitment) => {
  const structuredFitment = product?.fitment || null;
  const make = normalizeValue(fitment.make);
  const model = normalizeValue(fitment.model);
  const year = String(fitment.year || '').trim();

  if (!make && !model && !year) {
    return true;
  }

  if (product.category === 'custom') {
    return true;
  }

  if (structuredFitment) {
    const matchesMake = !make || normalizeValue(structuredFitment.make).includes(make);
    const matchesModel = !model || tokenizeValue(model).every((token) => tokenizeValue(structuredFitment.model).includes(token));
    const yearStart = structuredFitment.yearStart;
    const yearEnd = structuredFitment.yearEnd;
    const numericYear = Number(year);
    const matchesYear = !year || !numericYear || !yearStart || !yearEnd || (numericYear >= yearStart && numericYear <= yearEnd);

    if (matchesMake && matchesModel && matchesYear) {
      return true;
    }
  }

  const compatibilityEntries = Array.isArray(product.compatibility) ? product.compatibility : [];
  const compatibilityText = normalizeValue(compatibilityEntries.join(' '));
  const compatibilityTokens = new Set(tokenizeValue(compatibilityEntries.join(' ')));
  const productTokens = new Set(tokenizeValue(`${product.name} ${product.description}`));

  const matchesToken = (token) => !token || compatibilityTokens.has(token) || productTokens.has(token);

  if (make && !matchesToken(make)) {
    return false;
  }

  if (model) {
    const modelTokens = tokenizeValue(model);
    if (!modelTokens.every(matchesToken)) {
      return false;
    }
  }

  if (year) {
    return compatibilityText.includes(year);
  }

  return true;
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [fitmentForm, setFitmentForm] = useState(() => createFitmentStateFromParams(searchParams));

  const makeOptions = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Lainnya'];
  const useCaseOptions = [
    { value: 'harian', label: 'Harian / commuting' },
    { value: 'weekend', label: 'Weekend ride' },
    { value: 'track', label: 'Track day / racing' },
    { value: 'custom', label: 'Butuh arahan custom' },
  ];
  const modelOptionsByMake = {
    Yamaha: ['R25', 'Vixion', 'R15', 'NMAX', 'MT-25'],
    Honda: ['CBR150R', 'CB150R', 'CBR250RR', 'PCX'],
    Kawasaki: ['Ninja 250', 'Z250', 'KLX'],
    Suzuki: ['GSX-R150', 'Satria F150'],
    Lainnya: ['Tulis manual di WhatsApp'],
  };
  
  const [filters, setFilters] = useState(() => createFilterStateFromParams(searchParams));

  useEffect(() => {
    setFitmentForm(createFitmentStateFromParams(searchParams));
    setFilters((current) => {
      const next = createFilterStateFromParams(searchParams);
      return {
        ...current,
        category: next.category,
        search: next.search,
      };
    });
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Material filter
    if (filters.material && filters.material.length > 0) {
      filtered = filtered.filter(product => filters.material.includes(product.material));
    }

    // Sound type filter
    if (filters.soundType && filters.soundType.length > 0) {
      filtered = filtered.filter(product => filters.soundType.includes(product.soundType));
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (product.price === 0) return true; // Custom products
        return product.price >= min && product.price <= max;
      });
    }

    const hasExplicitFitment = Boolean(fitmentForm.make || fitmentForm.model || fitmentForm.year);

    if (hasExplicitFitment) {
      filtered = filtered.filter((product) => productMatchesFitment(product, fitmentForm));
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.compatibility.some(motor => motor.toLowerCase().includes(searchTerm))
      );
    }

    if (fitmentForm.useCase) {
      filtered = filtered.filter((product) => {
        if (fitmentForm.useCase === 'track') {
          return product.category === 'full-system' || product.soundType === 'racing';
        }

        if (fitmentForm.useCase === 'harian') {
          return product.soundType === 'silent' || product.soundType === 'medium' || product.category === 'slip-on';
        }

        if (fitmentForm.useCase === 'weekend') {
          return product.soundType === 'medium' || product.category === 'full-system';
        }

        if (fitmentForm.useCase === 'custom') {
          return product.category === 'custom';
        }

        return true;
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.reviews.length > 0 ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length : 0;
          bValue = b.reviews.length > 0 ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length : 0;
          break;
        case 'newest':
          aValue = new Date(a.createdAt || '2024-01-01');
          bValue = new Date(b.createdAt || '2024-01-01');
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [filters, fitmentForm, sortBy, sortOrder]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));

    // Update URL params for category
    if (filterType === 'category') {
      const nextParams = new URLSearchParams(searchParams);

      if (value === 'all') {
        nextParams.delete('category');
      } else {
        nextParams.set('category', value);
      }

      setSearchParams(nextParams);
    }
  };

  const handleFitmentFieldChange = (field, value) => {
    setFitmentForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'make' ? { model: '' } : {}),
    }));
  };

  const applyFitmentFlow = () => {
    const nextSearch = createSearchValueFromFitment(fitmentForm);

    emitFitmentUsage({
      surface: 'products_fitment_helper',
      action: 'apply',
      bike_make: fitmentForm.make || null,
      bike_model: fitmentForm.model || null,
      bike_year: fitmentForm.year || null,
      use_case: fitmentForm.useCase || null,
      matched_by: 'structured_fitment_first',
    });

    setFilters((current) => ({
      ...current,
        search: nextSearch,
    }));

    const nextParams = new URLSearchParams(searchParams);

    [['make', fitmentForm.make], ['model', fitmentForm.model], ['year', fitmentForm.year], ['useCase', fitmentForm.useCase], ['search', nextSearch]].forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });

    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      material: [],
      soundType: [],
      priceRange: 'all',
      search: ''
    });
    setFitmentForm({
      make: '',
      model: '',
      year: '',
      useCase: '',
    });
    setSearchParams({});
  };

  const getCurrentCategoryName = () => {
    if (filters.category === 'all') return 'Semua Produk';
    const category = categories.find(cat => cat.id === filters.category);
    return category ? category.name : 'Produk';
  };

  const hasExplicitFitment = Boolean(fitmentForm.make || fitmentForm.model || fitmentForm.year || fitmentForm.useCase);
  const fitmentSummary = [fitmentForm.make, fitmentForm.model, fitmentForm.year].filter(Boolean).join(' ') || 'Belum memilih motor';

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO
        title={`${getCurrentCategoryName()} Knalpot Motor WaHyu_Racing`}
        description={filters.category === 'all'
          ? 'Jelajahi katalog knalpot WaHyu_Racing untuk berbagai motor, karakter suara, dan kebutuhan harian atau custom. Konsultasi via WhatsApp tetap jadi jalur tercepat untuk cek kecocokan.'
          : `Lihat pilihan ${getCurrentCategoryName()} dari WaHyu_Racing dengan filter material, suara, dan kebutuhan motor. WhatsApp tetap tersedia untuk bantu cek fitment sebelum order.`}
        keywords="katalog knalpot motor, knalpot WaHyu_Racing, slip on, full system, custom exhaust, katalog knalpot racing"
        url={filters.category === 'all' ? '/produk' : `/produk?category=${filters.category}`}
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getCurrentCategoryName()}
              </h1>
              <p className="text-gray-600">
                Temukan knalpot terbaik untuk motor Anda
              </p>
            </div>
            
            {/* Category Quick Links */}
            <div className="mt-4 lg:mt-0">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={filters.category === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('category', category.id)}
                    className={filters.category === category.id ? 'bg-red-600 hover:bg-red-700' : 'border-gray-300 hover:border-red-300'}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 mb-4">
              Discovery fitment lebih dulu
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mulai dari motor Anda, lalu lanjutkan ke filter katalog</h2>
            <p className="text-gray-600">
              Jalur ini menjaga konteks dari homepage sampai hasil katalog. Filter kategori, material, dan suara tetap tersedia sebagai alat penyempurnaan setelah fitment awal dipilih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-900 mb-2">Make motor</span>
              <select
                value={fitmentForm.make}
                onChange={(event) => handleFitmentFieldChange('make', event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Pilih make</option>
                {makeOptions.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-900 mb-2">Model motor</span>
              <select
                value={fitmentForm.model}
                onChange={(event) => handleFitmentFieldChange('model', event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!fitmentForm.make}
              >
                <option value="">Pilih model</option>
                {(modelOptionsByMake[fitmentForm.make] || []).map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-900 mb-2">Tahun motor</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={fitmentForm.year}
                onChange={(event) => handleFitmentFieldChange('year', event.target.value)}
                placeholder="Contoh: 2022"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-900 mb-2">Kebutuhan utama</span>
              <select
                value={fitmentForm.useCase}
                onChange={(event) => handleFitmentFieldChange('useCase', event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Pilih use case</option>
                {useCaseOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Fitment aktif:</span> {fitmentSummary}
              {fitmentForm.useCase ? ` • Use case: ${fitmentForm.useCase}` : ''}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={applyFitmentFlow}>
                Terapkan fitment
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => openWhatsAppCta({
                  source: 'products_fitment_helper',
                  userIntent: 'check_fitment',
                  bike: {
                    make: fitmentForm.make || null,
                    model: fitmentForm.model || null,
                    year: fitmentForm.year || null,
                  },
                  notes: fitmentForm.useCase
                    ? `Use case yang dipilih: ${fitmentForm.useCase}`
                    : 'Pengunjung perlu bantuan cek fitment dari halaman produk.',
                })}
              >
                Tanya fitment via WhatsApp
              </Button>
            </div>
          </div>

          {!hasExplicitFitment && (
            <p className="mt-4 text-sm text-gray-500">
              Jika coverage motor Anda belum lengkap, tetap lanjutkan dengan katalog atau kirim tipe motor ke WhatsApp untuk dicek manual oleh tim.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilter
              onFilterChange={handleFilterChange}
              activeFilters={filters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Menampilkan {filteredProducts.length} dari {products.length} produk
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Urutkan:</span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [newSortBy, newSortOrder] = e.target.value.split('-');
                        setSortBy(newSortBy);
                        setSortOrder(newSortOrder);
                      }}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="name-asc">Nama A-Z</option>
                      <option value="name-desc">Nama Z-A</option>
                      <option value="price-asc">Harga Terendah</option>
                      <option value="price-desc">Harga Tertinggi</option>
                      <option value="rating-desc">Rating Tertinggi</option>
                      <option value="newest-desc">Terbaru</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showFullDetails={viewMode === 'list'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Grid className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada produk ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Reset Filter
                  </Button>
                  <Button
                    onClick={() => openWhatsAppCta({
                      source: 'products_fitment_fallback',
                      userIntent: 'check_fitment',
                      bike: {
                        make: fitmentForm.make || null,
                        model: fitmentForm.model || null,
                        year: fitmentForm.year || null,
                        label: filters.search || null,
                      },
                      notes: filters.search
                        ? `Tidak menemukan hasil untuk pencarian/fitment: ${filters.search}${fitmentForm.useCase ? ` | use case: ${fitmentForm.useCase}` : ''}`
                        : 'Tidak menemukan produk yang sesuai dengan filter aktif.',
                    })}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Cek via WhatsApp
                  </Button>
                </div>
              </div>
            )}

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Menampilkan semua {filteredProducts.length} produk
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

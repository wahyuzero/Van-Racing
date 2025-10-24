import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    material: [],
    soundType: [],
    priceRange: 'all',
    search: ''
  });

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

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.compatibility.some(motor => motor.toLowerCase().includes(searchTerm))
      );
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
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));

    // Update URL params for category
    if (filterType === 'category') {
      if (value === 'all') {
        searchParams.delete('category');
      } else {
        searchParams.set('category', value);
      }
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      material: [],
      soundType: [],
      priceRange: 'all',
      search: ''
    });
    setSearchParams({});
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getCurrentCategoryName = () => {
    if (filters.category === 'all') return 'Semua Produk';
    const category = categories.find(cat => cat.id === filters.category);
    return category ? category.name : 'Produk';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Reset Filter
                </Button>
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

import React, { useState } from 'react';
import { Filter, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { filterOptions } from '../../data/products';

const ProductFilter = ({ onFilterChange, activeFilters, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    material: true,
    soundType: true,
    priceRange: true
  });

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'full-system', label: 'Full System' },
    { value: 'slip-on', label: 'Slip On' },
    { value: 'custom', label: 'Custom Order' },
    { value: 'accessories', label: 'Aksesoris' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange('search', e.target.value);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter && filter !== 'all'
    ).length;
  };

  const FilterSection = ({ title, sectionKey, options, type = 'checkbox' }) => {
    const isExpanded = expandedSections[sectionKey];
    
    return (
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full py-2 text-left"
          onClick={() => toggleSection(sectionKey)}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type={type}
                  name={sectionKey}
                  value={option.value}
                  checked={
                    type === 'radio' 
                      ? activeFilters[sectionKey] === option.value
                      : activeFilters[sectionKey]?.includes(option.value)
                  }
                  onChange={(e) => {
                    if (type === 'radio') {
                      handleFilterChange(sectionKey, e.target.value);
                    } else {
                      const currentValues = activeFilters[sectionKey] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      handleFilterChange(sectionKey, newValues);
                    }
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-center border-gray-300"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter Produk
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filter Produk</h3>
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-6">
            <FilterSection
              title="Kategori"
              sectionKey="category"
              options={categories}
              type="radio"
            />
            
            <FilterSection
              title="Material"
              sectionKey="material"
              options={filterOptions.materials}
            />
            
            <FilterSection
              title="Tipe Suara"
              sectionKey="soundType"
              options={filterOptions.soundTypes}
            />
            
            <FilterSection
              title="Rentang Harga"
              sectionKey="priceRange"
              options={filterOptions.priceRanges}
              type="radio"
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filter Produk</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <FilterSection
                  title="Kategori"
                  sectionKey="category"
                  options={categories}
                  type="radio"
                />
                
                <FilterSection
                  title="Material"
                  sectionKey="material"
                  options={filterOptions.materials}
                />
                
                <FilterSection
                  title="Tipe Suara"
                  sectionKey="soundType"
                  options={filterOptions.soundTypes}
                />
                
                <FilterSection
                  title="Rentang Harga"
                  sectionKey="priceRange"
                  options={filterOptions.priceRanges}
                  type="radio"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="flex-1"
                >
                  Clear Filter
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Terapkan Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;

import { Suspense } from 'react';
import { getProducts, getCategories, getBrands } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import ProductsFilters from '@/components/product/ProductsFilters';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Get filters from search params
  const categoryFilter = searchParams.category;
  const brandFilter = searchParams.brand;
  const sortFilter = searchParams.sort as 'price_asc' | 'price_desc' | 'newest' | 'popular' | undefined;
  const inStockOnly = searchParams.inStock === 'true';
  
  // Fetch products based on filters
  const products = getProducts({
    category: categoryFilter,
    brand: brandFilter,
  });
  
  // Sort products if needed
  let sortedProducts = [...products];
  if (sortFilter) {
    switch (sortFilter) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  // Filter by in-stock if needed
  if (inStockOnly) {
    sortedProducts = sortedProducts.filter(product => product.inStock);
  }
  
  // Get all categories and brands for filters
  const categories = getCategories();
  const brands = getBrands();
  
  // Get page title based on filters
  let pageTitle = 'All Products';
  if (categoryFilter) {
    const category = categories.find(c => c.slug === categoryFilter);
    if (category) pageTitle = category.name;
  } else if (brandFilter) {
    const brand = brands.find(b => b.slug === brandFilter);
    if (brand) pageTitle = `${brand.name} Products`;
  }

  return (
    <main>
      <Navbar />
      <div className="pt-16 md:pt-20"> {/* Add padding top to account for fixed navbar */}
        <div className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold">{pageTitle}</h1>
            <p className="text-muted-foreground mt-2">
              {sortedProducts.length} products available
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div>Loading filters...</div>}>
                <ProductsFilters 
                  categories={categories}
                  brands={brands}
                  selectedCategory={categoryFilter}
                  selectedBrand={brandFilter}
                  selectedSort={sortFilter}
                  inStockOnly={inStockOnly}
                />
              </Suspense>
            </div>
            
            {/* Products grid */}
            <div className="lg:col-span-3">
              {sortedProducts.length > 0 ? (
                <ProductGrid products={sortedProducts} columns={3} />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
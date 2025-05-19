import { getProducts } from '@/lib/db';
import ProductGrid from '@/components/product/ProductGrid';

export default function FeaturedProducts() {
  const featuredProducts = getProducts({ featured: true, limit: 4 });
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Our handpicked selection of top electronics</p>
          </div>
          <a href="/products" className="mt-4 md:mt-0 text-sm font-medium hover:text-primary transition-colors">
            View all products →
          </a>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
}
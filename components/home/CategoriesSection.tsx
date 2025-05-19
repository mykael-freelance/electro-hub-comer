import { getFeaturedCategories } from '@/lib/db';
import CategoryCard from '@/components/product/CategoryCard';

export default function CategoriesSection() {
  const categories = getFeaturedCategories();
  
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Browse our wide range of electronic categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
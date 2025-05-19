import { getBrands } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandsSection() {
  const brands = getBrands();
  
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Trusted Brands</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We partner with the world's leading technology companies to bring you the best quality products.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {brands.map((brand) => (
            <Link 
              key={brand.id}
              href={`/products?brand=${brand.slug}`}
              className="bg-background hover:bg-primary/5 border border-border rounded-lg p-6 flex items-center justify-center h-24 transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="absolute inset-0 mix-blend-overlay">
            <Image
              src="https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg"
              alt="Promotion background"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20"
            />
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Summer Sale
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Get up to 40% off on selected items. Limited time offer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products?sale=true">
                  <Button size="lg" variant="secondary">
                    Shop the Sale
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="text-blue-100">Smartphones</span>
                    <span className="text-white font-bold">Up to 30% OFF</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="text-blue-100">Headphones</span>
                    <span className="text-white font-bold">Up to 40% OFF</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="text-blue-100">Laptops</span>
                    <span className="text-white font-bold">Up to 25% OFF</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Wearables</span>
                    <span className="text-white font-bold">Up to 35% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
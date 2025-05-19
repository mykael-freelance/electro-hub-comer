import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoriesSection from '@/components/home/CategoriesSection';
import PromoBanner from '@/components/home/PromoBanner';
import FeaturesSection from '@/components/home/FeaturesSection';
import BrandsSection from '@/components/home/BrandsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-16 md:pt-20"> {/* Add padding top to account for fixed navbar */}
        <HeroSection />
        
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoriesSection />
        </Suspense>
        
        <Suspense fallback={<div>Loading featured products...</div>}>
          <FeaturedProducts />
        </Suspense>
        
        <PromoBanner />
        
        <Suspense fallback={<div>Loading brands...</div>}>
          <BrandsSection />
        </Suspense>
        
        <FeaturesSection />
        
        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
}
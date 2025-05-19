"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hero slide type
interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
}

// Hero slides data
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Discover the Latest Tech",
    subtitle: "Explore our newest arrivals in smartphones, laptops, and more",
    image: "https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg",
    cta: {
      text: "Shop New Arrivals",
      link: "/products?new=true"
    }
  },
  {
    id: 2,
    title: "Premium Audio Experience",
    subtitle: "Immerse yourself in superior sound quality with our headphones collection",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    cta: {
      text: "Explore Audio",
      link: "/products?category=audio"
    }
  },
  {
    id: 3,
    title: "Level Up Your Gaming",
    subtitle: "Unleash your potential with our gaming consoles and accessories",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    cta: {
      text: "Game On",
      link: "/products?category=gaming"
    }
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle manual slide change
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6 animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              <Link href={slide.cta.link}>
                <Button size="lg" className="animate-fade-in-up animation-delay-400 group">
                  {slide.cta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-primary w-8" 
                : "bg-primary/50 hover:bg-primary/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
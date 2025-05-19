import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn(
        'group relative flex h-40 overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/30 z-10" />
      
      <Image 
        src={category.image} 
        alt={category.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="relative z-20 p-6 flex flex-col justify-between h-full w-full">
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {category.description}
        </p>
        <span className="text-sm font-medium flex items-center group-hover:text-primary transition-colors">
          Shop now
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
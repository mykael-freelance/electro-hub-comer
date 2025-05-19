"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Link 
      href={`/products/${product.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <Badge className="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-xs font-medium">
            New
          </Badge>
        )}
        {product.discount && (
          <Badge variant="destructive" className="px-2 py-1 text-xs font-medium">
            {product.discount}% OFF
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="secondary" className="px-2 py-1 text-xs font-medium">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        className={`absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1.5 backdrop-blur transition-all hover:bg-background ${
          isFavorite ? 'text-red-500' : 'text-muted-foreground'
        }`}
        onClick={handleToggleFavorite}
        aria-label="Add to favorites"
      >
        <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.images.length > 1 && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {product.brand}
          </span>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
            <span className="ml-1 text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        
        <h3 className="mb-1 text-base font-medium line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="default" 
          size="sm"
          className="w-full transition-transform active:scale-95"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}
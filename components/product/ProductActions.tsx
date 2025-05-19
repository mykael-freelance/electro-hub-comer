"use client";

import { useState } from 'react';
import { MinusCircle, PlusCircle, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { Product } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <MinusCircle className="h-5 w-5" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Increase quantity"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <Separator />
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          size="lg" 
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1"
          onClick={toggleFavorite}
        >
          <Heart 
            className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`}
          />
          {isFavorite ? 'Saved' : 'Save for Later'}
        </Button>
      </div>
    </div>
  );
}
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingCart, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total } = useCart();
  const [couponCode, setCouponCode] = useState('');
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  return (
    <main>
      <Navbar />
      <div className="pt-16 md:pt-20"> {/* Add padding top to account for fixed navbar */}
        <div className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold">Shopping Cart</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-foreground">Cart</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
                        <div className="flex-shrink-0 w-full sm:w-24 h-24 relative rounded-md overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 96px"
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium">
                                <Link href={`/products/${item.product.slug}`} className="hover:text-primary transition-colors">
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.product.brand}
                              </p>
                            </div>
                            <p className="text-base font-bold">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground border border-border rounded-md disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <span className="text-lg">-</span>
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground border border-border rounded-md"
                                aria-label="Increase quantity"
                              >
                                <span className="text-lg">+</span>
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                    <Link href="/products" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                    <Button variant="ghost" className="mt-4 sm:mt-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                  <h2 className="text-lg font-bold">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping > 0 ? formatPrice(shipping) : 'Free'}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-4 text-xs text-center text-muted-foreground">
                      <p>Secure checkout powered by Stripe</p>
                      <p className="mt-1">
                        By proceeding, you agree to our 
                        <Link href="/terms" className="underline mx-1 hover:text-primary">
                          Terms of Service
                        </Link>
                        and 
                        <Link href="/privacy" className="underline mx-1 hover:text-primary">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link href="/products">
                  <Button size="lg">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import ProductActions from '@/components/product/ProductActions';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ChevronRight, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { getProducts } from '@/lib/db'  // or whatever returns your full list

// Next.js will statically emit one page per { slug }
export async function generateStaticParams() {
  const products = getProducts()
  return products.map((p: any) => ({
    slug: p.slug,
  }))
}
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  
  // Redirect if product not found
  if (!product) {
    redirect('/products');
  }
  
  // Get related products
  const relatedProducts = getRelatedProducts(product.id);
  
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
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link 
              href={`/products?category=${product.category.toLowerCase()}`} 
              className="hover:text-primary"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">{product.name}</span>
          </div>
          
          {/* Product details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product images */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-border">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square relative rounded-md overflow-hidden border border-border"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <Link 
                    href={`/products?brand=${product.brand.toLowerCase()}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {product.brand}
                  </Link>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discount && (
                    <Badge variant="destructive" className="ml-auto">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <p className="text-muted-foreground">{product.description}</p>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              {/* Stock status */}
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span>
                  {product.inStock 
                    ? "In Stock - Ready to Ship" 
                    : "Out of Stock - Sign up for notifications"
                  }
                </span>
              </div>
              
              {/* Add to cart actions */}
              <ProductActions product={product} />
              
              {/* Shipping and returns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-start space-x-2">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Free Shipping</h4>
                    <p className="text-xs text-muted-foreground">For orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Warranty</h4>
                    <p className="text-xs text-muted-foreground">1 year manufacturer warranty</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RefreshCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">30-Day Returns</h4>
                    <p className="text-xs text-muted-foreground">Hassle-free return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <Tabs defaultValue="specifications" className="mb-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Technical Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 border-b border-border py-2">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In the Box</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>{product.name}</li>
                    <li>User Manual</li>
                    <li>Warranty Card</li>
                    <li>Power Adapter (where applicable)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                <p className="text-muted-foreground mb-4">
                  This product has {product.reviewCount} reviews with an average rating of {product.rating}/5
                </p>
                <p className="text-sm">Reviews functionality will be implemented in a future update.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground">
                    We offer free standard shipping on all orders over $100. Orders under $100 have a flat shipping rate of $10.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
                    <li>Standard Shipping: 3-5 business days</li>
                    <li>Express Shipping: 1-2 business days (additional $15)</li>
                    <li>Same-day delivery available in select cities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Returns Policy</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day return policy on most items. To be eligible for a return, your item must be unused and in the same condition that you received it.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
                    <li>30-day return window from date of delivery</li>
                    <li>Free returns for defective products</li>
                    <li>Return shipping fees may apply for non-defective returns</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">You May Also Like</h2>
                <p className="text-muted-foreground mt-1">Similar products you might be interested in</p>
              </div>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Category, Brand } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductsFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string;
  selectedBrand?: string;
  selectedSort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  inStockOnly?: boolean;
}

export default function ProductsFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedSort = 'newest',
  inStockOnly = false,
}: ProductsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // State for mobile filters visibility
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  // Handle filter changes
  const updateFilters = (newParams: Record<string, string | null>) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Update params
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      
      router.push(`${pathname}?${params.toString()}`);
    });
  };
  
  // Generate clear filters URL
  const clearFiltersUrl = pathname;
  
  // Count active filters
  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    selectedSort !== 'newest' ? selectedSort : undefined,
    inStockOnly ? 'inStock' : undefined,
  ].filter(Boolean).length;
  
  return (
    <div className="space-y-4">
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </div>
      
      {/* Filter content - responsive */}
      <div className={`space-y-6 ${isFiltersVisible ? 'block' : 'hidden lg:block'}`}>
        {/* Filter header with clear button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-muted-foreground hover:text-foreground"
              onClick={() => router.push(clearFiltersUrl)}
            >
              Clear all
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Separator />
        
        {/* Categories filter */}
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="py-2">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all-categories"
                    checked={!selectedCategory}
                    onCheckedChange={() => updateFilters({ category: null })}
                  />
                  <Label htmlFor="all-categories" className="text-sm cursor-pointer">
                    All Categories
                  </Label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`}
                      checked={selectedCategory === category.slug}
                      onCheckedChange={() => updateFilters({ 
                        category: selectedCategory === category.slug ? null : category.slug 
                      })}
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Separator />
        
        {/* Brands filter */}
        <Accordion type="single" collapsible defaultValue="brands">
          <AccordionItem value="brands" className="border-none">
            <AccordionTrigger className="py-2">Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all-brands"
                    checked={!selectedBrand}
                    onCheckedChange={() => updateFilters({ brand: null })}
                  />
                  <Label htmlFor="all-brands" className="text-sm cursor-pointer">
                    All Brands
                  </Label>
                </div>
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand.id}`}
                      checked={selectedBrand === brand.slug}
                      onCheckedChange={() => updateFilters({ 
                        brand: selectedBrand === brand.slug ? null : brand.slug 
                      })}
                    />
                    <Label 
                      htmlFor={`brand-${brand.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Separator />
        
        {/* Availability filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => 
                updateFilters({ inStock: checked ? 'true' : null })
              }
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </div>
        
        <Separator />
        
        {/* Sort options */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Sort By</h3>
          <RadioGroup 
            value={selectedSort}
            onValueChange={(value) => 
              updateFilters({ 
                sort: value === 'newest' ? null : value 
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest" className="text-sm cursor-pointer">
                Newest
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular" className="text-sm cursor-pointer">
                Most Popular
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price_asc" id="price_asc" />
              <Label htmlFor="price_asc" className="text-sm cursor-pointer">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price_desc" id="price_desc" />
              <Label htmlFor="price_desc" className="text-sm cursor-pointer">
                Price: High to Low
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
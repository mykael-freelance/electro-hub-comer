"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingCart, User, Search, Menu, X, Moon, Sun, 
  Smartphone, Laptop, Headphones, Watch, Camera, Gamepad, 
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/lib/cart';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const { theme, setTheme } = useTheme();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll event to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Categories for the dropdown
  const categories = [
    { name: 'Smartphones', icon: Smartphone, href: '/products?category=smartphones' },
    { name: 'Laptops', icon: Laptop, href: '/products?category=laptops' },
    { name: 'Audio', icon: Headphones, href: '/products?category=audio' },
    { name: 'Wearables', icon: Watch, href: '/products?category=wearables' },
    { name: 'Cameras', icon: Camera, href: '/products?category=cameras' },
    { name: 'Gaming', icon: Gamepad, href: '/products?category=gaming' },
    { name: 'All Categories', icon: LayoutGrid, href: '/products' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-background shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">ElectroHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes('/products') ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href} className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href="/#" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/deals' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Deals
            </Link>
            
            <Link 
              href="/#" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/support' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Support
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search (hidden on small screens) */}
            <div className="hidden md:flex relative w-40 lg:w-64">
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 h-9 w-full"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Account dropdown (simple link on small screens) */}
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-primary rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex items-center mb-4">
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
              />
              <Search className="relative -ml-10 h-4 w-4 text-muted-foreground" />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <p className="text-sm font-medium text-muted-foreground mb-1">Categories</p>
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  href={category.href} 
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground pl-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Link>
              ))}
              
              <Link 
                href="/deals" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/deals' ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Deals
              </Link>
              
              <Link 
                href="/support" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/support' ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
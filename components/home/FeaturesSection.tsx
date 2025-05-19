import { Smartphone, ShieldCheck, Truck, RefreshCcw, Clock, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Latest Technology',
    description: 'Access to the newest and most innovative electronic devices on the market.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty Protection',
    description: 'All products come with manufacturer warranty and our additional protection plans.',
  },
  {
    icon: Truck,
    title: 'Fast & Free Delivery',
    description: 'Free shipping on orders over $100. Fast delivery to your doorstep.',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy for all purchases.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our customer service team is available around the clock to assist you.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Multiple payment options with industry-standard security protocols.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Shop With Us</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Experience the best in electronics shopping with our premium service features and customer-first approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
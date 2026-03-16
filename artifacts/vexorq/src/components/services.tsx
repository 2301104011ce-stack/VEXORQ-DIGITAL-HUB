import { motion } from "framer-motion";
import { 
  Building2, 
  ShoppingCart, 
  UserCircle, 
  AppWindow, 
  RefreshCw, 
  Palette, 
  Server, 
  Wrench 
} from "lucide-react";

const services = [
  { icon: Building2, title: "Business Website Development", desc: "Professional corporate websites that drive growth." },
  { icon: ShoppingCart, title: "E-Commerce Website Solutions", desc: "Scalable online stores with seamless checkout." },
  { icon: UserCircle, title: "Portfolio & Personal Websites", desc: "Showcase your work with stunning personal sites." },
  { icon: AppWindow, title: "Custom Web Applications", desc: "Complex, data-driven web apps tailored to your needs." },
  { icon: RefreshCw, title: "Website Redesign & Optimization", desc: "Breathe new life into your existing web presence." },
  { icon: Palette, title: "UI/UX Modern Interface Design", desc: "Beautiful, intuitive interfaces your users will love." },
  { icon: Server, title: "Hosting & Deployment Support", desc: "Reliable hosting setup and continuous deployment." },
  { icon: Wrench, title: "Annual Website Maintenance", desc: "Ongoing support to keep your site fast and secure." },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Web Services</h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions tailored for modern businesses. From concept to deployment, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl glass-card hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <service.icon size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

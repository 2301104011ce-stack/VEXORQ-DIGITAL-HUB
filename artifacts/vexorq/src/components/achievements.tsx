import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { CheckCircle2, TrendingUp, Globe, HeartHandshake, ExternalLink, Layout, ShoppingCart, Briefcase, Cpu, Palette } from "lucide-react";

function Counter({ from, to, suffix = "", duration = 2 }: { from: number; to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

const stats = [
  { icon: CheckCircle2, hasCounter: true, value: 1000, suffix: "+", label: "Successfully Delivered Projects", special: null },
  { icon: TrendingUp, hasCounter: false, value: null, suffix: "", label: "Trusted by Growing Businesses", special: "∞" },
  { icon: Globe, hasCounter: true, value: 10, suffix: "+", label: "Multi-Platform Web Technologies", special: null },
  { icon: HeartHandshake, hasCounter: true, value: 99, suffix: "%", label: "Customer Satisfaction Rate", special: null },
];

const deliveredProjects = [
  {
    icon: ShoppingCart,
    title: "ShopEase E-Commerce",
    type: "E-Commerce Website",
    description: "Full-featured online store with payment gateway, inventory management, and real-time order tracking for a retail brand.",
    tech: ["React", "Node.js", "Stripe"],
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    accent: "text-cyan-400",
  },
  {
    icon: Briefcase,
    title: "TechCorp Business Portal",
    type: "Business Website",
    description: "Professional corporate website with CMS integration, lead generation forms, and multi-language support for a B2B company.",
    tech: ["React", "Express", "PostgreSQL"],
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    accent: "text-violet-400",
  },
  {
    icon: Layout,
    title: "CreativeHub Portfolio",
    type: "Portfolio Website",
    description: "Animated personal portfolio for a designer with custom gallery, testimonials section, and contact integration.",
    tech: ["React", "Framer Motion", "Tailwind"],
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
    accent: "text-pink-400",
  },
  {
    icon: Cpu,
    title: "TaskFlow Web App",
    type: "Web Application",
    description: "Project management SaaS application with real-time collaboration, Kanban boards, and team role management.",
    tech: ["React", "WebSockets", "Drizzle ORM"],
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/20",
    accent: "text-emerald-400",
  },
  {
    icon: Palette,
    title: "StyleUp Brand Redesign",
    type: "Website Redesign",
    description: "Complete redesign of an outdated fashion brand website with modern UI/UX, page speed optimization, and SEO improvements.",
    tech: ["React", "Vite", "Tailwind"],
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    accent: "text-amber-400",
  },
  {
    icon: Globe,
    title: "HostPro Hosting Dashboard",
    type: "Web Application",
    description: "Hosting management dashboard with domain configuration, SSL tracking, resource monitoring, and billing automation.",
    tech: ["React", "Node.js", "PostgreSQL"],
    color: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/20",
    accent: "text-sky-400",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-white/5 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">

          {/* First card — Multiple Projects Accomplished */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Projects Accomplished</p>
            <div className="w-full space-y-2">
              {[
                { label: "Business Websites", count: "320+", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                { label: "E-Commerce Stores", count: "210+", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                { label: "Web Applications",  count: "180+", color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20" },
                { label: "Portfolios & Blogs", count: "150+", color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
                { label: "Redesign Projects",  count: "140+", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border ${item.bg} text-left`}
                >
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-bold ${item.color}`}>{item.count}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground font-medium mt-4 text-sm">Successfully Delivered Projects</p>
          </motion.div>

          {/* Remaining 3 stats */}
          {stats.slice(1).map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-display font-black text-white mb-2 tracking-tighter">
                {stat.hasCounter && stat.value !== null ? (
                  <Counter from={0} to={stat.value} suffix={stat.suffix} />
                ) : (
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.special}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Delivered Projects Showcase */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              1000+ Successfully <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Delivered Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              We have successfully built websites and web applications across industries — from business portals and e-commerce stores to portfolios and custom SaaS platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.color} p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-black/30 flex items-center justify-center`}>
                    <project.icon className={`w-5 h-5 ${project.accent}`} />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{project.title}</h3>
                <span className={`text-xs font-semibold uppercase tracking-wide ${project.accent} mb-3 block`}>{project.type}</span>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 right-5 text-xs text-muted-foreground/30 font-mono">✓ Delivered</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-muted-foreground text-sm">
              Showing a few highlights — our full portfolio spans <span className="text-primary font-semibold">1000+</span> completed projects across industries.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Founder, TechVentures Pvt. Ltd.",
    location: "Bangalore, India",
    rating: 5,
    review:
      "VEXORQ delivered our business website in just 7 days — faster than we ever expected. The design is clean, modern, and our clients love it. The annual maintenance plan gives us total peace of mind. Highly recommended!",
    project: "Business Website",
    avatar: "RK",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "Owner, StyleHub Fashion",
    location: "Mumbai, India",
    rating: 5,
    review:
      "We wanted an e-commerce store and VEXORQ built exactly what we envisioned. From choosing our own domain to setting up payments and hosting — they handled everything. Our sales went up 40% in the first month!",
    project: "E-Commerce Website",
    avatar: "PS",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Arjun Nair",
    role: "Freelance Designer",
    location: "Kochi, India",
    rating: 5,
    review:
      "I needed a stunning portfolio website to showcase my work. VEXORQ created a beautiful animated portfolio for me with my own custom domain. The whole experience was smooth and professional. 10/10!",
    project: "Portfolio Website",
    avatar: "AN",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Sneha Patel",
    role: "CEO, CloudMinds Solutions",
    location: "Ahmedabad, India",
    rating: 5,
    review:
      "Our web application had complex requirements — real-time data, user roles, dashboards. VEXORQ built it flawlessly. The team was responsive at every step and their annual maintenance keeps our app running at full speed.",
    project: "Web Application",
    avatar: "SP",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Mohammed Iqbal",
    role: "Director, GreenBuild Infra",
    location: "Hyderabad, India",
    rating: 5,
    review:
      "VEXORQ redesigned our outdated website and the result was incredible. Page speed improved dramatically and we now rank much better on Google. Their enquiry-based process was simple — fill the form, they call you, done!",
    project: "Website Redesign",
    avatar: "MI",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Divya Menon",
    role: "Co-Founder, EduLearn Platform",
    location: "Chennai, India",
    rating: 5,
    review:
      "We launched our EdTech platform with VEXORQ's help. They guided us from domain selection to deployment. The annual service plan is a great value — updates, performance checks, everything covered. Our students love the platform!",
    project: "Web Application",
    avatar: "DM",
    color: "from-sky-500 to-blue-600",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Trusted by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Growing Businesses</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Real reviews from real clients. We've helped businesses, freelancers, and startups build their digital presence — from websites to fully custom web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative flex flex-col bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-primary/30 hover:bg-white/5 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 shrink-0" />
              <p className="text-muted-foreground leading-relaxed text-sm flex-grow mb-6">
                "{review.review}"
              </p>
              <div className="mt-auto">
                <StarRating count={review.rating} />
                <div className="flex items-center gap-3 mt-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{review.name}</p>
                    <p className="text-muted-foreground text-xs">{review.role}</p>
                    <p className="text-muted-foreground/60 text-xs">{review.location}</p>
                  </div>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                    {review.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex -space-x-2">
              {["RK","PS","AN","SP"].map((av, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${reviews[i].color} flex items-center justify-center text-white text-xs font-bold border-2 border-background`}>
                  {av}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-white font-semibold">1000+ clients</span> trust VEXORQ for their web projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

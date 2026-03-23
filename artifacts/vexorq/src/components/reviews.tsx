import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  project: string;
  avatar: string;
  color: string;
};

const reviews: Review[] = [
  {
    name: "Verified Client 01",
    role: "Business Owner",
    location: "India",
    rating: 5,
    review: "Great communication, clear process, and timely delivery for our website launch.",
    project: "Business Website",
    avatar: "C1",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Verified Client 02",
    role: "Startup Founder",
    location: "India",
    rating: 5,
    review: "The team handled design and development smoothly and kept us updated throughout.",
    project: "Landing Page",
    avatar: "C2",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Verified Client 03",
    role: "Freelancer",
    location: "India",
    rating: 5,
    review: "Our portfolio website now looks professional and performs much better than before.",
    project: "Portfolio Website",
    avatar: "C3",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Verified Client 04",
    role: "Operations Lead",
    location: "India",
    rating: 5,
    review: "The solution matched our requirements and the support experience has been very reliable.",
    project: "Web Application",
    avatar: "C4",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Verified Client 05",
    role: "Marketing Manager",
    location: "India",
    rating: 5,
    review: "Performance and responsiveness improved after redesign, and the final result is clean.",
    project: "Website Redesign",
    avatar: "C5",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Verified Client 06",
    role: "Product Team",
    location: "India",
    rating: 5,
    review: "Launch support and post-delivery maintenance were handled quickly and professionally.",
    project: "Product Website",
    avatar: "C6",
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
              {reviews.slice(0, 4).map((review, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${reviews[i].color} flex items-center justify-center text-white text-xs font-bold border-2 border-background`}>
                  {review.avatar}
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
                <span className="text-white font-semibold">{reviews.length} clients</span> trust VEXORQ for their web projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How much time does website development take?",
    a: "Basic websites take around 5–10 days depending on project requirements. Complex web applications or e-commerce platforms may take longer based on specific features."
  },
  {
    q: "Do you provide maintenance support?",
    a: "Yes. We provide annual maintenance including security updates, performance monitoring, regular backups, and content updates."
  },
  {
    q: "Can you redesign existing websites?",
    a: "Yes. We provide modern redesign with better speed, improved UI/UX, and conversion-optimized layouts while preserving your existing SEO value."
  },
  {
    q: "Do you help in hosting and domain setup?",
    a: "Yes. We provide complete deployment support including domain registration, premium cloud hosting setup, SSL certificate installation, and CDN configuration."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white/[0.02] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our services and process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "border border-white/10 rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen ? "bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-white/20" : "bg-white/5 hover:bg-white/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300 shrink-0",
                    isOpen && "rotate-180 bg-primary/20 text-primary"
                  )}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

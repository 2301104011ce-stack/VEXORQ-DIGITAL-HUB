import { motion } from "framer-motion";
import { PhoneCall, Ear, ClipboardList, Code2, CheckCircle2, Rocket } from "lucide-react";

const workflowSteps = [
  {
    title: "Contact Client",
    description: "We connect with the client and align on the business goal.",
    icon: PhoneCall,
  },
  {
    title: "Listen to Requirements",
    description: "We listen carefully to understand exact requirements and expectations.",
    icon: Ear,
  },
  {
    title: "Planning",
    description: "We prepare the project roadmap, scope, and technical approach.",
    icon: ClipboardList,
  },
  {
    title: "Start Development",
    description: "We begin development with a clear structure and milestones.",
    icon: Code2,
  },
  {
    title: "Execute",
    description: "We execute, test, and refine each feature for production quality.",
    icon: CheckCircle2,
  },
  {
    title: "Deployment",
    description: "At the end, we deploy your solution and make it live.",
    icon: Rocket,
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Process</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">How We Work</h3>
          <p className="text-lg text-muted-foreground">
            A simple, transparent workflow from the first conversation to final deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative p-8 rounded-2xl glass-card hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-primary/80">
                    STEP {index + 1}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
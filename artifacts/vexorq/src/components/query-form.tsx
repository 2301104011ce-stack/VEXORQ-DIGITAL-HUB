import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useSubmitQuery } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  websiteType: z.string().min(1, "Please select a website type"),
  description: z.string().min(10, "Please provide more details about your project"),
});

type FormValues = z.infer<typeof formSchema>;

export function QueryForm() {
  const { toast } = useToast();
  const submitQueryMutation = useSubmitQuery();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await submitQueryMutation.mutateAsync({ data });
      setIsSuccess(true);
      toast({
        title: "Query Sent Successfully",
        description: "Our team will contact you shortly.",
        variant: "default",
      });
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="query" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Create Your <br/><span className="text-gradient">Website With Us</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Want to build your website? Drop your query below. Our team will review your requirement and contact you soon. 
              <br/><br/>
              Your query will be directly sent to our priority mailbox for immediate assessment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-10 rounded-3xl relative"
          >
            {isSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm rounded-3xl z-10 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-muted-foreground text-center max-w-[250px]">
                  We'll be in touch with you shortly to discuss your project.
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input
                    {...register("fullName")}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input
                    {...register("email")}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Website Type</label>
                  <div className="relative">
                    <select
                      {...register("websiteType")}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all [&>option]:bg-background"
                    >
                      <option value="">Select an option</option>
                      <option value="Business Website">Business Website</option>
                      <option value="E-Commerce Website">E-Commerce Website</option>
                      <option value="Portfolio Website">Portfolio Website</option>
                      <option value="Blog Website">Blog Website</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Website Redesign">Website Redesign</option>
                    </select>
                  </div>
                  {errors.websiteType && <p className="text-red-400 text-xs mt-1">{errors.websiteType.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Project Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Tell us about your requirements..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <Button type="submit" className="w-full h-14 text-lg mt-4" isLoading={submitQueryMutation.isPending || isSubmitting}>
                <Send className="mr-2 h-5 w-5" />
                Send Query
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

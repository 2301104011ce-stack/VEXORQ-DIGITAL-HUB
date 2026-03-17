import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Achievements } from "@/components/achievements";
import { Reviews } from "@/components/reviews";
import { QueryForm } from "@/components/query-form";
import { Faq } from "@/components/faq";
import { HowWeWork } from "@/components/how-we-work";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Achievements />
        <Reviews />
        <QueryForm />
        <Faq />
        <HowWeWork />
      </main>
      <Footer />
    </div>
  );
}

import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-black/40 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-md bg-background">
                  <span className="font-display font-bold text-xl text-white">V</span>
                </div>
              </div>
              <span className="font-display font-bold text-2xl tracking-wide">
                VEXORQ
              </span>
            </a>
            <p className="text-muted-foreground text-lg max-w-sm">
              Building Digital Future with Trust. We deliver scalable, high-performance web solutions that drive real business results.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide">Contact Support</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:d2684066@gmail.com">d2684066@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  QR.NO: IV-31/4<br />
                  Bhubaneswar – 751009<br />
                  Odisha, India
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#achievements" className="text-muted-foreground hover:text-primary transition-colors">Achievements</a></li>
              <li><a href="#query" className="text-muted-foreground hover:text-primary transition-colors">Start a Project</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2026 VEXORQ. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground/50">Designed with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

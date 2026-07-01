import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-4 lg:gap-16">
          <div>
            <Link href="/" className="text-lg font-black tracking-tight text-white">
              O2MackDrive
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
              Quality Cars. Smooth Deals. Easy Trade-Ins.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/cars" className="text-xs font-medium text-slate-400 hover:text-white">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/sell-trade" className="text-xs font-medium text-slate-400 hover:text-white">
                  Sell/Trade
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-xs font-medium text-slate-400 hover:text-white">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs font-medium text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-xs font-medium text-slate-400">
                Metro Manila, Philippines
              </li>
              <li>
                <a href="tel:+639170000000" className="text-xs font-medium text-slate-400 hover:text-white">
                  +63 917 000 0000
                </a>
              </li>
              <li>
                <a href="mailto:inquiries@o2mackdrive.example" className="text-xs font-medium text-slate-400 hover:text-white">
                  inquiries@o2mackdrive.example
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-xs font-medium text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs font-medium text-slate-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-[10px] text-slate-600">
              &copy; {new Date().getFullYear()} O2MackDrive Car Trading
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

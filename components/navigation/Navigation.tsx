"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Chrome as Home, Info, Zap, Users, Mail, Download } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = { icon: React.ComponentType<any>; label: string; href: string };

const MENU: MenuItem[] = [
  { icon: Home, label: "Home",            href: "/" },
  { icon: Info,  label: "Rewards",         href: "#reward-partners" },
  { icon: Zap,   label: "Community",       href: "#community-partners" },
  { icon: Users, label: "How It Works",    href: "#how-it-works" },
  { icon: Mail,  label: "Contact",         href: "#contact" },
];

export function Navigation({ locale }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [maxR, setMaxR] = useState(800);

  const btnRef  = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => setIsOpen(s => !s);

  // compute radius to cover panel
  useEffect(() => {
    const computeR = () => {
      const w = panelRef.current?.offsetWidth ?? 384;
      const h = window.innerHeight;
      setMaxR(Math.ceil(Math.hypot(w, h)) + 120);
    };
    computeR();
    window.addEventListener("resize", computeR);
    return () => window.removeEventListener("resize", computeR);
  }, []);

  // circle center = hamburger center, relative to panel
  const updateCenter = () => {
    if (!btnRef.current || !panelRef.current) return;
    const b = btnRef.current.getBoundingClientRect();
    const p = panelRef.current.getBoundingClientRect();
    setCx(b.left - p.left + b.width / 2);
    setCy(b.top  - p.top  + b.height / 2);
  };

  useLayoutEffect(() => {
    updateCenter();
    const onResize = () => updateCenter();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const bgVariants: Variants = {
    open:   { clipPath: `circle(${maxR}px at ${cx}px ${cy}px)`, transition: { type: "spring", stiffness: 28, damping: 12 } },
    closed: { clipPath: `circle(22px at ${cx}px ${cy}px)`,      transition: { type: "spring", stiffness: 320, damping: 40, delay: 0.1 } },
  };

  const listVariants: Variants = {
    open: { transition: { delayChildren: 0.16, staggerChildren: 0.06 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    open:   { y: 0,  opacity: 1, transition: { y: { stiffness: 900, velocity: -80 } } },
    closed: { y: 18, opacity: 0, transition: { y: { stiffness: 900 } } },
  };

  // Smoothly handle hash links without full reload
  const handleNav = async (href: string) => {
    setIsOpen(false);

    // External links: let the browser handle them
    if (/^https?:\/\//i.test(href)) {
      window.location.href = href;
      return;
    }

    // Hash-only links (in-page sections)
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      } else {
        // If element not on current route (e.g., we are not on the home page), push to route with hash
        const base = locale ? `/${locale}` : "";
        router.push(`${base}/${href}`);
      }
      return;
    }

    // Internal route (SPA)
    const base = locale ? `/${locale}` : "";
    router.push(`${base}${href === "/" ? "" : href}`);
  };

  return (
    <>
      {/* Toggle button with Path-based burger/X */}
      <motion.button
        ref={btnRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed top-6 right-6 z-[70] w-14 h-14 rounded-full flex items-center justify-center border border-white/30 bg-white/15 hover:bg-white/25 backdrop-blur-md transition-all duration-300 shadow-lg"
        whileTap={{ scale: 0.96 }}
      >
        <BurgerIcon isOpen={isOpen} />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={panelRef}
        aria-hidden={!isOpen}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 right-0 h-full w-80 md:w-96 z-[60] pointer-events-auto overflow-hidden"
      >
        <motion.div
          variants={bgVariants}
          className="absolute inset-0 bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900"
        >
          {/* content */}
          <div className="relative z-10 flex h-full flex-col">
            <header className="px-7 pt-24 pb-5 border-b border-white/10">
              {/* Use Link for the brand too */}
              <Link href={locale ? `/${locale}` : "/"} className="block">
                <h2 className="text-2xl font-bold text-white">Helpsta</h2>
                <p className="text-white/70 mt-1">Revolutionary Mobile Experience</p>
              </Link>
            </header>

            <motion.ul variants={listVariants} className="px-5 md:px-7 py-6 space-y-2">
              {MENU.map(({ icon: Icon, label, href }) => {
                const isHash = href.startsWith("#");
                const isActive =
                  (!isHash && href !== "/" && pathname?.startsWith(href)) ||
                  (href === "/" && pathname === (locale ? `/${locale}` : "/"));

                // For non-hash internal routes, still render Link so prefetch works.
                return (
                  <motion.li key={label} variants={itemVariants}>
                    {isHash ? (
                      <button
                        onClick={() => handleNav(href)}
                        className="w-full text-left group flex items-center gap-4 p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-orange-main transition-colors">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-lg font-medium">{label}</span>
                      </button>
                    ) : (
                      <Link
                        href={locale ? `/${locale}${href === "/" ? "" : href}` : href}
                        prefetch
                        onClick={(e) => {
                          // Close panel immediately; Next handles the SPA nav
                          setIsOpen(false);
                        }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300 ${isActive ? "bg-white/10" : ""}`}
                      >
                        <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-orange-main transition-colors">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-lg font-medium">{label}</span>
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mt-auto px-7 pb-8 pt-3 border-t border-white/10">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-orange-main hover:bg-gradient-app-main-1 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download App
              </button>
              <p className="text-white/50 text-sm text-center mt-4">© {year} Helpsta</p>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}

/* -------- Path-based hamburger/X from sample -------- */
function BurgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="text-white"
    >
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </motion.svg>
  );
}

function Path(props: any) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );
}

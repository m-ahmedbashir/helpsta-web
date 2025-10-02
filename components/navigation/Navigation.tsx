"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Chrome as Home, Info, Zap, Users, Mail, Download, HelpCircle, Building } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

type MenuItem = { icon: React.ComponentType<any>; labelKey: string; href: string };

export function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  
  const MENU: MenuItem[] = [
    { icon: Home, labelKey: "home",            href: "/" },
    { icon: Building, labelKey: "about",       href: "/about" },
    { icon: Info,  labelKey: "rewards",         href: "#reward-partners" },
    { icon: Zap,   labelKey: "community",       href: "#community-partners" },
    { icon: Users, labelKey: "howItWorks",    href: "#how-it-works" },
    { icon: HelpCircle, labelKey: "faq",       href: "/faq" },
    { icon: Mail,  labelKey: "contact",         href: "/contact" },
  ];
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

  // Simplified navigation handler
  const handleNav = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      // Hash links - scroll to element
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If not found, navigate to home with hash
        router.push(`/${locale}/${href}`);
      }
    }
  };

  // Get localized href for internal routes
  const getLocalizedHref = (href: string) => {
    if (href.startsWith("#")) return href; // Hash links stay as-is
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  };

  return (
    <>
      {/* Toggle button with Path-based burger/X */}
      <motion.button
        ref={btnRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed top-5 right-5 md:top-6 md:right-6 z-[70] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/30 bg-white/15 hover:bg-white/25 active:bg-white/35 backdrop-blur-md transition-all duration-300 shadow-lg"
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

      {/* Sidebar - Full screen on mobile, sidebar on desktop */}
      <motion.aside
        ref={panelRef}
        aria-hidden={!isOpen}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`fixed top-0 left-0 md:left-auto md:right-0 h-full w-full md:w-96 z-[60] overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div
          variants={bgVariants}
          className="absolute inset-0 bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900"
        >
          {/* content */}
          <div className="relative z-10 flex h-full flex-col">
            <header className="px-6 md:px-7 pt-20 md:pt-24 pb-6 md:pb-5 border-b border-white/10">
              {/* Use Link for the brand too */}
              <Link href={locale ? `/${locale}` : "/"} className="block text-center md:text-left">
                <img 
                  src="/logo-bg-none.png" 
                  alt="Helpsta Logo" 
                  className="h-8 md:h-10 w-auto mx-auto md:mx-0"
                />
              </Link>
            </header>

            <motion.ul variants={listVariants} className="flex-1 px-6 md:px-7 py-8 md:py-6 space-y-3 md:space-y-2 overflow-y-auto">
              {MENU.map(({ icon: Icon, labelKey, href }) => {
                const label = t(labelKey);
                const isHash = href.startsWith("#");
                const localizedHref = getLocalizedHref(href);
                const isActive = pathname === localizedHref || 
                  (href !== "/" && pathname?.startsWith(localizedHref));

                const linkProps = {
                  className: `group flex items-center gap-4 md:gap-4 p-5 md:p-4 rounded-xl text-white hover:bg-white/10 active:bg-white/20 transition-all duration-300 ${isActive ? "bg-white/10" : ""}`,
                  children: (
                    <>
                      <span className="grid place-items-center w-12 h-12 md:w-10 md:h-10 rounded-lg bg-white/10 group-hover:bg-orange-main transition-colors">
                        <Icon className="w-6 h-6 md:w-5 md:h-5" />
                      </span>
                      <span className="text-xl md:text-lg font-medium">{label}</span>
                    </>
                  )
                };

                return (
                  <motion.li key={labelKey} variants={itemVariants}>
                    {isHash ? (
                      <button
                        onClick={() => handleNav(href)}
                        className={linkProps.className.replace('group', 'w-full text-left group')}
                      >
                        {linkProps.children}
                      </button>
                    ) : (
                      <Link
                        href={localizedHref}
                        onClick={() => setIsOpen(false)}
                        {...linkProps}
                      >
                        {linkProps.children}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

          
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Compass, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";
import type { NavItem, SearchItem } from "@/types";

interface HeaderClientProps {
  nav: NavItem[];
  searchItems: SearchItem[];
  siteName: string;
}

export function HeaderClient({ nav, searchItems, siteName }: HeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      <header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "glass shadow-soft" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4 md:h-[72px]">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${siteName} — home`}>
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-transform duration-300 group-hover:-rotate-6">
              <Compass className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-[17px] font-bold tracking-tight">
              {siteName.split(" ")[0]}
              <span className="text-primary">{siteName.split(" ").length > 1 ? ` ${siteName.split(" ").slice(1).join(" ")}` : ""}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.children?.length ? (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  {/* Mega menu */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="glass shadow-lift overflow-hidden rounded-2xl p-2">
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="group/item rounded-xl p-3.5 transition-colors hover:bg-secondary"
                          >
                            <span className="block text-sm font-semibold text-foreground group-hover/item:text-primary">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-1 rounded-xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-4 py-3">
                        <Link href="/contact" className="text-[13px] font-semibold text-primary hover:underline">
                          Not sure where to start? Let's talk →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search (⌘K)"
              className="hidden items-center gap-2 rounded-full border border-input bg-card/60 px-3.5 py-2 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground md:flex"
            >
              <Search className="size-4" />
              <span>Search</span>
              <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
            </button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search />
            </Button>
            <ThemeToggle />
            <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
              <Link href="/contact">Start a project</Link>
            </Button>
            <div className="lg:hidden">
              <MobileNav nav={nav} trigger={<Menu className="size-5" />} />
            </div>
          </div>
        </div>

        {/* scroll progress */}
        <AnimatePresence>{scrolled && <ScrollProgress key="sp" />}</AnimatePresence>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={searchItems} />
      <div className="h-16 md:h-[72px]" aria-hidden />
    </>
  );
}

function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setW(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.div
      className="h-[2px] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: w / 100 }}
      style={{ transformOrigin: "left" }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear", duration: 0.05 }}
    />
  );
}

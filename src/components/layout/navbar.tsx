"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command as CommandIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "./theme-toggle";
import { OPEN_COMMAND_EVENT } from "./command-menu";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Sharafat Ali — home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_var(--signal-glow)] transition-transform group-hover:scale-105">
        <span className="font-display text-sm font-bold">SA</span>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-semibold tracking-tight">Sharafat Ali</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
          Full-Stack Engineer
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const sectionIds = React.useMemo(
    () => navItems.filter((n) => n.sectionId).map((n) => n.sectionId as string),
    [],
  );
  const activeSection = useActiveSection(isHome ? sectionIds : []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (label: string, href: string, sectionId?: string) => {
    if (!isHome) {
      if (label === "Blog") return pathname.startsWith("/blog");
      return false;
    }
    return sectionId ? activeSection === sectionId : false;
  };

  const openCommand = () => window.dispatchEvent(new Event(OPEN_COMMAND_EVENT));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4",
              scrolled
                ? "glass card-elevated"
                : "border border-transparent",
            )}
          >
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {navItems.map((item) => {
                const active = isActive(item.label, item.href, item.sectionId);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCommand}
                aria-label="Open command menu"
                className="hidden items-center gap-2 rounded-full border border-border bg-secondary/40 py-2 pl-3 pr-2 text-sm text-muted-foreground transition-colors hover:bg-secondary md:flex"
              >
                <CommandIcon className="size-3.5" />
                <span className="text-xs">Search</span>
                <kbd className="rounded border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[0.6rem]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <Link href="/#contact" className="hidden sm:block">
                <Button size="sm" className="h-10">
                  Start a project
                </Button>
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[min(360px,88vw)] flex-col border-l border-border bg-card p-6"
              variants={{
                open: { x: 0, transition: { type: "spring", stiffness: 320, damping: 34 } },
                closed: { x: "100%", transition: { duration: 0.25 } },
              }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.05 } }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium text-foreground/90 transition-colors hover:bg-secondary"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Link href="/#contact" onClick={() => setOpen(false)}>
                  <Button className="w-full" size="lg">
                    Start a project
                  </Button>
                </Link>
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full" size="lg">
                    Download resume
                  </Button>
                </a>
                <p className="pt-2 text-center font-mono text-xs text-muted-foreground">
                  {siteConfig.availability}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Notebook,
  Search,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { projects } from "@/lib/data/projects";
import { siteConfig, navItems } from "@/lib/site";

export const OPEN_COMMAND_EVENT = "open-command-menu";

type PostLink = { slug: string; title: string };

export function CommandMenu({ posts = [] }: { posts?: PostLink[] }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, []);

  const run = React.useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog close before navigating
    requestAnimationFrame(fn);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[200] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in"
      contentClassName="fixed left-1/2 top-[16%] z-[201] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/40 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <Command.Input
          placeholder="Search projects, articles, actions…"
          className="h-13 w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:inline">
          ESC
        </kbd>
      </div>
      <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto overscroll-contain p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Group heading="Navigate">
              <Item onSelect={() => run(() => router.push("/"))} icon={Home}>
                Home
              </Item>
              {navItems.map((n) => (
                <Item key={n.href} onSelect={() => run(() => router.push(n.href))} icon={iconFor(n.label)}>
                  {n.label}
                </Item>
              ))}
            </Group>

            <Group heading="Case studies">
              {projects.map((p) => (
                <Item
                  key={p.slug}
                  onSelect={() => run(() => router.push(`/work/${p.slug}`))}
                  icon={Briefcase}
                  meta={p.industry}
                >
                  {p.name}
                </Item>
              ))}
            </Group>

            {posts.length > 0 && (
              <Group heading="Articles">
                {posts.map((p) => (
                  <Item
                    key={p.slug}
                    onSelect={() => run(() => router.push(`/blog/${p.slug}`))}
                    icon={FileText}
                  >
                    {p.title}
                  </Item>
                ))}
              </Group>
            )}

            <Group heading="Actions">
              <Item onSelect={() => run(() => router.push("/#contact"))} icon={Sparkles}>
                Start your project
              </Item>
              <Item
                onSelect={() => run(() => window.open(siteConfig.resumeUrl, "_blank"))}
                icon={FileText}
              >
                Download resume
              </Item>
              <Item onSelect={() => run(() => setTheme("light"))} icon={Sun}>
                Switch to light theme
              </Item>
              <Item onSelect={() => run(() => setTheme("dark"))} icon={Moon}>
                Switch to dark theme
              </Item>
            </Group>

            <Group heading="Connect">
              <Item
                onSelect={() => run(() => window.open(siteConfig.links.github, "_blank"))}
                icon={Github}
                external
              >
                GitHub
              </Item>
              <Item
                onSelect={() => run(() => window.open(siteConfig.links.linkedin, "_blank"))}
                icon={Linkedin}
                external
              >
                LinkedIn
              </Item>
              <Item
                onSelect={() => run(() => window.open(siteConfig.links.email, "_self"))}
                icon={Mail}
              >
                Email me
              </Item>
            </Group>
          </Command.List>
    </Command.Dialog>
  );
}

function iconFor(label: string) {
  if (label === "Work") return Briefcase;
  if (label === "Blog") return Notebook;
  if (label === "Services") return Wrench;
  if (label === "Contact") return Mail;
  return Home;
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
  icon: Icon,
  meta,
  external,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  meta?: string;
  external?: boolean;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm text-foreground/90 transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span className="flex-1">{children}</span>
      {meta && <span className="font-mono text-[0.65rem] text-muted-foreground">{meta}</span>}
      {external && <ArrowUpRight className="size-3.5 text-muted-foreground" />}
    </Command.Item>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import type { ReactNode } from "react";

export function MobileNav({ nav, trigger }: { nav: NavItem[]; trigger: ReactNode }) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto p-6">
        <SheetTitle className="sr-only">Site menu</SheetTitle>
        <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
          {nav.map((item) =>
            item.children?.length ? (
              <Accordion key={item.label} type="single" collapsible>
                <AccordionItem value={item.label} className="border-b-0">
                  <AccordionTrigger className="py-3 text-base hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-0.5 pb-2">
                      <Link href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-secondary">
                        All {item.label}
                      </Link>
                      {item.children.map((child) => (
                        <SheetClose asChild key={child.href + child.label}>
                          <Link
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-lg py-3 font-display text-base font-semibold",
                    pathname === item.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ),
          )}
        </nav>
        <SheetClose asChild>
          <Button asChild className="mt-6 w-full">
            <Link href="/contact">Start a project</Link>
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

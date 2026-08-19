"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Award, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/shared/counter";
import type { HomeContent, SiteSettings } from "@/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Animated home hero: headline, CTAs, portrait card and stat counters. */
export function Hero({ home, settings }: { home: HomeContent; settings: SiteSettings }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* atmosphere */}
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(75%_60%_at_50%_30%,black,transparent)]" aria-hidden />
      <div className="absolute -top-24 right-[-10%] size-[520px] rounded-full bg-brand-500/12 blur-[140px]" aria-hidden />
      <div className="absolute -left-40 bottom-0 size-[420px] rounded-full bg-steel-500/10 blur-[130px]" aria-hidden />

      <div className="container-shell relative grid gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div variants={reduce ? undefined : container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Badge variant="steel" className="normal-case tracking-[0.18em]">
              {home.eyebrow}
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-[4.5rem]"
          >
            {home.headline.slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{home.headline[home.headline.length - 1]}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
            {home.subline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={home.primaryCta.href}>
                {home.primaryCta.label} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={home.secondaryCta.href}>{home.secondaryCta.label}</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={item}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4"
          >
            {home.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[108px] flex-col justify-between border-l-2 border-primary/40 pl-4"
              >
                <dt className="max-w-[150px] text-[12.5px] font-medium leading-5 text-muted-foreground">
                  {stat.label}
                </dt>

                <dd className="font-display text-3xl font-bold leading-none tracking-tight sm:text-[2rem]">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Portrait card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <Image
              src="/images/portrait-dp.jpg"
              alt={`${settings.person} — ${settings.role} on site`}
              width={900}
              height={1100}
              priority
              className="aspect-[4/5] w-full object-cover"
              sizes="(min-width: 1024px) 42vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 via-transparent to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-display text-lg font-bold text-white">{settings.person}</p>
              <p className="text-[13px] text-white/80">{settings.role}</p>
            </div>
          </div>

          {/* floating chips */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-4 top-10 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift sm:flex"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-forest-500/15 text-forest-600 dark:text-forest-200">
              <ShieldCheck className="size-5" />
            </span>
            <span>
              <span className="block text-[13px] font-bold leading-tight">Geoinformatic’s Engineering</span>
              <span className="block text-[11.5px] text-muted-foreground">M.A.K.A.U.T | 2025</span>
            </span>
          </motion.div>

          <motion.div
            animate={reduce ? undefined : { y: [0, 9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="glass absolute -right-3 bottom-24 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift sm:flex"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <Award className="size-5" />
            </span>
            <span>
              <span className="block text-[13px] font-bold leading-tight">Civil Engineering</span>
              <span className="block text-[11.5px] text-muted-foreground">M.A.K.A.U.T | 2023</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#trusted"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary md:block"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDownRight className="size-5 rotate-45" />
      </motion.a>
    </section>
  );
}

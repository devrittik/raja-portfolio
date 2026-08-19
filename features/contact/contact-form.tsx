"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const contactSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("That email doesn't look right"),
  organization: z.string().optional(),
  projectType: z.string().min(1, "Pick the closest match"),
  engagementType: z.string().optional(),
  message: z.string().min(20, "Give me at least a couple of lines about the project"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const projectTypes = [
  "Civil engineering",
  "Construction / site engineering",
  "GIS / geospatial work",
  "Surveying / field data",
  "Property valuation / inspection",
  "Urban & regional planning",
  "GeoAI / emerging technology",
  "Other",
];

const engagementTypes = [
  "Project / freelance work",
  "Technical consultation",
  "Professional collaboration",
  "Research / academic collaboration",
  "Employment opportunity",
  "Other",
];

/** Validated enquiry form posting to /api/contact. */
export function ContactForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: "" },
  });

  const projectType = watch("projectType");
  const engagementType = watch("engagementType");

  async function onSubmit(values: ContactFormValues) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) setDone(true);
  }

  if (done) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-forest-500/30 bg-forest-500/5 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-forest-500/15 text-forest-600 dark:text-forest-200">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold">Message received.</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you — an engineer (not a bot) will reply within one working day. For anything urgent,
          WhatsApp is fastest.
        </p>
      </div>
    );
  }

  const chip = (active: boolean) =>
    cn(
      "cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
      active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" autoComplete="name" placeholder="Priya Sharma" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email *</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="priya@company.com" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organisation</Label>
        <Input id="organization" autoComplete="organization" placeholder="Company / authority (optional)" {...register("organization")} />
      </div>

      <div className="space-y-2">
        <Label>What are we engineering? *</Label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project type">
          {projectTypes.map((t) => (
            <button type="button" key={t} onClick={() => setValue("projectType", t, { shouldValidate: true })} className={chip(projectType === t)} aria-pressed={projectType === t}>
              {t}
            </button>
          ))}
        </div>
        {errors.projectType && <p className="text-xs text-destructive">{errors.projectType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Engagement Types</Label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Types of Engagement">
          {engagementTypes.map((et) => (
            <button type="button" key={et} onClick={() => setValue("engagementType", et)} className={chip(engagementType === et)} aria-pressed={engagementType === et}>
              {et}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">The project *</Label>
        <Textarea
          id="message"
          placeholder="Site, scope, current stage, and what good looks like to you…"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
      <p className="text-[12px] text-muted-foreground">
        I’ll aim to respond within one working day. Your information is used only to respond to your enquiry.
      </p>
    </form>
  );
}

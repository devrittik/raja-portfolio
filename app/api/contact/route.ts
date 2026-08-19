import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(20),
});

/**
 * POST /api/contact
 * Validates the enquiry, delivers via Resend when RESEND_API_KEY is set,
 * otherwise records it server-side (hook a webhook/crm here if you prefer).
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.issues }, { status: 422 });
  }

  const body = parsed.data;
  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;

  if (RESEND_API_KEY && CONTACT_TO) {
    const html = `
      <h2>New project enquiry</h2>
      <table cellpadding="6" style="font-family:system-ui;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(body.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(body.email)}</td></tr>
        <tr><td><strong>Organisation</strong></td><td>${escapeHtml(body.organization || "—")}</td></tr>
        <tr><td><strong>Project type</strong></td><td>${escapeHtml(body.projectType)}</td></tr>
        <tr><td><strong>Budget</strong></td><td>${escapeHtml(body.budget || "—")}</td></tr>
      </table>
      <p style="font-family:system-ui;font-size:14px;white-space:pre-wrap">${escapeHtml(body.message)}</p>`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: [CONTACT_TO],
          reply_to: body.email,
          subject: `Enquiry — ${body.projectType} — ${body.name}`,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
      return NextResponse.json({ ok: true, delivered: "email" });
    } catch (err) {
      console.error("[contact] delivery failed", err);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  }

  console.info("[contact] enquiry recorded (email delivery not configured)", {
    name: body.name,
    email: body.email,
    projectType: body.projectType,
  });
  return NextResponse.json({ ok: true, delivered: "log" });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

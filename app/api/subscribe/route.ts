import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

/**
 * POST /api/subscribe
 * Newsletter capture. Plug in your provider (Resend Audiences, Mailchimp,
 * Buttondown…) where indicated — validation + consent trail included.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
  }

  const { email } = parsed.data;

  // TODO: forward to your email provider here, e.g.:
  // await fetch("https://api.resend.com/audiences/<id>/contacts", { ... });
  console.info(`[newsletter] new subscriber: ${email}`);

  return NextResponse.json({ ok: true });
}

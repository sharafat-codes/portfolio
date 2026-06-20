import { NextResponse } from "next/server";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, projectType, budget, timeline, details } = body;

  if (!name || !email || !projectType || !budget || !timeline || !details) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 422 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 422 });
  }

  // A real deployment would forward this to email / CRM / a database here.
  // Logging keeps the endpoint functional and easy to extend.
  console.info("[contact] new project inquiry", {
    name,
    email,
    company: body.company,
    projectType,
    budget,
    timeline,
  });

  return NextResponse.json({ ok: true });
}

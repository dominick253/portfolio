import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the contact submission (in production, send to email or DB)
    console.log(`[Contact] From: ${name} <${email}>`);
    console.log(`[Contact] Message: ${message.substring(0, 200)}...`);

    // TODO: Add your email sending logic here
    // e.g., SendGrid, Resend, or save to SQLite
    // For now we store to a local JSON file
    const fs = await import("fs/promises");
    const path = await import("path");
    const dataDir = path.join(process.cwd(), "data");

    try {
      await fs.mkdir(dataDir, { recursive: true });
      const contactEntry = {
        id: Date.now().toString(),
        name,
        email,
        message,
        date: new Date().toISOString(),
      };
      const filePath = path.join(dataDir, "contacts.json");
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        existing = JSON.parse(raw);
      } catch {
        // File doesn't exist yet
      }
      existing.push(contactEntry);
      await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
    } catch (err) {
      console.error("[Contact] Storage error:", err);
      // Non-blocking — don't fail the response
    }

    return NextResponse.json(
      { success: true, message: "Message received! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }
}

// Rate limit: simple in-memory limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function GET() {
  return NextResponse.json(
    { message: "Contact API is running. Send a POST request." },
    { status: 200 }
  );
}

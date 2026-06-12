import { NextRequest, NextResponse } from "next/server";
import { createRsvp, deleteRsvp, getRsvps } from "../../../lib/rsvp-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getRsvps());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const guestName = String(body.guestName ?? "").trim();
  const guestCount = Number(body.guestCount);

  if (!guestName) {
    return NextResponse.json({ error: "Guest name is required." }, { status: 400 });
  }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
    return NextResponse.json({ error: "Guest count must be between 1 and 20." }, { status: 400 });
  }

  return NextResponse.json(createRsvp(guestName, guestCount), { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  if (!deleteRsvp(String(body.id ?? ""))) {
    return NextResponse.json({ error: "RSVP not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

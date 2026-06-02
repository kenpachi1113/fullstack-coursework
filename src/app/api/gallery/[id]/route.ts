import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value === "admin";
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  await db.updateGalleryItem(Number(id), data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.deleteGalleryItem(Number(id));
  return NextResponse.json({ ok: true });
}

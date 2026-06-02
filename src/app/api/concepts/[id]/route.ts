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
  await db.updateConcept(Number(id), await req.json());
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.deleteConcept(Number(id));
  return NextResponse.json({ ok: true });
}

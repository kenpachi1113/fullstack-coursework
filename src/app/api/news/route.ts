import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value === "admin";
}

export async function GET() {
  const store = await db.getAll();
  return NextResponse.json(store.news);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const item = await db.createNews(data);
  return NextResponse.json(item, { status: 201 });
}

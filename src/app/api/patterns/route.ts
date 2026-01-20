import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const patterns = await prisma.pattern.findMany({
    select: { id: true, slug: true, name: true, description: true, _count: { select: { challenges: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(patterns);
}

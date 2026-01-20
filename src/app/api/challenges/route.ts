import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const patternSlug = searchParams.get("pattern");
  const where = patternSlug ? { pattern: { slug: patternSlug } } : undefined;
  const challenges = await prisma.challenge.findMany({
    where,
    select: { id: true, slug: true, title: true, difficulty: true, pattern: { select: { slug: true, name: true } } },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(challenges);
}

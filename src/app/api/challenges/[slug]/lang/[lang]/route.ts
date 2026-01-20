import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params { params: Promise<{ slug: string; lang: string }> }

export async function GET(_: Request, { params }: Params) {
  const { slug, lang } = await params;
  const challenge = await prisma.challenge.findUnique({ where: { slug }, select: { id: true } });
  if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  const variant = await prisma.languageVariant.findUnique({
    where: { challengeId_language: { challengeId: challenge.id, language: lang } },
    select: { id: true, language: true, starterFiles: true, harnessFiles: true, hints: true, runtime: true, version: true },
  });
  if (!variant) return NextResponse.json({ error: "Language variant not found" }, { status: 404 });
  return NextResponse.json(variant);
}

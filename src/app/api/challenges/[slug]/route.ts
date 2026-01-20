import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params { params: { slug: string } }

export async function GET(_: Request, { params }: Params) {
  const { slug } = params;
  const challenge = await prisma.challenge.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      difficulty: true,
      pattern: { select: { slug: true, name: true } },
      languageVariants: { select: { id: true, language: true, runtime: true, version: true } },
    },
  });
  if (!challenge) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(challenge);
}

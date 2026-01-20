import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const BodySchema = z.object({
  languageVariantId: z.string(),
  code: z.string().max(200_000),
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { languageVariantId, code } = parsed.data;
  const variant = await prisma.languageVariant.findUnique({ where: { id: languageVariantId }, select: { id: true } });
  if (!variant) return NextResponse.json({ error: "Variant not found" }, { status: 404 });

  const submission = await prisma.submission.create({
    data: { languageVariantId, code, status: "pending" },
  });

  // MVP: Immediately mark as error; client-side Sandpack runs tests for now.
  return NextResponse.json({ id: submission.id, status: submission.status });
}

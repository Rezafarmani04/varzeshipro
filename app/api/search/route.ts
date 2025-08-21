import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    select: { id: true, name: true, image: true },
    take: 5,
  });

  const brands = await prisma.brand.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    select: { id: true, name: true, logo: true },
    take: 5,
  });

  const formatted = [
    ...products.map((p) => ({
      id: `product-${p.id}`,
      title: p.name,
      image: p.image,
      type: "محصول",
      url: `/products/${p.id}`,
    })),
    ...brands.map((b) => ({
      id: `brand-${b.id}`,
      title: b.name,
      image: b.logo,
      type: "برند",
      url: `/brands/${b.id}`,
    })),
  ];

  return NextResponse.json(formatted);
}

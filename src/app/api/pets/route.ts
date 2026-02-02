import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pets = await prisma.pet.findMany({
    where: { userId: (session.user as any).id },
    include: {
      _count: {
        select: {
          vetVisits: true,
          medications: true,
          photos: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(pets)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  const pet = await prisma.pet.create({
    data: {
      ...body,
      userId: (session.user as any).id,
    },
  })

  return NextResponse.json(pet)
}

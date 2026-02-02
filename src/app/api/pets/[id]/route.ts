import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  const { id } = await params
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pet = await prisma.pet.findFirst({
    where: { 
      id,
      userId: (session.user as any).id 
    },
    include: {
      vetVisits: { orderBy: { visitDate: "desc" }, take: 5 },
      medications: { where: { isActive: true } },
      feedingSchedules: { where: { isActive: true } },
      photos: { orderBy: { createdAt: "desc" }, take: 10 },
      healthRecords: { orderBy: { recordDate: "desc" }, take: 10 },
    },
  })

  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 })
  }

  return NextResponse.json(pet)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  const { id } = await params
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  const pet = await prisma.pet.updateMany({
    where: { 
      id,
      userId: (session.user as any).id 
    },
    data: body,
  })

  return NextResponse.json(pet)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  const { id } = await params
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await prisma.pet.deleteMany({
    where: { 
      id,
      userId: (session.user as any).id 
    },
  })

  return NextResponse.json({ success: true })
}

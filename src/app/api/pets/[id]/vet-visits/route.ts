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

  const visits = await prisma.vetVisit.findMany({
    where: { petId: id },
    orderBy: { visitDate: "desc" },
  })

  return NextResponse.json(visits)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  const { id } = await params
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  const visit = await prisma.vetVisit.create({
    data: {
      ...body,
      petId: id,
      visitDate: new Date(body.visitDate),
      nextVisit: body.nextVisit ? new Date(body.nextVisit) : null,
    },
  })

  return NextResponse.json(visit)
}

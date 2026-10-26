import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const pendingProducts = await prisma.product.findMany({
      where: { status: 'pending' },
      take: 10,
      include: {
        vendor: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json({
      pendingCount: pendingProducts.length,
      pendingProducts
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

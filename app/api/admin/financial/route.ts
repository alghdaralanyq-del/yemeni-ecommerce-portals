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

    const transactions = await prisma.financialTransaction.findMany({
      where: {
        settlementStatus: 'settled'
      }
    })

    const totalSales = transactions.reduce((sum, t) => sum + t.orderAmount, 0)
    const platformFees = transactions.reduce((sum, t) => sum + t.platformFee, 0)

    return NextResponse.json({
      totalSales,
      platformFees,
      netEarnings: totalSales - platformFees
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch financial data' },
      { status: 500 }
    )
  }
}

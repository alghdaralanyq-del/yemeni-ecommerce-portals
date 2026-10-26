import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        customerId: session.user.id
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { customerName, customerPhone, customerAddress } = body

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Group items by vendor (simplified: all items from first vendor)
    const vendorId = cart.items[0].product.vendorId
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.basePrice * item.quantity,
      0
    )

    // Create order
    const order = await prisma.order.create({
      data: {
        vendorId,
        customerId: session.user.id,
        totalAmount,
        status: 'pending',
        customerName,
        customerPhone,
        customerAddress,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            productName: item.product.name,
            productNameAr: item.product.nameAr,
            quantity: item.quantity,
            price: item.product.basePrice
          }))
        }
      }
    })

    // Create financial transaction
    const platformFee = Math.round(totalAmount * 0.03)
    const netAmount = totalAmount - platformFee

    await prisma.financialTransaction.create({
      data: {
        vendorId,
        orderId: order.id,
        orderAmount: totalAmount,
        platformFee,
        netAmount,
        walletProvider: 'other',
        walletNumber: customerPhone,
        settlementStatus: 'pending'
      }
    })

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123password', 10)
  const vendorPassword = await bcrypt.hash('vendor123password', 10)
  const customerPassword = await bcrypt.hash('customer123', 10)

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yemenmarket.com' },
    update: {},
    create: {
      name: 'مدير النظام',
      email: 'admin@yemenmarket.com',
      phone: '+967777777777',
      password: adminPassword,
      role: 'admin',
      status: 'active',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create Vendor User
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@yemenmarket.com' },
    update: {},
    create: {
      name: 'مدير المتجر',
      email: 'vendor@yemenmarket.com',
      phone: '+967777777778',
      password: vendorPassword,
      role: 'vendor',
      status: 'active',
      emailVerified: new Date(),
    },
  })

  // Create Vendor
  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      name: 'متجر تيقن الرئيسي',
      nameAr: 'متجر تيقن الرئيسي',
      walletProvider: 'alkuraimi',
      walletNumber: '+967777777778',
      status: 'active',
    },
  })

  console.log('✅ Vendor user created:', vendorUser.email)

  // Create Customer User
  const customer = await prisma.user.upsert({
    where: { email: 'customer@yemenmarket.com' },
    update: {},
    create: {
      name: 'عميل تجريبي',
      email: 'customer@yemenmarket.com',
      phone: '+967777777779',
      password: customerPassword,
      role: 'customer',
      status: 'active',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Customer user created:', customer.email)

  // Create Categories
  const electronics = await prisma.category.upsert({
    where: { id: 'cat-electronics' },
    update: {},
    create: {
      id: 'cat-electronics',
      name: 'Electronics',
      nameAr: 'إلكترونيات',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { id: 'cat-clothing' },
    update: {},
    create: {
      id: 'cat-clothing',
      name: 'Clothing',
      nameAr: 'ملابس',
    },
  })

  console.log('✅ Categories created')

  // Create Sample Products
  const product1 = await prisma.product.create({
    data: {
      vendorId: vendor.id,
      name: 'Smartphone Pro',
      nameAr: 'هاتف ذكي برو',
      description: 'Latest smartphone with advanced features',
      descriptionAr: 'أحدث هاتف ذكي بميزات متقدمة',
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1234567890/phone1.jpg',
        'https://res.cloudinary.com/demo/image/upload/v1234567890/phone2.jpg',
      ],
      basePrice: 250000, // 250,000 YER
      category: 'Electronics',
      status: 'approved',
      inventoryStatus: 'in_stock',
    },
  })

  const product2 = await prisma.product.create({
    data: {
      vendorId: vendor.id,
      name: 'Cotton T-Shirt',
      nameAr: 'تيشيرت قطني',
      description: 'Comfortable cotton t-shirt for daily wear',
      descriptionAr: 'تيشيرت قطني مريح للاستخدام اليومي',
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1234567890/tshirt1.jpg',
      ],
      basePrice: 15000, // 15,000 YER
      category: 'Clothing',
      status: 'approved',
      inventoryStatus: 'in_stock',
    },
  })

  console.log('✅ Sample products created')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

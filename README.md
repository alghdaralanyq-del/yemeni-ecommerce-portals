# Yemeni Multi-Vendor E-commerce Platform

منصة تجارة إلكترونية متعددة المتاجر لليمن

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Image Upload**: Cloudinary
- **Email**: SendGrid
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Formatting**: date-fns
- **Testing**: Jest + React Testing Library
- **i18n**: next-intl (Arabic/English)
- **Export**: XLSX & CSV

## Project Structure

```
abdouuu/
├── app/
│   ├── admin/              # Admin Portal
│   │   ├── page.tsx        # Admin Dashboard
│   │   ├── moderation/     # Product Moderation
│   │   ├── financial/      # Financial Reports
│   │   ├── users/          # User Management
│   │   └── layout.tsx      # Admin Layout
│   ├── vendor/             # Vendor Portal
│   │   ├── page.tsx        # Vendor Dashboard
│   │   ├── products/       # Product Management
│   │   ├── orders/         # Order Management
│   │   ├── analytics/      # Financial Analytics
│   │   └── layout.tsx      # Vendor Layout
│   ├── customer/           # Customer Portal (NEW)
│   │   ├── page.tsx        # Browse Products
│   │   ├── cart/           # Shopping Cart
│   │   ├── orders/         # Order History
│   │   └── layout.tsx      # Customer Layout
│   ├── login/              # Login Page (NEW)
│   ├── api/                # API Routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── products/       # Product CRUD
│   │   ├── cart/           # Cart management
│   │   ├── orders/         # Order management
│   │   └── admin/          # Admin APIs
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Home Page
│   ├── robots.ts           # SEO: robots.txt
│   └── sitemap.ts          # SEO: sitemap.xml
├── components/
│   └── ui/                 # Reusable UI Components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── table.tsx
│       └── badge.tsx
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth config
│   ├── cloudinary.ts       # Image upload
│   ├── email.ts            # Email notifications
│   ├── export.ts           # Data export (Excel/CSV)
│   ├── utils.ts            # Utility Functions
│   └── mock-data.ts        # Mock Data (legacy)
├── prisma/
│   └── schema.prisma       # Database schema
├── messages/               # i18n translations
│   ├── ar.json             # Arabic
│   └── en.json             # English
├── types/
│   ├── index.ts            # TypeScript Types
│   └── next-auth.d.ts      # NextAuth types
└── package.json
```

## Features

### Customer Portal (🆕 NEW)

- **Browse Products**: View all approved products with images and prices
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Place orders with delivery information
- **Order History**: Track order status and view past orders
- **Bilingual UI**: Arabic and English support

### Vendor Portal (لوحة تحكم المحلات)

- **Dashboard**: Overview of sales, orders, products, and earnings
- **Add Product**: Form to add new products with:
  - Name (English & Arabic)
  - Description (English & Arabic)
  - Images upload via Cloudinary
  - Base price
  - Category selection
  - Initial status: Pending Review
  - Inventory toggle (In-Stock / Out-of-Stock)
- **Order Management**: 
  - View incoming orders
  - Accept / Prepare / Out for Delivery actions
  - Order status tracking
- **Financial Analytics**:
  - Total sales
  - Platform fees (3%)
  - Net earnings after fees
  - Breakdown by wallet provider (Al-Kuraimi, Jeeb, Jawali)
  - Daily reports
  - Export to Excel/CSV

### Admin Portal (لوحة إدارة النظام)

- **Dashboard**: Overview of pending products, active vendors, total sales, platform fees
- **Product Moderation**:
  - Review pending products
  - Approve / Reject with reasons
  - View product details
  - Email notifications to vendors
- **Financial Reports**:
  - Total sales across all vendors
  - Platform fees (3% commission)
  - Breakdown by wallet provider
  - Daily/Weekly reports
  - Settlement summaries
  - Export to Excel/CSV
- **User Management**:
  - View all vendors
  - Activate / Deactivate accounts
  - View vendor details and wallet information

### Authentication & Authorization (🆕 NEW)

- **NextAuth.js**: Secure authentication system
- **Role-Based Access Control (RBAC)**:
  - Admin roles: super-admin, product-reviewer, support-ops-agent
  - Vendor roles: financial-accountant, inventory-manager
- **Permission System**: Granular permissions for each role
- **JWT Sessions**: Secure session management

### Email Notifications (🆕 NEW)

- **Order Confirmation**: Send confirmation emails to customers
- **Order Status Updates**: Notify customers of status changes
- **Product Approval**: Notify vendors when products are approved
- **Product Rejection**: Notify vendors with rejection reasons

### Image Upload (🆕 NEW)

- **Cloudinary Integration**: Secure image storage
- **Multiple Images**: Upload multiple product images
- **Optimization**: Automatic image optimization

### Data Export (🆕 NEW)

- **Excel Export**: Export reports to .xlsx format
- **CSV Export**: Export data to .csv format
- **Financial Reports**: Export sales and fee reports
- **Order Reports**: Export order history

### SEO & Performance (🆕 NEW)

- **Dynamic Metadata**: SEO-friendly page titles and descriptions
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawler configuration
- **Loading States**: Improved UX with loading indicators
- **Error Handling**: Toast notifications for errors

### Testing (🆕 NEW)

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing
- **Test Coverage**: Configuration for coverage reports

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/yemeni_ecommerce"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yemeni-ecommerce.com"
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Data Models

### User
- Roles: admin, vendor, customer
- Status: active, inactive, suspended
- Linked to vendor account (for vendors)

### Product
- Status: pending, approved, rejected
- Inventory: in-stock, out-of-stock
- Supports bilingual (English/Arabic) names and descriptions
- Images stored on Cloudinary

### Order
- Status: pending, accepted, preparing, out-for-delivery, delivered, cancelled
- Contains multiple items with quantities
- Linked to financial transactions

### Vendor
- Status: active, inactive, suspended
- Wallet providers: alkuraimi, jeeb, jawali, other
- Sub-accounts with RBAC

### Financial
- Platform fee: 3%
- Tracks transactions by wallet provider
- Settlement status: pending, settled
- Daily and aggregated reports

### Cart
- Items with quantities
- Cleared after checkout

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

- `DATABASE_URL` - Use Vercel Postgres or external PostgreSQL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL
- `CLOUDINARY_*` - Your Cloudinary credentials
- `SENDGRID_API_KEY` - Your SendGrid API key

## Notes

- All UI components are RTL (Right-to-Left) for Arabic language support
- Currency formatting is in Yemeni Rial (YER)
- The platform is designed for Yemeni mobile wallet providers
- Bilingual support (Arabic/English) with next-intl
- Email notifications powered by SendGrid
- Images stored on Cloudinary
- Database managed with Prisma ORM

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control
- Permission checks on all protected routes
- Environment variable protection
- SQL injection prevention via Prisma

## Performance Optimizations

- Next.js Image optimization
- Server-side rendering where appropriate
- Client-side loading states
- Database query optimization
- Lazy loading for images

## Future Enhancements

- Real-time notifications with WebSockets
- Mobile app (React Native)
- Advanced analytics dashboard
- AI-powered product recommendations
- Multi-language support (more than Arabic/English)
- Payment gateway integration (Yemeni payment providers)
- Review and rating system
- Wishlist functionality
- Product search with filters
- Vendor subscription plans

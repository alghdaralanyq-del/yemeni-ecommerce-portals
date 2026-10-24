# Yemeni Multi-Vendor E-commerce Platform

منصة تجارة إلكترونية متعددة المتاجر لليمن

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Formatting**: date-fns

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
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Home Page
│   └── globals.css        # Global Styles
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
│   ├── utils.ts            # Utility Functions
│   └── mock-data.ts        # Mock Data
├── types/
│   └── index.ts            # TypeScript Types
└── package.json
```

## Features

### Vendor Portal (لوحة تحكم المحلات)

- **Dashboard**: Overview of sales, orders, products, and earnings
- **Add Product**: Form to add new products with:
  - Name (English & Arabic)
  - Description (English & Arabic)
  - Images upload
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

### Admin Portal (لوحة إدارة النظام)

- **Dashboard**: Overview of pending products, active vendors, total sales, platform fees
- **Product Moderation**:
  - Review pending products
  - Approve / Reject with reasons
  - View product details
- **Financial Reports**:
  - Total sales across all vendors
  - Platform fees (3% commission)
  - Breakdown by wallet provider
  - Daily/Weekly reports
  - Settlement summaries
- **User Management**:
  - View all vendors
  - Activate / Deactivate accounts
  - View vendor details and wallet information

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Data Models

### Product
- Status: pending, approved, rejected
- Inventory: in-stock, out-of-stock
- Supports bilingual (English/Arabic) names and descriptions

### Order
- Status: pending, accepted, preparing, out-for-delivery, delivered, cancelled
- Contains multiple items with quantities

### Vendor
- Status: active, inactive, suspended
- Wallet providers: alkuraimi, jeeb, jawali, other

### Financial
- Platform fee: 3%
- Tracks transactions by wallet provider
- Daily and aggregated reports

## Notes

- The project uses mock data for demonstration purposes
- All UI components are RTL (Right-to-Left) for Arabic language support
- Currency formatting is in Yemeni Rial (YER)
- The platform is designed for Yemeni mobile wallet providers

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/yemeni-ecommerce-portals.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

   Vercel will automatically:
   - Detect Next.js
   - Install dependencies
   - Build the project
   - Deploy it

3. **Your site will be live at**: `https://your-project.vercel.app`

### Environment Variables (Optional)

If you need to add environment variables in Vercel:
- Go to Project Settings > Environment Variables
- Add any required variables

## Future Enhancements

- Connect to a real database (PostgreSQL/MongoDB)
- Implement authentication and authorization
- Add real-time notifications
- Integrate with actual payment gateways
- Add image upload functionality
- Implement advanced filtering and search
- Add export functionality for reports

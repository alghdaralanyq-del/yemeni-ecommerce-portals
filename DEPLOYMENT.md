# دليل النشر (Deployment Guide) - تيقن

## 📋 المحتويات
1. [المتطلبات الأساسية](#المتطلبات-الأساسية)
2. [إعداد قاعدة البيانات](#إعداد-قاعدة-البيانات)
3. [إعداد Cloudinary](#إعداد-cloudinary)
4. [إعداد SendGrid](#إعداد-sendgrid)
5. [التثبيت والتشغيل محلياً](#التثبيت-والتشغيل-محلياً)
6. [النشر على Vercel](#النشر-على-vercel)
7. [البيانات التجريبية](#البيانات-التجريبية)

---

## المتطلبات الأساسية

- حساب على [GitHub](https://github.com)
- حساب على [Vercel](https://vercel.com)
- حساب على [Cloudinary](https://cloudinary.com) (مجاني)
- حساب على [SendGrid](https://sendgrid.com) (اختياري)
- Node.js 18+ مثبت
- Git مثبت

---

## إعداد قاعدة البيانات

### الخيار 1: Vercel Postgres (موصى به للنشر على Vercel)

1. سجل الدخول إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اذهب إلى **Storage** → **Create Database**
3. اختر **Postgres** واضغط **Continue**
4. اختر الاسم (مثلاً: `teyqen-db`) واضغط **Create**
5. انسخ الـ `DATABASE_URL` من الـ `.env` tab
6. أضف `?schema=public` في نهاية الرابط إذا لم يكن موجوداً

### الخيار 2: Supabase (بديل مجاني)

1. سجل الدخول إلى [Supabase](https://supabase.com)
2. أنشئ مشروع جديد
3. اذهب إلى **Settings** → **Database**
4. انسخ الـ `Connection String` (URI)
5. استبدل `[YOUR-PASSWORD]` بكلمة المرور الخاصة بك

### الخيار 3: PostgreSQL محلي

```bash
# تثبيت PostgreSQL
# Windows: تحميل من postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# إنشاء قاعدة بيانات
createdb yemeni_ecommerce
```

---

## إعداد Cloudinary

1. سجل الدخول إلى [Cloudinary Dashboard](https://cloudinary.com/console)
2. انسخ من الـ Dashboard:
   - **Cloud Name** (مثلاً: `abc123`)
   - **API Key**
   - **API Secret**
3. اذهب إلى **Settings** → **Upload** → **Upload Presets**
4. أنشئ **Unsigned Upload Preset** بالاسم: `teyqen_uploads`
5. أضف الإعدادات التالية:
   - Folder: `teyqen/products`
   - Allowed formats: `jpg, png, webp`
   - Max file size: `10 MB`

---

## إعداد SendGrid (اختياري)

1. سجل الدخول إلى [SendGrid](https://sendgrid.com)
2. اذهب إلى **Settings** → **API Keys**
3. أنشئ API Key جديدة بصلاحيات **Mail Send**
4. انسخ الـ API Key
5. اذهب إلى **Sender Authentication** → **Single Sender**
6. أضف بريد الإرسال (مثلاً: `noreply@teyqen.com`)
7. تحقق من البريد الإلكتروني

---

## التثبيت والتشغيل محلياً

### 1. استنساخ المشروع

```bash
git clone https://github.com/YOUR_USERNAME/teyqen-ecommerce.git
cd teyqen-ecommerce
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

```bash
cp .env.example .env
```

### 4. تعديل ملف `.env`

```env
# Database (استخدم أحدها)
DATABASE_URL="postgresql://user:password@localhost:5432/yemeni_ecommerce?schema=public"
# أو Vercel Postgres
# DATABASE_URL="postgres://default:xxx@xxx.us-east-1.aws.neon.tech/verceldb?sslmode=require&schema=public"

# NextAuth
NEXTAUTH_SECRET="قم بتوليد سلسلة عشوائية: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_PRESET="teyqen_uploads"

# SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@teyqen.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_URL="https://res.cloudinary.com/your-cloud-name/image/upload"
```

### 5. توليد NextAuth Secret

```bash
# على Linux/Mac
openssl rand -base64 32

# على Windows (Git Bash)
openssl rand -base64 32

# أو باستخدام PowerShell
$bytes = New-Object byte[] 32; (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [System.Convert]::ToBase64String($bytes)
```

### 6. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npx prisma generate

# دفع الـ Schema إلى قاعدة البيانات
npx prisma db push

# أو استخدام Migrations (موصى به للإنتاج)
npx prisma migrate dev --name init
```

### 7. إضافة البيانات التجريبية

```bash
# تشغيل الـ Seed
npm run prisma:seed
```

### 8. تشغيل خادم التطوير

```bash
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

---

## النشر على Vercel

### 1. رفع المشروع إلى GitHub

```bash
# تهيئة Git (إذا لم يكن متهيئاً)
git init

# إضافة الملفات
git add .

# أول commit
git commit -m "Initial commit - Teyqen E-commerce Platform"

# إنشاء Repository على GitHub
# ثم ربطه
git remote add origin https://github.com/YOUR_USERNAME/teyqen-ecommerce.git

# رفع الكود
git branch -M main
git push -u origin main
```

### 2. استيراد المشروع في Vercel

1. سجل الدخول إلى [Vercel](https://vercel.com)
2. اضغط **Add New** → **Project**
3. اختر Repository من GitHub
4. اضغط **Import**

### 3. إعداد متغيرات البيئة في Vercel

في صفحة إعدادات المشروع في Vercel:

1. اذهب إلى **Settings** → **Environment Variables**
2. أضف المتغيرات التالية:

```
DATABASE_URL            = postgres://your-database-url
NEXTAUTH_SECRET         = your-generated-secret
NEXTAUTH_URL            = https://your-project.vercel.app
CLOUDINARY_CLOUD_NAME   = your-cloud-name
CLOUDINARY_API_KEY      = your-api-key
CLOUDINARY_API_SECRET   = your-api-secret
CLOUDINARY_UPLOAD_PRESET = teyqen_uploads
SENDGRID_API_KEY        = your-sendgrid-api-key
SENDGRID_FROM_EMAIL     = noreply@teyqen.com
NEXT_PUBLIC_APP_URL     = https://your-project.vercel.app
NEXT_PUBLIC_CLOUDINARY_URL = https://res.cloudinary.com/your-cloud-name/image/upload
```

### 4. إعداد Vercel Postgres (إذا استخدمته)

1. في Vercel Dashboard، اذهب إلى مشروعك
2. اذهب إلى **Storage** → **Connect Database**
3. اختر قاعدة البيانات التي أنشأتها
4. سيتم إضافة `DATABASE_URL` تلقائياً إلى متغيرات البيئة

### 5. تفعيل Automatic Deployments

1. اذهب إلى **Settings** → **Git**
2. تأكد من **Automatic Deployment** مفعّل
3. اضغط **Save**

### 6. النشر الأولي

1. اضغط **Deploy** في صفحة المشروع
2. انتظر حتى يكتمل النشر
3. افتح الرابط الناتج

### 7. إعداد قاعدة البيانات بعد النشر

بعد النشر الأولي، قم بتشغيل الأوامر التالية في Vercel CLI:

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# إعداد البيئة
vercel env pull .env

# توليد Prisma Client
npx prisma generate

# دفع الـ Schema
npx prisma db push

# إضافة البيانات التجريبية
npm run prisma:seed
```

### 8. إعداد Production Build

أضف في `package.json`:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

---

## البيانات التجريبية

بعد تشغيل `npm run prisma:seed`، سيتم إنشاء:

### المستخدمين:
- **Admin**: `admin@yemenmarket.com` / `admin123password`
- **Vendor**: `vendor@yemenmarket.com` / `vendor123password`
- **Customer**: `customer@yemenmarket.com` / `customer123`

### الفئات:
- Electronics / إلكترونيات
- Clothing / ملابس

### المنتجات:
- Smartphone Pro (250,000 YER)
- Cotton T-Shirt (15,000 YER)

---

## استكشاف الأخطاء

### خطأ في اتصال قاعدة البيانات

```bash
# تحقق من DATABASE_URL
echo $DATABASE_URL

# اختبر الاتصال
npx prisma db push
```

### خطأ في Prisma Generate

```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
npx prisma generate
```

### خطأ في NextAuth

تأكد من:
- `NEXTAUTH_SECRET` معرف بشكل صحيح
- `NEXTAUTH_URL` يطابق رابط النشر

### خطأ في Cloudinary

تأكد من:
- `CLOUDINARY_UPLOAD_PRESET` موجود في Cloudinary
- الـ API Key والـ Secret صحيحة

---

## استضافة Vercel Postgres

### النسخة المجانية:
- 512 MB Storage
- 60 hours compute/month
- 1.0 GB backup storage

### الترقية:
- Hobby: $20/month
- Pro: $100/month

---

## استضافة Cloudinary

### النسخة المجانية:
- 25 GB Storage
- 25 GB Bandwidth/month
- 25 Transformations/month

### الترقية:
- Plus: $89/month
- Premium: $249/month

---

## تحديثات مستقبلية

- [ ] إضافة Payment Gateway (Kash/AlKuraimi)
- [ ] تطبيق موبايل (React Native)
- [ ] نظام المراجعات والتقييمات
- [ ] إشعارات WebSockets
- [ ] تحليلات متقدمة
- [ ] نظام الـ Wishlist

---

## الدعم

للدعم الفني، تواصل مع:
- Email: support@teyqen.com
- GitHub Issues: [github.com/YOUR_USERNAME/teyqen-ecommerce/issues](https://github.com/YOUR_USERNAME/teyqen-ecommerce/issues)

---

## الترخيص

© 2024 تيقن - جميع الحقوق محفوظة

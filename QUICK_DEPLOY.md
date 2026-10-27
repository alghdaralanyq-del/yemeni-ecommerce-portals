# 🚀 تعليمات النشر السريع على Vercel

## الخطوة 1: إعداد قاعدة البيانات (اختر واحدة)

### خيار A: Vercel Postgres (الأسرع والأسهل)

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اضغط **Storage** → **Create Database**
3. اختر **Postgres** واضغط **Continue**
4. اختر الاسم (مثلاً: `teyqen-db`) واضغط **Create**
5. انسخ الـ `DATABASE_URL` من الـ `.env` tab

### خيار B: Supabase (مجاني بالكامل)

1. سجل في [Supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. اذهب إلى **Settings** → **Database**
4. انسخ الـ Connection String
5. استبدل `[YOUR-PASSWORD]` بكلمة المرور

---

## الخطوة 2: إعداد Cloudinary

1. سجل في [Cloudinary.com](https://cloudinary.com)
2. انسخ من الـ Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. أنشئ **Unsigned Upload Preset** بالاسم: `teyqen_uploads`

---

## الخطوة 3: استيراد المشروع في Vercel

1. اذهب إلى [Vercel.com](https://vercel.com)
2. اضغط **Add New** → **Project**
3. اختر Repository: `alghdaralanyq-del/yemeni-ecommerce-portals`
4. اضغط **Import**

---

## الخطوة 4: إضافة متغيرات البيئة

في صفحة المشروع في Vercel، اذهب إلى **Settings** → **Environment Variables** وأضف:

```
DATABASE_URL              = (الرابط من الخطوة 1)
NEXTAUTH_SECRET           = (ولد: openssl rand -base64 32)
NEXTAUTH_URL              = https://your-project.vercel.app
CLOUDINARY_CLOUD_NAME     = (من Cloudinary)
CLOUDINARY_API_KEY        = (من Cloudinary)
CLOUDINARY_API_SECRET     = (من Cloudinary)
CLOUDINARY_UPLOAD_PRESET  = teyqen_uploads
SENDGRID_API_KEY          = (اختياري)
SENDGRID_FROM_EMAIL       = noreply@teyqen.com
NEXT_PUBLIC_APP_URL       = https://your-project.vercel.app
```

---

## الخطوة 5: النشر الأولي

1. اضغط **Deploy**
2. انتظر حتى يكتمل النشر
3. افتح الرابط الناتج

---

## الخطوة 6: إعداد قاعدة البيانات بعد النشر

بعد النشر، افتح Terminal وشغل:

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# ربط بالمشروع
vercel link

# سحب متغيرات البيئة
vercel env pull .env

# توليد Prisma Client
npx prisma generate

# دفع الـ Schema إلى قاعدة البيانات
npx prisma db push

# إضافة البيانات التجريبية
npm run prisma:seed
```

---

## الخطوة 7: إعادة النشر مع البيانات

1. اذهب إلى Vercel Dashboard
2. اضغط **Redeploy** على مشروعك
3. انتظر حتى يكتمل النشر

---

## ✅ الاختبار

افتح موقعك واختبر:
- **Admin**: `admin@yemenmarket.com` / `admin123password`
- **Vendor**: `vendor@yemenmarket.com` / `vendor123password`

---

## 🔧 استكشاف الأخطاء

### خطأ في قاعدة البيانات:
```bash
# تحقق من الاتصال
npx prisma db push
```

### خطأ في Prisma:
```bash
# أعد التثبيت
rm -rf node_modules
npm install
npx prisma generate
```

### خطأ في NextAuth:
تأكد من:
- `NEXTAUTH_SECRET` صحيح
- `NEXTAUTH_URL` يطابق رابط النشر

---

## 📚 دليل مفصل

للتفاصيل الكاملة، راجع ملف [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎉 النجاح!

تم نشر مشروعك بنجاح على Vercel مع قاعدة بيانات كاملة!

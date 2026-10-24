# دليل النشر على Vercel

## الخطوة 1: تثبيت Git (إذا لم يكن مثبتاً)

### على Windows:
1. قم بتحميل Git من: https://git-scm.com/download/win
2. قم بتثبيته باستخدام الإعدادات الافتراضية
3. بعد التثبيت، أعد تشغيل الكمبيوتر

## الخطوة 2: إنشاء حساب على GitHub

1. اذهب إلى: https://github.com
2. سجل حساب جديد أو سجل الدخول إذا كان لديك حساب
3. أنشئ مستودع جديد (New Repository)
4. سمِّه: `yemeni-ecommerce-portals`
5. اجعله Public أو Private حسب رغبتك
6. انقر على "Create repository"

## الخطوة 3: رفع المشروع على GitHub

افتح Terminal أو PowerShell في مجلد المشروع وقم بالآتي:

```bash
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit - Yemeni E-commerce Platform"

# تغيير اسم الفرع إلى main
git branch -M main

# إضافة رابط GitHub (استبدل YOUR_USERNAME باسم المستخدم الخاص بك)
git remote add origin https://github.com/YOUR_USERNAME/yemeni-ecommerce-portals.git

# رفع الكود على GitHub
git push -u origin main
```

**ملاحظة:** إذا طلب منك اسم المستخدم وكلمة المرور:
- استخدم GitHub Personal Access Token بدلاً من كلمة المرور
- يمكنك إنشاءه من: GitHub Settings > Developer settings > Personal access tokens

## الخطوة 4: النشر على Vercel

### الطريقة الأولى: عبر موقع Vercel

1. اذهب إلى: https://vercel.com
2. سجل حساب جديد باستخدام GitHub
3. انقر على "Add New Project"
4. ستجد مستودع `yemeni-ecommerce-portals` في القائمة
5. انقر على "Import"
6. سيقوم Vercel بتحديد إعدادات Next.js تلقائياً
7. انقر على "Deploy"

سيستغرق النشر حوالي 2-3 دقائق.

### الطريقة الثانية: باستخدام Vercel CLI (اختياري)

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel
```

## الخطوة 5: التحقق من النشر

بعد انتهاء النشر:
- ستحصل على رابط مثل: `https://yemeni-ecommerce-portals.vercel.app`
- افتح الرابط في المتصفح
- تحقق من أن الموقع يعمل بشكل صحيح

## التحديثات المستقبلية

عندما تقوم بتعديل الكود:

```bash
# إضافة التغييرات
git add .

# إنشاء commit جديد
git commit -m "وصف التغييرات"

# رفع التغييرات
git push
```

سيقوم Vercel تلقائياً بإعادة نشر الموقع.

## استكشاف الأخطاء

### إذا فشل البناء على Vercel:

1. تحقق من سجلات البناء (Build Logs)
2. تأكد من أن جميع التبعيات موجودة في package.json
3. تأكد من أن إعدادات TypeScript صحيحة

### إذا كانت هناك مشاكل في SWC:

المشروع جاهز للنشر على Vercel. إذا واجهت مشاكل في SWC binary، Vercel سيحلها تلقائياً لأنه يستخدم بيئة Linux.

## ملاحظات مهمة

- المشروع يستخدم بيانات وهمية (mock data)
- لا يحتاج إلى قاعدة بيانات في الوقت الحالي
- جميع الملفات جاهزة للنشر
- تم إصلاح جميع أخطاء TypeScript

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          منصة التجارة الإلكترونية اليمنية
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          اختر البوابة التي تريد الدخول إليها
        </p>
        <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
          <Link
            href="/customer"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            🛒 تصفح المنتجات (للعملاء)
          </Link>
          <Link
            href="/vendor"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            🏪 لوحة تحكم المحلات
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            ⚙️ لوحة إدارة النظام
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            🔐 تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  )
}

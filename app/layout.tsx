import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "تيقن - Teyqen",
    template: "%s | تيقن"
  },
  description: "تيقن - الجيل القادم من التجارة الإلكترونية متعددة المتاجر",
  keywords: ["تيقن", "Teyqen", "تجارة إلكترونية", "متاجر", "منتجات", "قهوة يمنية", "عسل حضرموت"],
  authors: [{ name: "Teyqen" }],
  openGraph: {
    title: "تيقن - Teyqen",
    description: "الجيل القادم من التجارة الإلكترونية متعددة المتاجر",
    type: "website",
    locale: "ar_YE",
  },
  twitter: {
    card: "summary_large_image",
    title: "تيقن - Teyqen",
    description: "الجيل القادم من التجارة الإلكترونية متعددة المتاجر",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${inter.className} bg-[#090A0F]`}>
        <SessionProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors theme="dark" />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

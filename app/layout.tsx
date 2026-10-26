import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "منصة التجارة الإلكترونية اليمنية",
    template: "%s | منصة التجارة الإلكترونية اليمنية"
  },
  description: "منصة تجارة إلكترونية متعددة المتاجر لليمن - تسوق منتجات يمنية أصلية",
  keywords: ["تجارة إلكترونية", "يمن", "متاجر", "منتجات يمنية", "قهوة يمنية", "عسل حضرموت"],
  authors: [{ name: "Yemeni E-commerce" }],
  openGraph: {
    title: "منصة التجارة الإلكترونية اليمنية",
    description: "منصة تجارة إلكترونية متعددة المتاجر لليمن",
    type: "website",
    locale: "ar_YE",
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة التجارة الإلكترونية اليمنية",
    description: "منصة تجارة إلكترونية متعددة المتاجر لليمن",
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
      <body className={inter.className}>
        <SessionProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

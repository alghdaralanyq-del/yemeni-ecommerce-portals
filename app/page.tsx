'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CinematicSplash() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    // Show buttons after logo animation
    setTimeout(() => {
      setShowButtons(true)
    }, 1500)
  }, [])

  const handleAdminLogin = () => {
    router.push('/admin/login')
  }

  const handleVendorLogin = () => {
    router.push('/vendor/login')
  }

  if (!showSplash) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#0a1628] flex items-center justify-center overflow-hidden relative">
      {/* Animated background with Teyqen colors */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1e3a5f]/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#2dd4bf]/15 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="w-40 h-40 mx-auto mb-6 relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2dd4bf] to-[#1e3a5f] rounded-3xl blur-xl opacity-40" />
            <div className="relative inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#2dd4bf] rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-bold text-white">ت</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-8xl font-bold bg-gradient-to-r from-[#1e3a5f] via-[#2dd4bf] to-[#1e3a5f] bg-clip-text text-transparent mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            تيقن
          </motion.h1>

          <motion.p
            className="text-3xl text-gray-400 mb-8 font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Teyqen
          </motion.p>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-2xl text-gray-300 font-medium mb-2">
            مرحباً بك في منصة تيقن
          </p>
          <p className="text-lg text-gray-500">
            الجيل القادم من التجارة الإلكترونية في اليمن
          </p>
        </motion.div>

        {/* Main Buttons */}
        {showButtons && (
          <motion.div
            className="space-y-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.button
              onClick={handleAdminLogin}
              className="w-full max-w-md mx-auto py-4 px-8 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white rounded-2xl font-semibold text-xl hover:shadow-xl hover:shadow-[#1e3a5f]/50 transition-all duration-300 border border-[#1e3a5f]/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              مدير أساسي
            </motion.button>

            <motion.button
              onClick={handleVendorLogin}
              className="w-full max-w-md mx-auto py-4 px-8 bg-gradient-to-r from-[#2dd4bf] to-[#20b8a3] text-white rounded-2xl font-semibold text-xl hover:shadow-xl hover:shadow-[#2dd4bf]/50 transition-all duration-300 border border-[#2dd4bf]/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              مدير فرعي
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Decorative particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#2dd4bf]/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}

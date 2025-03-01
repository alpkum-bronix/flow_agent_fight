"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface WinPopupProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

const WinPopup: React.FC<WinPopupProps> = ({ isOpen, onClose, amount }) => {
  const { width, height } = useWindowSize()
  const [confettiPieces, setConfettiPieces] = useState(200)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setConfettiPieces(0)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti width={width} height={height} numberOfPieces={confettiPieces} recycle={false} />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 shadow-lg text-white">
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="text-4xl font-bold mb-4"
              >
                YOU WIN!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl mb-6"
              >
                You won {amount} FLOW!
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Claim Reward
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default WinPopup


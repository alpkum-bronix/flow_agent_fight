"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LosePopupProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

const LosePopup: React.FC<LosePopupProps> = ({ isOpen, onClose, amount }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 shadow-lg text-white">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="text-4xl font-bold mb-4"
            >
              You lost :(((
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl mb-6"
            >
              You lost {amount} FLOW
            </motion.p>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="text-6xl mb-6"
            >
              💔
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LosePopup


import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Landing() {
  const navigate = useNavigate()

  return (
      <div className="absolute inset-0 -z-10 animate-gradient bg-[radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#7c3aed_100%)]">
    {/* <div className="relative h-screen w-screen"> */}
      {/* Animated Gradient Background */}


      {/* Center Content */}
      <div className="flex items-center justify-center h-full px-6">
        
    

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 flex flex-col items-center space-y-8 max-w-lg w-full"
        >
          <h2 className="text-4xl font-bold text-gray-900 drop-shadow-sm text-center">
            Welcome! 🚀
          </h2>
          <p className="text-gray-700 text-lg text-center">
            Submit your reports easily and securely in just one click.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/upload")}
            className="px-8 py-3 text-lg font-semibold rounded-xl 
                       bg-gradient-to-r from-purple-600 to-indigo-600 
                       text-white shadow-lg shadow-purple-400/40
                       hover:shadow-purple-600/60 transition-all"
          >
            Submit Report
          </motion.button>
        </motion.div>
      </div>
      
    </div>
  )
}

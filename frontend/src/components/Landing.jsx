import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Landing() {
  const navigate = useNavigate()

  return (
      <div className="absolute inset-0 -z-10 animate-gradient bg-[radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#7c3aed_100%)]">
      {/* Hero Section */}
      <div className="flex items-center justify-center h-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/20 border border-white/30  rounded-2xl p-10 flex flex-col items-center space-y-8 max-w-4xl w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-sm text-center mb-6"
          >
            Report Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Made Simple
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-700 text-center mb-8 max-w-3xl"
          >
            Upload, process, and manage your reports with ease. Support for both single reports and bulk CSV uploads with real-time processing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/upload")}
              className="px-8 py-4 text-lg font-semibold rounded-xl 
                         bg-gradient-to-r from-purple-600 to-indigo-600 
                         text-white shadow-lg shadow-purple-400/40
                         hover:shadow-purple-600/60 transition-all"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-8 py-4 text-lg font-semibold rounded-xl 
                         bg-white/80 text-purple-600 border-2 border-purple-600
                         hover:bg-white transition-all backdrop-blur-sm"
            >
              Login
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to upload and process your reports</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Upload Type</h3>
              <p className="text-gray-600">Select between single report upload or CSV bulk upload for multiple reports at once.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your File</h3>
              <p className="text-gray-600">fill form or submit via csv.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Processing</h3>
              <p className="text-gray-600">Watch your reports being processed in real-time with progress tracking and instant feedback.</p>
            </motion.div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            {/* <p className="text-xl text-purple-100 mb-8">
              Join thousands of users who trust our platform for their report management needs.
            </p> */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/upload")}
              className="px-8 py-4 text-lg font-semibold rounded-xl 
                         bg-white text-purple-600 shadow-lg
                         hover:shadow-xl transition-all"
            >
              Start Uploading Reports
            </motion.button>
          </motion.div>
        </div>
      </div>
      
    </div>
  )
}

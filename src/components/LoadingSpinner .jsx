import React from 'react'
import { motion } from 'framer-motion'
import '../styles/LoadingSpinner.css'
function LoadingSpinner () {
  return (
    <motion.div
    className='loader'
    animate={{rotate:360}}
    transition={{repeat:Infinity,duration:1,ease:"linear"}}
    />
  ) 
}

export default LoadingSpinner 
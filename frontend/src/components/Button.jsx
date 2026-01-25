import React from 'react'
import {Play} from "lucide-react"

const Button = ({message}) => {
  return (
    <button className="flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-yellow-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg">
        {message}
        <Play className="w-5 h-5 fill-white" />
      </button>
  )
}

export default Button
import React from 'react'

export default function Footer() {
  return (
    <div className="py-4">
      <div className="flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
        <p className="text-center">
          Copyright © {new Date().getFullYear()} Appsec.Asia. All rights
          reserved.
        </p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  )
}

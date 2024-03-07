import React from 'react'

export default function Button({ classAdd, children, type, ...props }) {
  return (
    <button
      {...props}
      className={`${classAdd} col-span-1 rounded-md bg-[#475defff] px-4 py-2 text-sm font-medium uppercase text-white hover:bg-[#1B66C9] hover:shadow-md focus:ring-1 focus:ring-blue-300`}
    >
      {children}
    </button>
  )
}

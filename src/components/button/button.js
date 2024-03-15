import React from 'react'

export default function Button({ classAdd, children, type, ...props }) {
  return (
    <button
      {...props}
      className={`${classAdd} col-span-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium uppercase text-white hover:bg-secondary hover:shadow-md focus:ring-1 focus:ring-green-300`}
    >
      {children}
    </button>
  )
}

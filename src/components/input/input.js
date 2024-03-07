import React from 'react'

export default function Input({ classAdd, ...props }) {
  return (
    <input
      {...props}
      className={`${classAdd} w-full appearance-none rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]`}
    />
  )
}

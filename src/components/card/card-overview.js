import React from 'react'

export default function CardOverview({ title, value }) {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white px-5 py-4 shadow-sm transition duration-200 hover:bg-[#475defff] hover:text-white hover:shadow-md md:w-80 lg:w-full">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <h1 className="text-4xl font-bold">{value}</h1>
    </div>
  )
}

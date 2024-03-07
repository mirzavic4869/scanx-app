import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
export default function CardScan({ title, value }) {
  const router = useRouter()

  const [active, setActive] = useState(router.asPath)

  const handleClick = (url) => {
    setActive(url)
  }
  return (
    <div className="col-span-1 flex h-max flex-col rounded-md bg-white px-5 py-4 shadow-sm hover:shadow-md">
      <h1 className="mb-3 text-center font-semibold">{title}</h1>
      <div className="flex flex-col rounded border border-gray-300">
        {value.map((item) => (
          <div
            className={`border-b border-gray-300 px-5 py-3 ${
              active === item.url ? 'font-semibold text-[#475defff]' : ''
            }`}
            key={item.id}
          >
            <Link href={item.url}>
              <h2 onClick={handleClick} className="text-center text-sm">
                {item.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

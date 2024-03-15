import { Button } from '@/components/button'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL } from '@/components/lib'

export default function UpdateTools() {
  const optionTools = [
    {
      value: '',
      text: 'Pilih Format',
    },
    {
      value: 'webapp',
      text: 'webapp',
    },
    {
      value: 'vulnscan',
      text: 'vulnscan',
    },
    {
      value: 'subdomain',
      text: 'subdomain',
    },
    {
      value: 'wordpress',
      text: 'wordpress',
    },
    {
      value: 'bruteforce',
      text: 'bruteforce',
    },
    {
      value: 'drupal',
      text: 'drupal',
    },
    {
      value: 'all',
      text: 'all',
    },
  ]
  const router = useRouter()
  const [updateResult, setUpdateResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedTools, setSelectedTools] = useState(optionTools[0].value)
  const session = getCookie('session')

  const handleChange = (e) => {
    setSelectedTools(e.target.value)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    toUpdate(selectedTools)
  }

  async function toUpdate(selectedTools) {
    try {
      setLoading(true)
      const payload = {
        tools: selectedTools,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/scanner_update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: JSON.stringify(payload),
      })
      setUpdateResult(result.data)
      setLoading(false)
      // setSelectedTools('')
    } catch (error) {
      await Swal.fire('Sorry', error.message, 'error')
      setLoading(false)
    }
  }

  return (
    <>
      <p className="mb-4 text-lg font-semibold md:text-xl">Update Tools</p>
      <div className="mb-4 flex flex-row items-center justify-between gap-4">
        <select
          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
          onChange={handleChange}
          value={selectedTools}
        >
          {optionTools.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <Button onClick={handleUpdate}>update</Button>
      </div>
      <div className="rounded-md bg-white p-6 shadow-sm hover:shadow-md">
        <h1 className="mb-6 text-lg font-semibold">Latest Update</h1>
        {
          selectedTools === optionTools[1].value ||
          selectedTools === optionTools[2].value ||
          selectedTools === optionTools[3].value ||
          selectedTools === optionTools[4].value ||
          selectedTools === optionTools[5].value ||
          selectedTools === optionTools[6].value
            ? Object.entries(updateResult).map(([key, value], index) => (
                <p className="my-2" key={index}>
                  <strong className="text-bg_primary">{key}:</strong> {value}
                </p>
              ))
            : ''
          // <Loading />
        }
        {!loading ? (
          selectedTools === optionTools[7].value && (
            <div className="relative w-full overflow-x-auto scroll-smooth rounded-lg">
              <table className="w-full border-collapse text-left text-sm text-gray-500">
                <thead className="bg-bg_primary text-xs uppercase text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      body
                    </th>
                    <th scope="col" className="px-6 py-3">
                      published at
                    </th>
                    <th scope="col" className="px-6 py-3">
                      version
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Webapp</th>
                    <td className="px-6 py-4">{updateResult.body?.scan_x1}</td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.scan_x1}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.scan_x1}
                    </td>
                  </tr>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Vulnscan</th>
                    <td className="px-6 py-4">{updateResult.body?.scan_x2}</td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.scan_x2}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.scan_x2}
                    </td>
                  </tr>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Subdomain</th>
                    <td className="px-6 py-4">
                      {updateResult.body?.subdomain}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.subdomain}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.subdomain}
                    </td>
                  </tr>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Wordpress</th>
                    <td className="px-6 py-4">
                      {updateResult.body?.wordpress}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.wordpress}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.wordpress}
                    </td>
                  </tr>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Bruteforce</th>
                    <td className="px-6 py-4">
                      {updateResult.body?.bruteforce}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.bruteforce}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.bruteforce}
                    </td>
                  </tr>
                  <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                    <th className="px-6 py-3 text-bg_primary">Drupal</th>
                    <td className="px-6 py-4">{updateResult.body?.drupal}</td>
                    <td className="px-6 py-4">
                      {updateResult.published_at?.drupal}
                    </td>
                    <td className="px-6 py-4">
                      {updateResult.version?.drupal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

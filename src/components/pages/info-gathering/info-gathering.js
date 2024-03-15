import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan, CardResult } from '@/components/card'
import { useState } from 'react'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL, cardScanInfoGathering } from '@/components/lib'
import { FaDownload } from 'react-icons/fa'

export default function InfoGathering() {
  const router = useRouter()
  const session = getCookie('session')
  const [input, setInput] = useState('')
  const [showDownload, setShowDownload] = useState(false)
  const [scanResult, setScanResult] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    toScan(input)
  }

  async function toScan(input) {
    try {
      setLoading(true)
      const payload = {
        query: input,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/searchig_react`,
        data: payload,
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
      })
      setScanResult(result.data)
      setShowDownload((pv) => !pv)
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      } else {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
      }
      setLoading(false)
    }
  }

  async function toDownload(input) {
    try {
      setLoading(true)
      await axios({
        method: 'GET',
        url: `${baseURL}/searchig_react/${input}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      router.push(`${baseURL}/searchig_react/${input}`)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDownload = (input) => {
    toDownload(input)
    setInput('')
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-xl">Shodan.io</h1>
      <div className="mb-4 flex flex-row justify-between gap-4">
        <Input
          onChange={(e) => setInput(e.target.value)}
          name="search"
          placeholder="Search"
          value={input}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Info Gathering" value={cardScanInfoGathering} />
        <div className="flex flex-col rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Scan Result</h1>
            {showDownload && (
              <FaDownload
                onClick={() => handleDownload(input)}
                color="#475defff"
                className="hover:cursor-pointer"
              />
            )}
          </div>

          <div className="relative hidden overflow-x-auto rounded-lg shadow-sm hover:shadow-md md:block">
            <table className="w-full border-collapse text-left text-sm text-gray-500">
              <thead className="bg-bg_primary text-xs uppercase text-white">
                <tr>
                  <th scope="col" className="p-4">
                    ip
                  </th>
                  <th scope="col" className="px-6 py-3">
                    port
                  </th>
                  <th scope="col" className="px-6 py-3">
                    os
                  </th>
                  <th scope="col" className="px-6 py-3">
                    hostname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    data
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  scanResult?.map((item, index) => (
                    <tr
                      className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                      key={index}
                    >
                      <td className="px-6 py-4">{item.ip_str}</td>
                      <td className="px-6 py-4">{item.port}</td>
                      <td className="px-6 py-4">
                        {item.os === null ? '-' : item.os}
                      </td>
                      {item.hostnames.length === 0 ? (
                        <td className="px-6 py-4">-</td>
                      ) : (
                        item.hostnames.map((item, index) => (
                          <td key={index} className="px-6 py-4">
                            {item}
                          </td>
                        ))
                      )}
                      <td className="px-6 py-4">{item.data}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-5 text-center">
                      <Loading />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Table Mobile Version */}
        <div className="relative overflow-x-auto scroll-smooth rounded-lg shadow-sm hover:shadow-md md:hidden">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-bg_primary text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ip
                </th>
                <th scope="col" className="px-6 py-3">
                  port
                </th>
                <th scope="col" className="px-6 py-3">
                  os
                </th>
                <th scope="col" className="px-6 py-3">
                  hostname
                </th>
                <th scope="col" className="px-6 py-3">
                  data
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                scanResult?.map((item, index) => (
                  <tr
                    className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                    key={index}
                  >
                    <td className="px-6 py-4">{item.ip_str}</td>
                    <td className="px-6 py-4">{item.port}</td>
                    <td className="px-6 py-4">
                      {item.os === null ? '-' : item.os}
                    </td>
                    {item.hostnames.length === 0 ? (
                      <td className="px-6 py-4">-</td>
                    ) : (
                      item.hostnames.map((item, index) => (
                        <td key={index} className="px-6 py-4">
                          {item}
                        </td>
                      ))
                    )}
                    <td className="px-6 py-4">{item.data}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-5 text-center">
                    <Loading />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

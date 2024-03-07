import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan } from '@/components/card'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL } from '@/components/lib'

export default function ScanX3() {
  const value = [
    {
      id: '1',
      title: 'Scan_x1',
      url: '/web-vuln',
    },
    {
      id: '2',
      title: 'Scan_x2',
      url: '/web-vuln/scan-x2',
    },
    {
      id: '3',
      title: 'Scan_x3',
      url: '/web-vuln/scan-x3',
    },
    {
      id: '4',
      title: 'Scan_x4',
      url: '/web-vuln/scan-x4',
    },
  ]

  const options = [
    {
      value: '',
      text: 'Pilih Format',
    },
    {
      value: 'json',
      text: 'json',
    },
  ]
  const router = useRouter()
  const [target, setTarget] = useState('')
  const [scanResult, setScanResult] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState(options[0].value)
  const session = getCookie('session')

  const handleChange = (e) => {
    setSelectedFormat(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toScan(target, selectedFormat)
  }

  async function toScan(target, selectedFormat) {
    try {
      setLoading(true)
      const payload = {
        target_url: target,
        output_format: selectedFormat,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/scan-x3`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: JSON.stringify(payload),
      })
      setScanResult(result.data)
      setLoading(false)
      setTarget('')
      setSelectedFormat('')
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', error.response?.statusText, 'error')
      } else {
        await Swal.fire('Sorry', 'Data harus diisi!', 'error')
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">Scan_x3</h1>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
        <Input
          onChange={(e) => setTarget(e.target.value)}
          name="url"
          value={target}
          placeholder="http://yourdomain.com/"
        />
        <select
          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
          onChange={handleChange}
          value={selectedFormat}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <Button onClick={handleSubmit}>Scan</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Scanning Tools" value={value} />
        <div className="flex flex-col rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <h1 className="mb-4 font-semibold">Scan Result</h1>
          {!loading && scanResult ? (
            <>
              {Object.entries(scanResult.data).map(([key, value], index) => (
                <div key={index}>
                  <p>
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{' '}
                    {value}
                  </p>
                </div>
              ))}
              {Object.entries(scanResult).map(([key, value], index) => (
                <div key={index}>
                  <p>
                    <strong>
                      {key === 'success'
                        ? key.charAt(0).toUpperCase() + key.slice(1)
                        : ''}
                      {key === 'success' ? ':' : ''}
                    </strong>{' '}
                    {key === 'success' ? String(value) : ''}
                  </p>
                </div>
              ))}
            </>
          ) : scanResult === false && loading === true ? (
            <Loading />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan } from '@/components/card'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL, cardScanWebVuln } from '@/components/lib'

export default function ScanX4() {
  const options = [
    {
      value: '',
      text: 'Pilih Format',
    },
    {
      value: 'html',
      text: 'html',
    },
    {
      value: 'xml',
      text: 'xml',
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
        url: `${baseURL}/scan-x4`,
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
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      } else if (error.response?.status === 401) {
        await Swal.fire('Sorry', error.response.data.error, 'error')
      } else {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">
        Scan_x2 (Vulnerability Scanner - CVSS&CVE)
      </h1>
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
        <CardScan title="Scanning Tools" value={cardScanWebVuln} />
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

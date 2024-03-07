import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan } from '@/components/card'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'
import { baseURL, optionArgs } from '@/components/lib'
import { cardScanInfoGathering } from '@/components/lib'

export default function Nmap() {
  const router = useRouter()
  const session = getCookie('session')
  const [target, setTarget] = useState('')
  const [args, setArgs] = useState('')
  const [scanResult, setScanResult] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setArgs(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toScan(target, args)
  }

  async function toScan(target, args) {
    try {
      setLoading(true)
      const payload = {
        target: target,
        args: args,
      }

      const result = await axios({
        method: 'POST',
        url: `${baseURL}/nmapscan_react`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setScanResult(result.data.nmap_results)
      setLoading(false)
      setInput('')
    } catch (error) {
      await Swal.fire(
        'Sorry',
        Object.values(error.response.data).toString(),
        'error'
      )
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">Nmap</h1>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
        <Input
          onChange={(e) => setTarget(e.target.value)}
          name="target"
          placeholder="yourdomain.com"
          value={target}
        />
        <select
          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
          onChange={handleChange}
          value={args}
        >
          {optionArgs.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Info Gathering" value={cardScanInfoGathering} />
        <div className="flex flex-col rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <h1 className="mb-4 text-lg font-semibold">Scan Result</h1>
          {!loading ? (
            <JsonView data={scanResult !== undefined ? scanResult : {}} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  )
}

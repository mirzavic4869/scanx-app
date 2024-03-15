import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan } from '@/components/card'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL, cardScanInfoGathering } from '@/components/lib'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

export default function Nmap() {
  const router = useRouter()
  const session = getCookie('session')
  const [input, setInput] = useState('')
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
        target_url: input,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/whoiscan_react`,
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        data: payload,
      })
      setScanResult(result.data)
      setLoading(false)
      setInput('')
    } catch (error) {
      console.log(error)
      await Swal.fire('Sorry', 'Data harus diisi!', 'error')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-xl">Whois Xml</h1>
      <div className="mb-4 flex flex-row justify-between gap-4">
        <Input
          onChange={(e) => setInput(e.target.value)}
          name="search"
          placeholder="yourdomain.com"
          value={input}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Info Gathering" value={cardScanInfoGathering} />
        <div className="flex flex-col overflow-auto rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <h1 className="mb-4 text-lg font-semibold">Scan Result</h1>
          {!loading ? (
            <JsonView
              data={scanResult !== undefined ? scanResult : {}}
              shouldInitiallyExpand={allExpanded}
              style={defaultStyles}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  )
}

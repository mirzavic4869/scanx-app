import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan } from '@/components/card'
import { useState } from 'react'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL, cardScanInfoGathering } from '@/components/lib'

export default function VirusTotal() {
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
        method: 'post',
        url: `${baseURL}/virustotalscan_react`,

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
      await Swal.fire('Sorry', error.message, 'error')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">Virus Total</h1>
      <div className="mb-4 flex flex-row justify-between gap-4">
        <Input
          type={'text'}
          name="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yourdomain.com"
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Info Gathering" value={cardScanInfoGathering} />
        <div className="flex flex-col rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <h1 className="mb-6 text-lg font-semibold">
            Virus Total Scan Results
          </h1>
          {scanResult?.length === 0 ? (
            <p>No result found</p>
          ) : !loading && scanResult ? (
            <>
              <p className="mb-4">URL: {scanResult.url}</p>
              <p className="mb-4">Scan date: {scanResult.scan_date}</p>
              <p className="mb-4">Positives: {scanResult.positives}</p>
              <p className="mb-4">Total: {scanResult.total}</p>
              <strong>Scan Result:</strong>
              <ul className="ml-6 list-disc">
                {scanResult &&
                  Object?.entries(scanResult?.scans).map(
                    ([key, value], index) => (
                      <li key={key}>
                        <p key={index}></p>
                        {key} : {value.result}
                      </li>
                    )
                  )}
              </ul>
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

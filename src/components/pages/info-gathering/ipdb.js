import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CardScan, CardResult } from '@/components/card'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL, cardScanInfoGathering } from '@/components/lib'

export default function Ipdb() {
  const router = useRouter()
  const session = getCookie('session')
  const [input, setInput] = useState('')
  const [scanResult, setScanResult] = useState({})
  const [hostname, setHostname] = useState([])
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
        url: `${baseURL}/ipdbscan_react`,

        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        data: payload,
      })
      setScanResult(result.data.data)
      setHostname(result.data?.data?.hostnames)
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
      <h1 className="mb-5 text-lg font-semibold md:text-xl">Abuse Ipdb</h1>
      <div className="mb-4 flex flex-row justify-between gap-4">
        <Input
          onChange={(e) => setInput(e.target.value)}
          name="search"
          placeholder="127.0.0.1"
          value={input}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-3 lg:grid-cols-5">
        <CardScan title="Info Gathering" value={cardScanInfoGathering} />
        <div className="flex flex-col rounded bg-white p-4 shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
          <h1 className="mb-4 text-lg font-semibold">Scan Result</h1>
          {!loading ? (
            <div>
              <p>
                IP Address:{' '}
                {scanResult?.ipAddress === undefined
                  ? '-'
                  : scanResult?.ipAddress}
              </p>
              <p>
                Is Public:{' '}
                {scanResult?.isPublic === undefined
                  ? '-'
                  : String(scanResult?.isPublic)}
              </p>
              <p>
                IP Version:{' '}
                {scanResult?.ipVersion === undefined
                  ? '-'
                  : scanResult?.ipVersion}
              </p>
              <p>
                Is Whitelisted:{' '}
                {scanResult?.isWhitelisted === undefined
                  ? '-'
                  : String(scanResult?.isWhitelisted)}
              </p>
              <p>
                Abuse Confidence Score:{' '}
                {scanResult?.abuseConfidenceScore === undefined
                  ? '-'
                  : scanResult?.abuseConfidenceScore}
              </p>
              <p>
                Country Code:{' '}
                {scanResult?.countryCode === undefined
                  ? '-'
                  : scanResult?.countryCode}
              </p>
              <p>
                Usage Type:{' '}
                {scanResult?.usageType === undefined
                  ? '-'
                  : scanResult?.usageType}
              </p>
              <p>
                ISP: {scanResult?.isp === undefined ? '-' : scanResult?.isp}
              </p>
              <p>
                Domain:{' '}
                {scanResult?.domain === undefined ? '-' : scanResult?.domain}
              </p>
              {hostname?.map((hostname, index) => (
                <div key={index}>
                  <p>Hostname: {hostname}</p>
                </div>
              ))}

              <p>
                Total Reports:{' '}
                {scanResult?.totalReports === undefined
                  ? '-'
                  : scanResult?.totalReports}
              </p>
              <p>
                Num Distinct Users:{' '}
                {scanResult?.numDistinctUsers === undefined
                  ? '-'
                  : scanResult?.numDistinctUsers}
              </p>
              <p>
                Last Reported At:{' '}
                {scanResult?.lastReportedAt === undefined
                  ? '-'
                  : scanResult?.lastReportedAt}
              </p>
            </div>
          ) : (
            <div className="mx-auto flex justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

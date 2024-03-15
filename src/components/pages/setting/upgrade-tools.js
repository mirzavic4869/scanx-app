import { Button } from '@/components/button'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { Input } from '@/components/input'
import { baseURL } from '@/components/lib'

export default function UpgradeTools() {
  const router = useRouter()
  const [upgradeResult, setUpgradeResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const session = getCookie('session')

  const handleUpgrade = (e) => {
    e.preventDefault()
    toUpgrade(input)
  }

  async function toUpgrade(input) {
    try {
      setLoading(true)
      const payload = {
        command: input,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/popupcli`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: JSON.stringify(payload),
      })
      console.log(result.data)
      setUpgradeResult(result.data.output)
      setLoading(false)
      setInput('')
    } catch (error) {
      await Swal.fire('Sorry', error.response.data.error_message, 'error')
      setLoading(false)
    }
  }

  return (
    <>
      <p className="mb-4 text-lg font-semibold md:text-xl">Upgrade Tools</p>
      <div className="mb-4 flex flex-row items-center justify-between gap-4">
        <Input
          onChange={(e) => setInput(e.target.value)}
          name="search"
          placeholder="pip upgrade shodan/ipdb/nmap/whois/virustotal/webapp/vulnscan/subdomain/wordpress/all"
          value={input}
        />
        <Button onClick={handleUpgrade}>upgrade</Button>
      </div>
      <div className="rounded-md bg-white p-6 shadow-sm hover:shadow-md">
        <h1 className="mb-4 text-lg font-semibold">Latest Upgrade</h1>
        {!loading ? <p className="italic">{upgradeResult}</p> : <Loading />}
      </div>
    </>
  )
}

import { Button } from '@/components/button'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { useRouter } from 'next/router'
import { baseURL } from '@/components/lib'

export default function UpdateCVE() {
  const router = useRouter()
  const [updateResult, setUpdateResult] = useState()
  const [listVersion, setListVersion] = useState([])
  const [loading, setLoading] = useState(false)
  const session = getCookie('session')

  const handleSubmit = (e) => {
    e.preventDefault()
    getUpdateCVE()
  }

  async function getUpdateCVE() {
    try {
      setLoading(true)
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/vuln/update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setUpdateResult(result.data)
      setLoading(false)
    } catch (error) {
      await Swal.fire('Sorry', error.message, 'error')

      console.log(error)
    }
  }

  const getListUpdateVersion = useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/vuln/version`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListVersion(result.data)
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }, [router, session])

  useEffect(() => {
    getListUpdateVersion()
  }, [getListUpdateVersion])

  return (
    <>
      <p className="mb-4 text-lg font-semibold md:text-2xl">
        Update CVE Version
      </p>
      <div className="mb-4 flex flex-row items-center gap-4 rounded-md bg-white p-6 shadow-sm hover:shadow-md">
        <Button onClick={handleSubmit}>update</Button>
        {updateResult && (
          <p className="font-semibold italic">
            Now you are using the latest version
          </p>
        )}
      </div>
      {/* Table Result */}
      <div className="relative w-full overflow-x-auto whitespace-nowrap rounded-lg shadow-sm hover:shadow-md">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                last update
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              listVersion.map((item, index) => (
                <tr
                  className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                  key={index}
                >
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.last_update}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-8">
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

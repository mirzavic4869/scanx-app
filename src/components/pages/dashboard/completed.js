import { baseURL } from '@/components/lib'
import { Loading } from '@/components/loading'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Completed() {
  const router = useRouter()
  const session = getCookie('session')
  const [listComplete, setListComplete] = useState()
  const [loading, setLoading] = useState(false)

  const getListCompleted = useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/dashboard`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListComplete(result.data.result.scan_by_user.latest_scanned)
      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
      setLoading(false)
    }
  }, [session, router])

  useEffect(() => {
    getListCompleted()
  }, [getListCompleted])

  return (
    <div className="flex flex-col mt-6">
      <h1 className="mb-5 text-lg font-semibold md:text-xl ">
        Completed Scans
      </h1>
      <div className="relative w-full overflow-x-auto rounded-md shadow-sm whitespace-nowrap hover:shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-white uppercase bg-bg_primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                scan date
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                target url
              </th>
              <th scope="col" className="px-6 py-3">
                tool name
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && listComplete ? (
              listComplete.map((item) => (
                <tr
                  className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                  key={item.id}
                >
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.scan_date}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.target_url}</td>
                  <td className="px-6 py-4">{item.toolname}</td>
                </tr>
              ))
            ) : listComplete === false && loading === true ? (
              <Loading />
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

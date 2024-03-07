import { Button } from '@/components/button'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import Router, { useRouter } from 'next/router'
import { Input } from '@/components/input'
import { FaFilter, FaSort } from 'react-icons/fa'
import { baseURL } from '@/components/lib'

export default function CWE() {
  // const router = useRouter()
  const router = useRouter()
  const [listCVE, setlistCVE] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchCWE, setSearchCWE] = useState('')
  const session = getCookie('session')

  const handleSearch = (e) => {
    e.preventDefault()
    Router.push({ pathname: '/vuln/cwe', query: searchCWE })
    getListCWE(searchCWE)
  }

  const getListCWE = useCallback(
    async (searchCWE) => {
      try {
        setLoading(true)
        const payload = searchCWE
        const result = await axios({
          method: 'GET',
          url: `${baseURL}/vuln/cwe?q=${searchCWE}`,
          data: payload,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        setlistCVE(result.data)
        setLoading(false)
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
        setLoading(false)
      }
    },
    [session, router]
  )

  useEffect(() => {
    getListCWE(searchCWE)
  }, [getListCWE, searchCWE])

  return (
    <>
      <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
        <div className="flex flex-row items-center gap-4">
          <p className="text-lg font-semibold md:text-2xl">CWE</p>
          <Input
            type="text"
            defaultValue={searchCWE}
            onChange={(e) => setSearchCWE(e.target.value)}
            placeholder="Search"
          />
          <Button onClick={handleSearch}>search</Button>
        </div>
      </div>

      {/* Card Result */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!loading ? (
          listCVE.map((item) => (
            <div
              key={item.cwe_id}
              className="rounded-md bg-white p-6 shadow-lg transition-all duration-500 ease-in-out hover:bg-[#475defff] hover:text-white hover:shadow-xl"
            >
              <p className="mb-4 text-xl font-semibold">{item.cwe_id}</p>
              <p className="mb-2 text-sm">{item.descr}</p>
              <p className="text-sm italic">{item.name}</p>
            </div>
          ))
        ) : (
          <div className="mx-auto flex justify-center p-8">
            <Loading />
          </div>
        )}
      </div>
    </>
  )
}

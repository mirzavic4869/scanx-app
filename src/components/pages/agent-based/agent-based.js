import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { baseURL } from '@/components/lib'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'
import { FaDownload, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function AgentBased() {
  const router = useRouter()
  const session = getCookie('session')
  const role = getCookie('role')
  const [listItem, setListItem] = useState([])
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedHost, setSelectedHost] = useState()
  const [optionHost, setOptionHost] = useState([])
  const [hostname, setHostname] = useState('')
  const [scanResult, setScanResult] = useState('')

  const search = (data) => {
    return data.filter(
      (item) =>
        item.host?.address.toLowerCase().includes(query) ||
        item.scan_start_time?.toLowerCase().includes(query) ||
        item.scan_end_time?.toLowerCase().includes(query) ||
        item.host?.status.toLowerCase().includes(query)
    )
  }

  const handleSearch = () => {
    setSearchResult(search(listItem))
  }

  useEffect(() => {
    setSearchResult(listItem)
  }, [listItem])

  const handleDetail = async (id) => {
    try {
      await router.push(`/agent-based/detail/${id}`)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  const getListItem = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/agent-results-user`,
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
      })
      setListItem(result.data.result)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }, [session, router])

  // const handleChange = (e) => {
  //   setSelectedHost(e.target.value)
  //   console.log(e.target.value)
  // }

  // const getHost = useCallback(async () => {
  //   try {
  //     const result = await axios.get(`${baseURL}/agent-hosts`)
  //     setOptionHost(result.data.result)
  //   } catch (error) {
  //     if (error.response?.status === 422) {
  //       await Swal.fire('Sorry', error.response.data.msg, 'error')
  //       deleteCookie('session')
  //       router.push('/login')
  //     }
  //   }
  // }, [router])

  useEffect(() => {
    getListItem()
  }, [getListItem])

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Swal.fire('Deleted!', 'Data user has been deleted.', 'success')
          await axios({
            method: 'DELETE',
            url: `${baseURL}/agent-result/${id}`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session}`,
            },
          })
          getListItem()
        }
      })
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toScan(hostname)
  }

  async function toScan(hostname) {
    try {
      const payload = {
        host: hostname,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/create-agent-key`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: JSON.stringify(payload),
      })
      setHostname('')
      await Swal.fire('Webhook Token', result.data.api_key, 'success')
      getListItem()
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', error.response?.statusText, 'error')
      } else {
        await Swal.fire('Sorry', 'Data harus diisi!', 'error')
      }
    }
  }

  const handleDownloadExe = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/download_agent`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      console.log(result)
    } catch (error) {
      console.log(error)
      await Swal.fire('Sorry', error.response?.statusText, 'error')
    }
  }, [session])

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p className="mb-4 text-lg font-semibold md:text-2xl">Agent Based</p>
        <div
          onClick={handleDownloadExe}
          className="mb-4 flex flex-row items-center gap-2 hover:cursor-pointer hover:text-[#475defff]"
        >
          <p>Download .exe</p>
          <i>
            <FaDownload />
          </i>
        </div>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between gap-4">
        {/* <select
          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
          onChange={handleChange}
          value={selectedHost}
        >
          <option value="" disabled selected>
            Select host
          </option>
          {optionHost.map((option) => (
            <option key={option.id} value={option.id}>
              {option.host}
            </option>
          ))}
        </select> */}
        <Input
          placeholder={'Search'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>{'filter'}</Button>
        <Input
          placeholder={'goapp.co.id'}
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
        />
        <Button onClick={handleSubmit}>{'generate'}</Button>
      </div>
      <div className="relative w-full overflow-x-auto scroll-smooth whitespace-nowrap rounded-lg">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                host
              </th>
              <th scope="col" className="px-6 py-3">
                scan-start
              </th>
              <th scope="col" className="px-6 py-3">
                scan-end
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                total-cve
              </th>
              <th colSpan={2} scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item, index) => (
              <tr
                className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                key={index}
              >
                <td className="px-6 py-4">{item.data.host?.address}</td>
                <td className="px-6 py-4">{item.data.scan_start_time}</td>
                <td className="px-6 py-4">{item.data.scan_end_time}</td>
                <td className="px-6 py-4">{item.data.host?.status}</td>
                <td className="px-6 py-4">
                  {item.data.host.ports.reduce((acc, port) => {
                    if (port.suspect !== null) {
                      return (
                        acc +
                        port.suspect.reduce((acc2, suspect) => {
                          return (
                            acc2 +
                            suspect.vulns.filter((vuln) => vuln.type === 'cve')
                              .length
                          )
                        }, 0)
                      )
                    }
                    return acc
                  }, 0)}
                </td>
                <td
                  onClick={() => handleDetail(item.id)}
                  className="flex cursor-pointer items-center space-x-3 px-6 py-4 text-[#475defff]"
                >
                  Detail
                </td>
                {role === 'moderator' || role === 'super_admin' ? (
                  <td className="py-4 pr-6">
                    <FaTrash
                      onClick={() => handleDelete(item.id)}
                      className="hover:cursor-pointer"
                      color="#dc3545"
                    />
                  </td>
                ) : null}
              </tr>
            ))}
            {searchResult.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-center font-bold" colSpan={6}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

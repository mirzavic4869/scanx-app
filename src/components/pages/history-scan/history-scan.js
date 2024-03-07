import { baseURL } from '@/components/lib'
import { Loading } from '@/components/loading'
import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FaDownload, FaEye, FaPause, FaPlay, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function HistoryScan() {
  const router = useRouter()
  const session = getCookie('session')
  const role = getCookie('role')
  const [listItem, setListItem] = useState()
  const [loading, setLoading] = useState(false)

  const getListItem = useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/historyscan_react`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListItem(result.data)
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
  }, [router, session])

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
            url: `${baseURL}/historyscan_react/${id}`,
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

  async function downloadReport(queue_id, toolname, target_ip) {
    try {
      setLoading(true)
      await axios({
        method: 'GET',
        url: `${baseURL}/download_scan_results/${queue_id}/${toolname}/${target_ip}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      router.push(
        `${baseURL}/download_scan_results/${queue_id}/${toolname}/${target_ip}`
      )
      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      } else if (error.response?.status === 404) {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
      } else {
        await Swal.fire('Sorry', error.message, 'error')
      }
      setLoading(false)
    }
  }

  const handleDownloadReport = (queue_id, toolname, target_ip) => {
    downloadReport(queue_id, toolname, target_ip)
  }

  const handlePreviewReport = useCallback(
    async (queue_id, toolname, target_ip) => {
      try {
        setLoading(true)
        await axios({
          method: 'GET',
          url: `${baseURL}/preview_scan_results/${queue_id}/${toolname}/${target_ip}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        getListItem()
        setLoading(false)
      } catch (error) {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
        setLoading(false)
      }
    },
    [getListItem, session]
  )

  async function pauseProcess(queue_id) {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/pause_resume/${queue_id}/PAUSE`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      await Swal.fire('Success', result.data.message, 'success')
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      } else {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
      }
      setLoading(false)
    }
  }

  const handlePause = (queue_id) => {
    pauseProcess(queue_id)
  }

  async function resumeProcess(queue_id) {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/pause_resume/${queue_id}/RESUME`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      await Swal.fire('Success', result.data.message, 'success')
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      } else {
        await Swal.fire('Sorry', error.response.data.error_message, 'error')
      }
      setLoading(false)
    }
  }

  const handleResume = (queue_id) => {
    resumeProcess(queue_id)
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">History Scans</h1>
      <div className="relative w-full overflow-x-auto scroll-smooth whitespace-nowrap rounded-lg">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                queue id
              </th>
              <th scope="col" className="px-6 py-3">
                scan date
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th colSpan={3} scope="col" className="px-6 py-3">
                report
              </th>
              <th scope="col" className="px-6 py-3">
                target url
              </th>
              <th scope="col" className="px-6 py-3">
                tool name
              </th>
              <th colSpan={2} scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {!loading && listItem ? (
              listItem.map((item) => (
                <tr
                  className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                  key={item.id}
                >
                  <td className="px-6 py-4">{item.queue_id}</td>
                  <td className="px-6 py-4">{item.scan_date}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.target_ip}</td>
                  <td className="px-2 py-4">
                    <Link
                      href={`${baseURL}/preview_scan_results/${item.queue_id}/${item.toolname}/${item.target_ip}`}
                      target="_blank"
                    >
                      <FaEye
                        className="hover:cursor-pointer hover:text-[#475defff]"
                        onClick={() =>
                          handlePreviewReport(
                            item.queue_id,
                            item.toolname,
                            item.target_ip
                          )
                        }
                      />
                    </Link>
                  </td>
                  <td className="px-2 py-4">
                    <FaDownload
                      aria-disabled
                      className="hover:cursor-pointer hover:text-[#475defff]"
                      onClick={() =>
                        handleDownloadReport(
                          item.queue_id,
                          item.toolname,
                          item.target_ip
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4">{item.target_url}</td>
                  <td className="px-6 py-4">{item.toolname}</td>
                  {role === 'moderator' || role === 'super_admin' ? (
                    <>
                      <td className="py-4">
                        <FaPause
                          onClick={() => handlePause(item.queue_id)}
                          className="hover:cursor-pointer"
                          color="#475defff"
                        />
                      </td>
                      <td className="py-4">
                        <FaPlay
                          onClick={() => handleResume(item.queue_id)}
                          className="hover:cursor-pointer"
                          color="#475defff"
                        />
                      </td>
                    </>
                  ) : null}
                  {role === 'moderator' || role === 'super_admin' ? (
                    <td className="py-4 pr-6">
                      <FaTrash
                        className="hover:cursor-pointer"
                        color="#dc3545"
                        onClick={() => handleDelete(item.queue_id)}
                      />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : listItem === false && loading === true ? (
              <Loading />
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

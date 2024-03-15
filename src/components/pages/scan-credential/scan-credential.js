import { Button } from '@/components/button'
import { baseURL } from '@/components/lib'
import { ScanCredentialModal } from '@/components/modal'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FaDownload, FaPause, FaPlay, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function ScanCredential() {
  const router = useRouter()
  const [listItem, setListItem] = useState({})
  const [pause, setPause] = useState('')
  const [resume, setResume] = useState('')
  const session = getCookie('session')
  const role = getCookie('role')
  const [isOpen, setIsOpen] = useState(false)
  const [detailItems, setDetailItems] = useState({})

  const getListItem = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/with-credential/scans`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListItem(result.data)
    } catch (error) {
      console.log(error)
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }, [session, router])

  useEffect(() => {
    getListItem()
  }, [getListItem])

  const getDetailItem = useCallback(
    async (id) => {
      try {
        const result = await axios({
          method: 'GET',
          url: `${baseURL}/with-credential/scans/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        return result.data
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
      }
    },
    [session, router]
  )

  const fetchDataDetail = useCallback(
    async (id) => {
      const detailItem = await getDetailItem(id)
      setDetailItems((prevDetailItems) => ({
        ...prevDetailItems,
        [id]: detailItem,
      }))
    },
    [getDetailItem]
  )

  useEffect(() => {
    Object.keys(listItem).forEach((item) => {
      fetchDataDetail(item)
    })
  }, [listItem, fetchDataDetail])

  async function pauseScan(id) {
    try {
      const result = await axios({
        method: 'PUT',
        url: `${baseURL}/with-credential/scans/${id}/pause`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setPause(result.data)
      Swal.fire('Proses scan berhenti')
    } catch (error) {
      console.log(error)
    }
  }

  async function resumeScan(id) {
    try {
      const result = await axios({
        method: 'PUT',
        url: `${baseURL}/with-credential/scans/${id}/resume`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setResume(result.data)
      Swal.fire('Sedang dalam proses scan')
    } catch (error) {
      console.log(error)
    }
  }

  async function getDownload(id) {
    try {
      await axios({
        method: 'GET',
        url: `${baseURL}/with-credential/scans/${id}/report.html.zip`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      router.push(`${baseURL}/with-credential/scans/${id}/report.html.zip`)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  const handleDetail = (id) => {
    router.push(`/scan-credential/detail/${id}`)
  }

  const handlePause = (id) => {
    pauseScan(id)
  }

  const handleResume = (id) => {
    resumeScan(id)
  }

  const handleDownload = (id) => {
    getDownload(id)
  }

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
            url: `${baseURL}/with-credential/scans/${id}`,
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

  return (
    <>
      <div className="mb-4 flex justify-between">
        <p className="text-lg font-semibold md:text-xl">Scan with Credential</p>
        <Button onClick={() => setIsOpen(!isOpen)}>+ADD</Button>
      </div>
      <div className="relative overflow-x-auto rounded-lg shadow-sm hover:shadow-md">
        <table className="w-full bg-white text-left text-sm">
          <thead className="bg-bg_primary text-xs uppercase text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                target url
              </th>
              <th scope="col" className="px-6 py-3">
                url token
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                runtime
              </th>
              <th colSpan={4} scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {listItem &&
              Object.keys(listItem).map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4">
                    {detailItems[item] &&
                      detailItems[item].statistics.current_page}
                  </td>
                  <td
                    onClick={() => handleDetail(item)}
                    className="px-6 py-4 hover:cursor-pointer hover:text-primary"
                  >
                    {item}
                  </td>
                  <td className="px-6 py-3">
                    {detailItems[item] && detailItems[item].status}
                  </td>
                  <td className="px-6 py-3">
                    {detailItems[item] && detailItems[item].statistics.runtime}
                  </td>
                  <td className="flex flex-row gap-4 px-6 py-4 hover:cursor-pointer">
                    <FaPause
                      onClick={() => handlePause(item)}
                      color="#475defff"
                    />
                    <FaPlay
                      onClick={() => handleResume(item)}
                      color="#475defff"
                    />
                    <FaDownload
                      onClick={() => handleDownload(item)}
                      color="#475defff"
                    />
                    {role === 'moderator' || role === 'super_admin' ? (
                      <FaTrash
                        color="#dc3545"
                        onClick={() => handleDelete(item)}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Modal */}
        <ScanCredentialModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          getListItem={getListItem}
        />
      </div>
    </>
  )
}

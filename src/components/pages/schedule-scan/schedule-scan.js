import { Button } from '@/components/button'
import { baseURL } from '@/components/lib'
import { Loading } from '@/components/loading'
import { AddScanScheduleModal } from '@/components/modal'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function ScheduleScan() {
  const router = useRouter()
  const session = getCookie('session')
  const [listItem, setListItem] = useState()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const getListItem = useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/scheduler`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListItem(result.data.schedule)
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
  }, [session, router])

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
          const payload = {
            schedule_job_id: id,
          }
          await axios({
            method: 'DELETE',
            url: `${baseURL}/scheduler`,
            data: payload,
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
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Scan Schedule</h1>
        <Button onClick={() => setIsOpen(!isOpen)}>NEW SCAN</Button>
      </div>
      <div className="flex w-full flex-col">
        {/* Table */}
        <div className="relative w-full overflow-x-auto whitespace-nowrap rounded-lg shadow-sm hover:shadow-md">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-bg_primary text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  application
                </th>
                <th scope="col" className="px-6 py-3">
                  frequently
                </th>
                <th scope="col" className="px-6 py-3">
                  repeated days
                </th>
                <th scope="col" className="px-6 py-3">
                  schedule job id
                </th>
                <th scope="col" className="px-6 py-3">
                  target url
                </th>
                <th scope="col" className="px-6 py-3">
                  output format
                </th>
                <th scope="col" className="px-6 py-3">
                  start time
                </th>
                <th scope="col" className="px-6 py-3">
                  end date
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {listItem?.length === 0 ? (
                <tr>
                  <td className="p-4 text-center italic" colSpan={9}>
                    No result found
                  </td>
                </tr>
              ) : !loading && listItem ? (
                listItem.map((item) => (
                  <tr
                    className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                    key={item.schedule_job_id}
                  >
                    <td className="px-6 py-4">{item.application}</td>
                    <td className="px-6 py-4">{item.frequently}</td>
                    <td className="px-6 py-4">
                      {item.repeated_days === '[]' ? '-' : item.repeated_days}
                    </td>
                    <td className="px-6 py-4">{item.schedule_job_id}</td>
                    <td className="px-6 py-4">{item.target_url}</td>
                    <td className="px-6 py-4">{item.output_format}</td>
                    <td className="px-6 py-4">{item.start_time}</td>
                    <td className="px-6 py-4">{item.end_date}</td>
                    <td className="px-6 py-4">
                      <FaTrash
                        className="hover:cursor-pointer"
                        color="#dc3545"
                        onClick={() => handleDelete(item.schedule_job_id)}
                      />
                    </td>
                  </tr>
                ))
              ) : listItem === false && loading === true ? (
                <Loading />
              ) : null}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        <AddScanScheduleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          getListItem={getListItem}
        />
      </div>
    </div>
  )
}

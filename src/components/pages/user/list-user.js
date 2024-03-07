import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { EditUserModal } from '@/components/modal'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Button } from '@/components/button'
import { baseURL } from '@/components/lib'

export default function ListUser() {
  const router = useRouter()
  const session = getCookie('session')
  const [listUser, setListUser] = useState()
  const role = getCookie('role')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [employeeID, setEmployeeID] = useState(undefined)

  const getListUser = useCallback(async () => {
    try {
      setLoading(true)
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/userslist`,
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
      })
      setListUser(result.data.users)
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
      setLoading(false)
    }
  }, [session, router])

  useEffect(() => {
    getListUser()
  }, [getListUser])

  const getUserById = useCallback(
    async (employeeId) => {
      try {
        setIsOpen(!isOpen)
        await axios({
          method: 'GET',
          url: `${baseURL}/user/${employeeId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        setEmployeeID(employeeId)
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
      }
    },
    [isOpen, session, router]
  )

  async function deleteUser(employeeId) {
    try {
      await axios({
        method: 'DELETE',
        url: `${baseURL}/user/delete/${employeeId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      getListUser()
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  function handleDelete(employeeId) {
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
        deleteUser(employeeId)
      }
    })
  }

  async function revokeApi(employeeId) {
    try {
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/revoke_api/${employeeId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      await Swal.fire('Success', result.data.message, 'success')

      // setIsRevoke((pv) => !pv)
      getListUser()
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  async function regenerateApi(employeeId) {
    try {
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/regenerate_api/${employeeId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      await Swal.fire('Success', result.data.message, 'success')

      // setIsRevoke((pv) => !pv)
      getListUser()
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">Users List</h1>
      <div className="relative w-full overflow-x-auto scroll-smooth whitespace-nowrap rounded-lg">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                active
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                api key
              </th>
              <th scope="col" className="px-6 py-3">
                employee id
              </th>
              <th scope="col" className="px-6 py-3">
                first name
              </th>
              <th scope="col" className="px-6 py-3">
                last name
              </th>
              <th scope="col" className="px-6 py-3">
                last login
              </th>
              <th scope="col" className="px-6 py-3">
                revoke api
              </th>
              <th scope="col" className="px-6 py-3">
                moderator
              </th>
              <th scope="col" className="px-6 py-3">
                super admin
              </th>
              <th colSpan={2} scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {!loading && listUser ? (
              listUser.map((item, index) => (
                <tr
                  className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                  key={index}
                >
                  <td className="px-6 py-4">
                    {item.active === 0 ? '-' : <FaCheck color="#475defff" />}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {item.api_key === null ? '-' : item.api_key}
                  </td>
                  <td className="px-6 py-4">{item.employee_id}</td>
                  <td className="px-6 py-4">{item.first_name}</td>
                  <td className="px-6 py-4">{item.last_name}</td>
                  <td className="px-6 py-4">{item.last_login}</td>
                  <td className="px-6 py-4">
                    {item.api_key === null ? (
                      <Button onClick={() => regenerateApi(item.employee_id)}>
                        regenerate
                      </Button>
                    ) : (
                      <Button onClick={() => revokeApi(item.employee_id)}>
                        revoke
                      </Button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.moderator === 0 ? '-' : <FaCheck color="#475defff" />}
                  </td>
                  <td className="px-6 py-4">
                    {item.super_admin === 0 ? (
                      '-'
                    ) : (
                      <FaCheck color="#475defff" />
                    )}
                  </td>
                  <td className="px-3 py-4">
                    <FaEdit
                      className="hover:cursor-pointer"
                      onClick={() => getUserById(item.employee_id)}
                      color="#198754"
                    />
                  </td>
                  {role === 'super_admin' && (
                    <td className="py-4 pr-6">
                      <FaTrash
                        className="hover:cursor-pointer"
                        color="#dc3545"
                        onClick={() => handleDelete(item.employee_id)}
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : listUser === false && loading === true ? (
              <Loading />
            ) : null}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <EditUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        employeeID={employeeID}
        getListUser={getListUser}
      />
    </div>
  )
}

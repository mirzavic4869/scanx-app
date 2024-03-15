import axios from 'axios'
import Link from 'next/link'
import { getCookie, deleteCookie } from 'cookies-next'
import { useState } from 'react'
import {
  FaBars,
  FaDoorOpen,
  FaListUl,
  FaPlusCircle,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { AddUserModal } from '../modal'
import { baseURL } from '../lib'

export default function Header({ showSidebar, isShowSidebar }) {
  const router = useRouter()
  const session = getCookie('session')
  const role = getCookie('role')
  const [active, setActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const result = Swal.fire({
        title: 'Logout Confirmation',
        text: 'Are you sure to logout from this page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      })
      if ((await result).isConfirmed) {
        await axios({
          method: 'GET',
          url: `${baseURL}/logout`,
          headers: {
            Authorization: `Bearer ${session}`,
            'Content-Type': 'application/json',
          },
        })
        deleteCookie('session')
        router.push(`/login`)
      }
    } catch (error) {
      if (error.response?.status === 422) {
        deleteCookie('session')
        router.push('/login')
      }
      console.log(error)
    }
  }
  return (
    <div className="sticky top-0 z-40 p-4 bg-white shadow-sm rounded-xl">
      <div className="flex flex-row items-center justify-end max-w-full mx-auto">
        <div className="flex flex-row items-center gap-4">
          {!isShowSidebar ? (
            <FaBars className="md:hidden" onClick={showSidebar} />
          ) : (
            <FaTimes className="md:hidden" onClick={showSidebar} />
          )}
          <div className="relative">
            <FaUserCircle
              className="hover:cursor-pointer hover:text-primary"
              onClick={() => setActive((pv) => !pv)}
              size={24}
            />

            {active && (
              <div
                onMouseLeave={() => setActive(false)}
                className="absolute z-10 py-4 transition-all duration-700 ease-out bg-white rounded-md shadow-xl right-4 w-max px-7"
              >
                <div className="flex flex-col gap-3 text-sm font">
                  {role === 'moderator' || role === 'super_admin' ? (
                    <div
                      onClick={() => setIsOpen((pv) => !pv)}
                      className="flex flex-row items-center gap-3 hover:cursor-pointer hover:text-primary"
                    >
                      <FaPlusCircle size={16} />
                      <p>Add User</p>
                    </div>
                  ) : null}
                  {role === 'super_admin' && (
                    <>
                      <Link href="/user/list-user">
                        <div className="flex flex-row items-center gap-3 hover:cursor-pointer hover:text-primary">
                          <FaListUl size={16} />
                          <p>List User</p>
                        </div>
                      </Link>
                    </>
                  )}
                  <div
                    onClick={handleLogout}
                    className="flex flex-row items-center gap-3 hover:cursor-pointer hover:text-primary"
                  >
                    <FaDoorOpen size={16} />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Modal */}
        <AddUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

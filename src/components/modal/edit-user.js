import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from '../input'
import { Button } from '../button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { baseURL } from '../lib'

export default function EditUserModal({
  isOpen,
  onClose,
  employeeID,
  getListUser,
}) {
  const router = useRouter()
  const session = getCookie('session')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [moderator, setModerator] = useState('0')
  const [superAdmin, setSuperAdmin] = useState('0')

  const handleUpdate = (e) => {
    e.preventDefault()
    updateUser(firstName, lastName, email, moderator, superAdmin, employeeID)
  }

  const handleCheckModerator = () => {
    setModerator(moderator === '0' ? '1' : '0')
  }
  const handleCheckSuperAdmin = () => {
    setSuperAdmin(superAdmin === '0' ? '1' : '0')
  }

  async function updateUser(
    firstName,
    lastName,
    email,
    moderator,
    superAdmin,
    employeeId
  ) {
    try {
      const payload = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        moderator: moderator,
        super_admin: superAdmin,
      })
      await axios({
        method: 'PUT',
        url: `${baseURL}/user/${employeeId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: payload,
      })
      await Swal.fire('Success', 'Data berhasil diubah', 'success')
      onClose()
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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                  >
                    <p>Edit User</p>
                    <FaTimes
                      className="hover:cursor-pointer"
                      onClick={onClose}
                    />
                  </Dialog.Title>
                  <div>
                    <fieldset className="my-2">
                      <p className="mb-2">First Name</p>
                      <Input
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                      />
                    </fieldset>
                    <fieldset className="my-2">
                      <p className="mb-2">Last Name</p>
                      <Input
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                      />
                    </fieldset>
                    <fieldset className="my-2">
                      <p className="mb-2">Email</p>
                      <Input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@gmail.com"
                      />
                    </fieldset>
                    <fieldset className="my-2">
                      <p className="mb-2">Role</p>
                      <label className="mr-4 text-sm">
                        <input
                          type="checkbox"
                          onChange={handleCheckModerator}
                        />{' '}
                        Moderator
                      </label>
                      <label className="text-sm">
                        <input
                          type="checkbox"
                          onChange={handleCheckSuperAdmin}
                        />{' '}
                        Super Admin
                      </label>
                    </fieldset>
                    {/* <fieldset className="my-2">
                      <p className="mb-2">Moderator</p>
                      <Input
                        onChange={(e) => setModerator(e.target.value)}
                        placeholder="1"
                      />
                    </fieldset>
                    <fieldset className="my-2">
                      <p className="mb-2">Super Admin</p>
                      <Input
                        onChange={(e) => setSuperAdmin(e.target.value)}
                        placeholder="1"
                      />
                    </fieldset> */}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleUpdate}>UPDATE</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

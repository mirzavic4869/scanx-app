import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from '../input'
import { Button } from '../button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { baseURL } from '../lib'

export default function AddUserModal({ isOpen, onClose }) {
  const router = useRouter()
  const session = getCookie('session')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    addUser(firstName, lastName, email, password)
  }

  async function addUser(firstName, lastName, email, password) {
    try {
      const payload = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/signup`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: payload,
      })
      await Swal.fire('Success', 'Data berhasil ditambahkan', 'success')
      onClose()
      setCookie('api_key', result.data.api_key)
      setCookie('user_id', result.data.user_id)
      router.push('/setting/api-key')
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
                    <p>Add User</p>
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
                      <p className="mb-2">Password</p>
                      <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </fieldset>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleAdd}>+ADD</Button>
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

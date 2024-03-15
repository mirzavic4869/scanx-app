import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from '../input'
import { Button } from '../button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { baseURL, optionPassword, optionService, optionUsername } from '../lib'

export default function BruteForceModal({ isOpen, onClose, setScanResult }) {
  const session = getCookie('session')
  const router = useRouter()
  const [inputTargetHost, setInputTargetHost] = useState('')
  const [inputTargetPort, setInputTargetPort] = useState('')
  const [inputListUsername, setInputListUsername] = useState('')
  const [inputListPassword, setInputListPassword] = useState('')
  const [inputService, setInputService] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    toScan(
      inputTargetHost,
      inputTargetPort,
      inputListUsername,
      inputListPassword,
      inputService
    )
  }

  async function toScan(
    inputTargetHost,
    inputTargetPort,
    inputListUsername,
    inputListPassword,
    inputService
  ) {
    try {
      const payload = {
        target_host: inputTargetHost,
        target_port: inputTargetPort,
        list_username: inputListUsername,
        list_password: inputListPassword,
        service: inputService,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/wpscanbruteforcescan`,
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json',
        },
        data: payload,
      })
      setScanResult(result.data.task_id)
      setInputTargetHost('')
      setInputTargetPort('')
      setInputListUsername('')
      setInputListPassword('')
      setInputService('')
      await Swal.fire('Success', 'Data berhasil ditambahkan', 'success')
      onClose()
    } catch (error) {
      console.log(error)
      await Swal.fire('Sorry', 'Data harus diisi!', 'error')
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                  >
                    <p>New Scan</p>
                    <FaTimes
                      className="hover:cursor-pointer"
                      onClick={onClose}
                    />
                  </Dialog.Title>
                  <div className="flex flex-col justify-between md:flex-row md:items-start md:gap-6">
                    <div>
                      <fieldset className="my-4">
                        <p className="mb-2">Target Host</p>
                        <Input
                          onChange={(e) => setInputTargetHost(e.target.value)}
                          placeholder="http://website.com"
                          value={inputTargetHost}
                        />
                      </fieldset>
                      <fieldset className="my-4">
                        <p className="mb-2">Target Port</p>
                        <Input
                          onChange={(e) => setInputTargetPort(e.target.value)}
                          placeholder="/login"
                          value={inputTargetPort}
                        />
                      </fieldset>
                      <fieldset className="my-4">
                        <p className="mb-2">List Username</p>
                        <select
                          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
                          onChange={(e) => setInputListUsername(e.target.value)}
                          value={inputListUsername}
                        >
                          {optionUsername.map((option) => (
                            <option
                              className="text-sm"
                              key={option.value}
                              value={option.value}
                            >
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </div>
                    <div>
                      <fieldset className="my-4">
                        <p className="mb-2">List Password</p>
                        <select
                          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
                          onChange={(e) => setInputListPassword(e.target.value)}
                          value={inputListPassword}
                        >
                          {optionPassword.map((option) => (
                            <option
                              className="text-sm"
                              key={option.value}
                              value={option.value}
                            >
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                      <fieldset className="my-4">
                        <p className="mb-2">Service</p>
                        <select
                          className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
                          onChange={(e) => setInputService(e.target.value)}
                          value={inputService}
                        >
                          {optionService.map((option) => (
                            <option
                              className="text-sm"
                              key={option.value}
                              value={option.value}
                            >
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleSubmit}>+ADD</Button>
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

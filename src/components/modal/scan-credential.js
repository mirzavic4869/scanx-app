import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from '../input'
import { Button } from '../button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ScanCredentialToggle } from '../toggle'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { baseURL } from '../lib'

export default function ScanCredentialModal({ isOpen, onClose, getListItem }) {
  const router = useRouter()
  const session = getCookie('session')
  const [url, setUrl] = useState('')
  const [urlLogin, setUrlLogin] = useState('')
  const [keyParam1, setKeyParam1] = useState('')
  const [keyParam2, setKeyParam2] = useState('')
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [check, setCheck] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [email, setEmail] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [addInput, setAddInput] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    addCredential(
      url,
      user,
      pass,
      email,
      urlLogin,
      keyParam1,
      keyParam2,
      userName,
      passWord,
      check
    )
  }

  async function addCredential(
    url,
    user,
    pass,
    email,
    urlLogin,
    keyParam1,
    keyParam2,
    userName,
    passWord,
    check
  ) {
    try {
      const payload = JSON.stringify({
        url: url,
        input: {
          default_values: {
            '(?i-mx:user)': user,
            '(?i-mx:pass)': pass,
            '(?i-mx:email)': email,
          },
        },
        plugins: {
          autologin: {
            url: urlLogin,
            parameters: `${keyParam1}=${userName}&${keyParam2}=${passWord}`,
            check: check,
          },
        },
      })
      await axios({
        method: 'POST',
        url: `${baseURL}/with-credential/scans`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: payload,
      })
      await Swal.fire('Success', 'Data berhasil ditambahkan', 'success')
      setUrl('')
      setUrlLogin('')
      setKeyParam1('')
      setKeyParam2('')
      setUserName('')
      setPassWord('')
      setCheck('')
      setUser('')
      setPass('')
      setEmail('')
      onClose()
      getListItem()
    } catch (error) {
      await Swal.fire('Sorry', error.message, 'error')
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                  <div>
                    <div>
                      <fieldset className="my-2">
                        <p className="mb-2">URL</p>
                        <Input
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="http://yourdomain.com"
                          value={url}
                        />
                      </fieldset>
                    </div>
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                      <div className="w-full">
                        <fieldset className="my-2">
                          <p className="mb-2">URL Login</p>
                          <Input
                            onChange={(e) => setUrlLogin(e.target.value)}
                            placeholder="http://yourdomain.com/login"
                            value={urlLogin}
                          />
                        </fieldset>
                        <fieldset className="my-2">
                          <p className="mb-2">Param 1</p>
                          <Input
                            onChange={(e) => setKeyParam1(e.target.value)}
                            placeholder="uname"
                            value={keyParam1}
                          />
                        </fieldset>
                        <fieldset className="my-2">
                          <p className="mb-2">Param 2</p>
                          <Input
                            onChange={(e) => setKeyParam2(e.target.value)}
                            placeholder="pass"
                            value={keyParam2}
                          />
                        </fieldset>
                        <fieldset className="my-2">
                          <p className="mb-2">Username</p>
                          <Input
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="username"
                            value={userName}
                          />
                        </fieldset>
                        <fieldset className="my-2">
                          <p className="mb-2">Password</p>
                          <Input
                            onChange={(e) => setPassWord(e.target.value)}
                            placeholder="password"
                            type="password"
                            value={passWord}
                          />
                        </fieldset>
                        <fieldset className="my-2">
                          <p className="mb-2">Check</p>
                          <textarea
                            className="w-full appearance-none rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
                            rows={4}
                            onChange={(e) => setCheck(e.target.value)}
                            placeholder="On this page you can visualize or edit you user information."
                            value={check}
                          />
                        </fieldset>
                      </div>

                      <div className="w-full">
                        <div className="flex items-center gap-4">
                          <ScanCredentialToggle
                            enabled={enabled}
                            setEnabled={setEnabled}
                          />
                          <p className="text-sm italic text-primary">
                            (Optional Value)
                          </p>
                        </div>
                        <fieldset className="my-2">
                          <p className="mb-2">Param 1</p>
                          <div className="flex flex-row items-center">
                            <Input
                              onChange={(e) => setUser(e.target.value)}
                              placeholder="Param 1"
                              disabled={!enabled}
                              classAdd="mr-2"
                              value={user}
                            />
                            <Button onClick={() => setAddInput(true)}>+</Button>
                          </div>
                        </fieldset>
                        {addInput && (
                          <fieldset className="my-2">
                            <p className="mb-2">Param 2</p>
                            <div className="flex flex-row items-center">
                              <Input
                                type="password"
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="Param 2"
                                disabled={!enabled}
                                classAdd="mr-2"
                                value={pass}
                              />
                              <Button onClick={() => setAddInput(true)}>
                                +
                              </Button>
                            </div>
                          </fieldset>
                        )}
                        {addInput && (
                          <fieldset className="my-2">
                            <p className="mb-2">Param 3</p>
                            <Input
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Param 3"
                              disabled={!enabled}
                              value={email}
                            />
                          </fieldset>
                        )}
                      </div>
                    </div>
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

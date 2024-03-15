import { Button } from '@/components/button'
import Image from 'next/image'
import { Input } from '@/components/input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { setCookie, getCookie } from 'cookies-next'
import logoRISSLogin from '@/assets/images/riss-logo-login.svg'
import logoLogin from '@/assets/images/logo-scanx-white.png'
import { baseURL } from '@/components/lib'

export default function Login() {
  const router = useRouter()
  const session = getCookie('session')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (session) {
      router.push({ pathname: '/' })
    }
  }, [router, session])

  const handleSubmit = (e) => {
    e.preventDefault()
    toLogin(email, password)
  }

  async function toLogin(email, password) {
    try {
      const payload = {
        email: email,
        password: password,
      }
      const result = await axios.post(`${baseURL}/login`, payload)
      setEmail('')
      setPassword('')
      await Swal.fire('Success', 'Anda berhasil masuk', 'success')
      setCookie('session', result.data.access_token)
      setCookie('role', result.data.role)
      router.push({ pathname: '/' })
    } catch (error) {
      await Swal.fire(
        'Sorry',
        Object.values(error.response.data).toString(),
        'error'
      )
    }
  }

  return (
    <div className="flex flex-col justify-center h-screen px-4 py-8 mx-auto md:p-16 bg-bg_primary">
      <div className="flex justify-center mb-8">
        <Image
          src={logoLogin}
          alt="Logo Scanx Login"
          width={160}
          className="md:w-[10rem]"
        />
      </div>
      <div className="mx-auto w-full max-w-7xl rounded-md bg-white px-8 py-8 shadow-xl md:px-12 lg:w-[32rem]">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold md:text-xl">
            Selamat Datang!
          </p>
          <p className="mb-4">Silahkan login terlebih dahulu</p>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset className="my-2">
            <p className="mb-4 font-semibold">Email</p>
            <Input
              type={'email'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </fieldset>
          <fieldset className="my-2">
            <p className="mb-4 font-semibold">Password</p>
            <Input
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </fieldset>
          <div className="flex flex-col justify-center gap-6 mt-8 text-center">
            <Button type={'submit'}>login</Button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-8 text-center">
        <p className="text-white">
          Copyright © {new Date().getFullYear()} Appsec.Asia. All rights
          reserved.
        </p>
      </div>
    </div>
  )
}

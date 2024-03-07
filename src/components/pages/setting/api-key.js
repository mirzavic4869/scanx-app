import { getCookie, deleteCookie } from 'cookies-next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/button'
import axios from 'axios'
import Image from 'next/image'
import update from '@/assets/images/update.svg'
import { Input } from '@/components/input'
import Swal from 'sweetalert2'
import { baseURL } from '@/components/lib'

export default function ApiKey() {
  const router = useRouter()
  const session = getCookie('session')
  const apiKey = getCookie('api_key')
  const userId = getCookie('user_id')
  const [setInputApiKey] = useState('')
  const [setInputUserId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault
    getApiKey(apiKey, userId)
  }

  async function getApiKey(apiKey, userId) {
    try {
      const payload = {
        api_key: apiKey,
        user_id: userId,
      }
      const result = await axios({
        method: 'POST',
        url: `${baseURL}/generate-api-key`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      await Swal.fire('Success', result.data.success, 'success')
      router.push('/')
    } catch (error) {
      console.log(error)
      await Swal.fire('Sorry', error.message, 'error')
    }
  }

  return (
    <div className="w-full rounded-md bg-white">
      <div className="p-6 md:p-8">
        <div className="gap-4 md:grid md:grid-cols-2">
          <Image
            className="mx-auto md:hidden md:w-[12rem] lg:w-[14rem]"
            src={update}
            alt="Generate Api Key"
            width={160}
          />
          <div className="flex flex-col gap-2">
            <p className="mx-auto mb-2 font-semibold md:text-xl">
              Generate your api key
            </p>
            <Input
              onChange={(e) => setInputApiKey(e.target.value)}
              name="api_key"
              placeholder="Api key"
              value={apiKey}
            />
            <Input
              onChange={(e) => setInputUserId(e.target.value)}
              name="user_id"
              placeholder="User id"
              value={userId}
              classAdd={'my-2'}
            />
            <Button onClick={handleSubmit}>generate</Button>
          </div>
          <Image
            className="mx-auto hidden md:block md:w-[12rem] lg:w-[14rem]"
            src={update}
            alt="Generate Api Key"
            width={160}
          />
        </div>
      </div>
    </div>
  )
}

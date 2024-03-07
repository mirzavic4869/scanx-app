import { Button } from '@/components/button'
import { baseURL } from '@/components/lib'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function DetailCredential() {
  const router = useRouter()
  const session = getCookie('session')
  const [detailItem, setDetailItem] = useState()
  const { id } = router.query

  const getDetailItem = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/with-credential/scans/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setDetailItem(result.data)
    } catch (error) {
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }, [id, session, router])

  useEffect(() => {
    getDetailItem()
  }, [router.query.id, getDetailItem])

  return (
    <div className="rounded bg-white p-6 shadow-sm hover:shadow-md">
      <div>
        <div className="flex flex-row items-center justify-between">
          <p className="mb-4 text-lg font-semibold">Detail Credential</p>
          <Link href="/scan-credential">
            <Button>BACK</Button>
          </Link>
        </div>

        {detailItem &&
          Object.entries(detailItem).map(([key, value], index) => {
            return (
              <div key={key}>
                <ul className="space-y-2" key={index}>
                  <li>
                    <strong>
                      {' '}
                      {key !== 'status' && key !== 'statistics' ? '' : key}{' '}
                      {key !== 'status' && key !== 'statistics' ? '' : ':'}{' '}
                    </strong>
                    {key === 'status' ? value : ''}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-5 list-disc' : ''
                    }`}
                  >
                    {key === 'statistics' && value.http ? 'Http :' : ''}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' && value.http.request_count
                        ? 'Request count :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics' ? '' : value.http.request_count}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' && value.http.response_count
                        ? 'Response count :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics' ? '' : value.http.response_count}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' && !value.http.time_out_count
                        ? 'Time out count :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics' ? '' : value.http.time_out_count}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.total_responses_per_second
                        ? 'Total response per second :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.total_responses_per_second}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.burst_response_time_sum
                        ? 'Burst response time sum :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.burst_response_time_sum}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' && value.http.burst_response_count
                        ? 'Burst response count :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.burst_response_count}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.burst_responses_per_second
                        ? 'Burst response per second :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.burst_responses_per_second}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.burst_average_response_time
                        ? 'Burst average response time :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.burst_average_response_time}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.total_average_response_time
                        ? 'Total average response time :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.total_average_response_time}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' && value.http.max_concurrency
                        ? 'Max concurrency :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics' ? '' : value.http.max_concurrency}
                  </li>
                  <li
                    className={`${
                      key === 'statistics' && value.http ? 'ml-8 list-disc' : ''
                    }`}
                  >
                    <strong>
                      {key === 'statistics' &&
                      value.http.original_max_concurrency
                        ? 'Original max concurrency :'
                        : ''}
                    </strong>{' '}
                    {key !== 'statistics'
                      ? ''
                      : value.http.original_max_concurrency}
                  </li>
                  <li>
                    <strong>
                      {key === 'statistics' && value.runtime ? 'Runtime :' : ''}
                    </strong>{' '}
                    {key === 'statistics' && value.runtime ? value.runtime : ''}
                  </li>
                  <li>
                    <strong>
                      {' '}
                      {key === 'statistics' && value.current_page
                        ? 'Current Page :'
                        : ''}
                    </strong>{' '}
                    {key === 'statistics' && value.current_page
                      ? value.current_page
                      : ''}
                  </li>
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  )
}

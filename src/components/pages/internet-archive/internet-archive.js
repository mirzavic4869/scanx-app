import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { baseURL } from '@/components/lib'
import { Loading } from '@/components/loading'
import axios from 'axios'
import { Tooltip } from 'chart.js'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import Swal from 'sweetalert2'

export default function InternetArchive() {
  const session = getCookie('session')
  const [url, setUrl] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    toSearch(url, startDate.replace('-', ''), endDate.replace('-', ''))
  }

  const toSearch = useCallback(
    async (url, startDate, endDate) => {
      try {
        setLoading(true)
        const result = await axios({
          method: 'GET',
          url: `${baseURL}/wayback/${url}/${startDate}/${endDate}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        setSearchResult(result.data.result)
        // setUrl('')
        // setStartDate('')
        // setEndDate('')
        setLoading(false)
      } catch (error) {
        console.log(error)
        if (error.code === 'ERR_NETWORK') {
          await Swal.fire('Sorry', error.message, 'error')
        } else {
          await Swal.fire('Sorry', 'Data harus diisi!', 'error')
        }
        setLoading(false)
      }
    },
    [session]
  )

  const handleOpenURL = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-xl">
        Internet Archive
      </h1>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
        <Input
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          placeholder="yourdomain.com"
          value={url}
        />
        <Input
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
          name="startDate"
          placeholder="20190102"
          value={startDate}
        />
        <Input
          onChange={(e) => setEndDate(e.target.value)}
          type="date"
          name="endDate"
          placeholder="20200102"
          value={endDate}
        />
        <Button onClick={handleSubmit}>Search</Button>
      </div>
      <div>
        {url && startDate && endDate ? (
          <div className="mb-4 flex flex-col rounded-md bg-primary p-4 text-white shadow-sm hover:shadow-md md:col-span-2 lg:col-span-4">
            <h1 className="text-center text-lg font-semibold">{url}</h1>
          </div>
        ) : (
          <div></div>
        )}

        {/* Card Result */}
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-12">
          {!loading ? (
            searchResult &&
            searchResult.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOpenURL(item.url)}
                className={`flex flex-col items-center justify-center rounded-md bg-white p-2 shadow-lg transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-[#edf0fdff] hover:shadow-xl md:p-4`}
              >
                <p className="text-center text-xs text-primary">
                  {item.timestamp.slice(0, 4)}
                </p>
                <p className="mb-2 text-center text-xs">
                  {item.timestamp.slice(4, 6) === '01'
                    ? 'Jan'
                    : item.timestamp.slice(4, 6) === '02'
                      ? 'Feb'
                      : item.timestamp.slice(4, 6) === '03'
                        ? 'Mar'
                        : item.timestamp.slice(4, 6) === '04'
                          ? 'Apr'
                          : item.timestamp.slice(4, 6) === '05'
                            ? 'May'
                            : item.timestamp.slice(4, 6) === '06'
                              ? 'Jun'
                              : item.timestamp.slice(4, 6) === '07'
                                ? 'Jul'
                                : item.timestamp.slice(4, 6) === '08'
                                  ? 'Aug'
                                  : item.timestamp.slice(4, 6) === '09'
                                    ? 'Sept'
                                    : item.timestamp.slice(4, 6) === '10'
                                      ? 'Oct'
                                      : item.timestamp.slice(4, 6) === '11'
                                        ? 'Nov'
                                        : item.timestamp.slice(4, 6) === '12'
                                          ? 'Dec'
                                          : ''}
                </p>
                <p className="text-center text-lg font-medium text-primary md:text-xl">
                  {item.timestamp.slice(6, 8)}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-12 text-center">
              <Loading />
            </div>
          )}
        </div>
        {searchResult?.length === 0 && (
          <div className="col-span-12 text-center font-medium text-red-600">
            Result not found
          </div>
        )}
      </div>
    </div>
  )
}

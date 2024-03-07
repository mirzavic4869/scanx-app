import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { baseURL } from '@/components/lib'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Detail() {
  const router = useRouter()
  const { id } = router.query
  const [portItem, setPortItem] = useState([])
  const [detail, setDetail] = useState([])
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const search = (data) => {
    return data.filter(
      (item) =>
        (item.cpe !== null ? item.cpe.toLowerCase().includes(query) : '') ||
        (item.extrainfo !== null
          ? item.extrainfo.toLowerCase().includes(query)
          : '') ||
        (item.ostype !== null
          ? item.ostype.toLowerCase().includes(query)
          : '') ||
        (item.port !== null ? item.port.toLowerCase().includes(query) : '') ||
        (item.product !== null
          ? item.product.toLowerCase().includes(query)
          : '') ||
        (item.protocol !== null
          ? item.protocol.toLowerCase().includes(query)
          : '') ||
        (item.service !== null
          ? item.service.toLowerCase().includes(query)
          : '')
    )
  }
  const handleSearch = () => {
    setSearchResult(search(portItem))
  }

  useEffect(() => {
    setSearchResult(portItem)
  }, [portItem])

  useEffect(() => {
    async function getPortItem() {
      try {
        const result = await axios.get(
          `${baseURL}/agent-result/${router.query.id}`
        )
        setPortItem(result.data.result.host.ports)
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
      }
    }

    async function getDetail() {
      try {
        const result = await axios.get(
          `${baseURL}/agent-result/${router.query.id}`
        )
        setDetail(result.data.result.host.hostnames.hostname)
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
      }
    }
    getDetail()
    getPortItem()
  }, [router.query.id, router])

  // const filterCVE = portItem.suspect.vulns.filter((vuln) => {
  //   return vuln.type === 'cve'
  // })
  return (
    <>
      <p className="mb-4 text-lg font-semibold md:text-2xl">Host {id}</p>
      <div className="relative mb-4 overflow-x-auto rounded-lg">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {detail.map((item, index) => (
              <tr
                className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                key={index}
              >
                <td className="px-6 py-4">{item['@name']}</td>
                <td className="px-6 py-4">{item['@type']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Ports */}
      <p className="mb-4 text-lg font-semibold md:text-2xl">Ports</p>
      <div className="mb-4 flex flex-row items-center justify-between gap-4">
        <Input
          placeholder={'Search'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>{'filter'}</Button>
      </div>
      <div className="relative mb-4 overflow-x-auto rounded-lg shadow-sm hover:shadow-md">
        <table className="mb-5 w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="p-4">
                cpe
              </th>
              <th scope="col" className="px-6 py-3">
                extra-info
              </th>
              <th scope="col" className="px-6 py-3">
                os-type
              </th>
              <th scope="col" className="px-6 py-3">
                product
              </th>
              <th scope="col" className="px-6 py-3">
                protocol
              </th>
              <th scope="col" className="px-6 py-3">
                service
              </th>
              <th scope="col" className="px-6 py-3">
                version
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item, index) => (
              <tr
                className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                key={index}
              >
                <td className="px-6 py-4">
                  {item.cpe === null ? '-' : item.cpe}
                </td>
                <td className="px-6 py-4">
                  {item.extrainfo === null ? '-' : item.extrainfo}
                </td>
                <td className="px-6 py-4">
                  {item.ostype === null ? '-' : item.ostype}
                </td>
                <td className="px-6 py-4">
                  {item.port === null ? '-' : item.port}
                </td>
                <td className="px-6 py-4">
                  {item.product === null ? '-' : item.product}
                </td>
                <td className="px-6 py-4">
                  {item.protocol === null ? '-' : item.protocol}
                </td>
                <td className="px-6 py-4">
                  {item.service === null ? '-' : item.service}
                </td>
              </tr>
            ))}
            {searchResult.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-center font-bold" colSpan={6}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Detail Vulnerability */}
      <div>
        <p className="mb-4 text-lg font-semibold md:text-2xl">Vulns</p>
        {searchResult.map((item, index) => (
          <div className="mx-auto" key={index}>
            {item.suspect?.map((suspect, index) => (
              <div
                className="mb-6 grid grid-flow-row gap-2 md:grid-cols-4"
                key={index}
              >
                {suspect.vulns
                  .filter((vuln) => {
                    return vuln.type === 'cve'
                  })
                  .map((vuln, vulnIndex) => (
                    <div
                      className="rounded-md bg-white p-6 shadow-lg transition-all duration-500 ease-in-out hover:bg-[#475defff] hover:text-white hover:shadow-xl"
                      key={vulnIndex}
                    >
                      <p className="text-lg font-semibold">
                        Port:{' '}
                        <span className="text-sm font-normal">{item.port}</span>
                      </p>
                      <div className="my-4 h-[0.5px] bg-[#e2e2e2]"></div>
                      <p className="mb-2 text-sm font-semibold">
                        CVSS:{' '}
                        <span className="text-sm font-normal">{vuln.cvss}</span>
                      </p>
                      <p className="mb-2 truncate text-sm font-semibold">
                        Id:{' '}
                        <span className="text-sm font-normal">{vuln.id}</span>
                      </p>
                      <p className="mb-2 text-sm font-semibold">
                        Type:{' '}
                        <span className="text-sm font-normal">{vuln.type}</span>
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* <div className="relative mb-5 overflow-x-auto rounded-lg shadow-sm hover:shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                cvss
              </th>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                type
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item, index) => {
              return (
                <div key={index}>
                  {item.suspect &&
                    item.suspect.map((suspect, index) => (
                      <tr
                        className="border-b bg-white hover:bg-[#edf0fdff]"
                        key={index}
                      >
                        {suspect.vulns.map((vuln, vulnIndex) => (
                          <td key={vulnIndex} className="px-6 py-4">
                            {vuln.cvss}
                          </td>
                        ))}
                      </tr>
                    ))}
                </div>
              )
            })}
          </tbody>
        </table>
      </div> */}
    </>
  )
}

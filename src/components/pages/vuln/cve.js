import { Button } from '@/components/button'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Loading } from '@/components/loading'
import Router, { useRouter } from 'next/router'
import { Input } from '@/components/input'
import { FaFilter, FaSort } from 'react-icons/fa'
import { baseURL } from '@/components/lib'

export default function CVE() {
  const router = useRouter()
  const [listCVE, setlistCVE] = useState([])
  const [loading, setLoading] = useState(false)
  const session = getCookie('session')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterYear, setFilterYear] = useState('all')
  const [selectedYear, setSelectedYear] = useState([])
  const [filteredAndSortedCVE, setFilteredAndSortedCVE] = useState([])
  const [searchCVE, setSearchCVE] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    Router.push({ pathname: '/vuln/cve', query: searchCVE })
    getListCVE(searchCVE)
  }

  // const sortByYear = (data) => {
  //   const sorted = [...data].sort((a, b) => {
  //     const yearA = new Date(a.vendors.publishedDate).getFullYear()
  //     const yearB = new Date(b.vendors.publishedDate).getFullYear()
  //     return sortOrder === 'asc' ? yearA - yearB : yearB - yearA
  //   })
  //   return sorted
  // }

  // const filterByYear = (data) => {
  //   if (filterYear === 'all') {
  //     return data
  //   } else {
  //     return data.filter((item) => {
  //       const year = new Date(item.vendors.publishedDate).getFullYear()
  //       return year.toString() === filterYear
  //     })
  //   }
  // }

  // const searchByName = (data) => {
  //   if (!searchCVE) {
  //     return data
  //   } else {
  //     const lowerSearchCVE = searchCVE.toLowerCase()
  //     return data.filter((item) => {
  //       return JSON.stringify(item).toLowerCase().includes(lowerSearchCVE)
  //     })
  //   }
  // }

  const getListCVE = useCallback(
    async (searchCVE) => {
      try {
        setLoading(true)
        const payload = searchCVE
        const result = await axios({
          method: 'GET',
          url: `${baseURL}/vuln/cve?q=${searchCVE}`,
          data: payload,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        })
        setlistCVE(result.data)
        setLoading(false)
      } catch (error) {
        if (error.response?.status === 422) {
          await Swal.fire('Sorry', error.response.data.msg, 'error')
          deleteCookie('session')
          router.push('/login')
        }
        setLoading(false)
      }
    },
    [session, router]
  )

  useEffect(() => {
    getListCVE(searchCVE)
  }, [getListCVE, searchCVE])

  useEffect(() => {
    const years = [
      ...new Set(
        listCVE.map((item) => new Date(item.cve_id.slice(4, 8)).getFullYear())
      ),
    ]
    setSelectedYear(years)
  }, [listCVE])

  // useEffect(() => {
  //   const sorted = sortByYear(listCVE)
  //   const filteredAndSorted = filterByYear(sorted)
  //   const filteredSortedAndSearched = searchByName(filteredAndSorted)
  //   setFilteredAndSortedCVE(filteredSortedAndSearched)
  // }, [filterYear, sortOrder, listCVE, searchCVE])

  return (
    <>
      <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
        <div className="flex flex-row items-center gap-4">
          <p className="text-lg font-semibold md:text-2xl">CVE</p>
          <Input
            type="text"
            defaultValue={searchCVE}
            onChange={(e) => setSearchCVE(e.target.value)}
            placeholder="Search"
          />
          <Button onClick={handleSearch}>search</Button>
        </div>

        {/* Sort */}
        <div className="flex flex-row items-center gap-4">
          {/* <FaSort size={40} />
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select> */}

          {/* Filter */}

          {/* <FaFilter size={40} />
          <select
            id="filteredYear"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
          >
            <option value="all">All Year</option>
            {selectedYear.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select> */}
        </div>
      </div>

      {/* Table Result */}
      <div className="relative w-full overflow-x-auto whitespace-nowrap rounded-lg shadow-sm hover:shadow-md">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#162C56] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                cve id
              </th>
              <th scope="col" className="px-6 py-3">
                cvss 2
              </th>
              <th scope="col" className="px-6 py-3">
                cvss 3
              </th>
              <th scope="col" className="px-6 py-3">
                cwes
              </th>
              <th scope="col" className="px-6 py-3">
                cvss weight
              </th>
              <th scope="col" className="px-6 py-3">
                summary
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              listCVE.map((item) => (
                <tr
                  className="border-y-4 bg-white hover:bg-[#edf0fdff]"
                  key={item.cve_id}
                >
                  <td className="px-6 py-4">{item.cve_id}</td>
                  <td className="px-6 py-4">
                    {item.cvss2 === null ? '-' : item.cvss2}
                  </td>
                  <td className="px-6 py-4">
                    {item.cvss3 === null ? '-' : item.cvss3}
                  </td>
                  <td className="px-6 py-4">{item.cwes}</td>
                  <td className="px-6 py-4">{item.cvss_weight}</td>
                  <td className="px-6 py-4">{item.summary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8">
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

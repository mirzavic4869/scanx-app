import { useCallback, useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { baseURL } from '@/components/lib'

export default function Overview() {
  const router = useRouter()
  const session = getCookie('session')
  const [listComplete, setListComplete] = useState()

  // Chart
  const getOverview = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/dashboard`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
      setListComplete(result.data.result)
    } catch (error) {
      console.log(error)
      if (error.response?.status === 422) {
        await Swal.fire('Sorry', 'masa berlaku token anda telah habis', 'error')
        deleteCookie('session')
        router.push('/login')
      }
    }
  }, [session, router])

  useEffect(() => {
    getOverview()
  }, [getOverview])

  useEffect(() => {
    var ctx = document.getElementById('pieChart').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Count', 'Finished', 'Process'],
        datasets: [
          {
            data: [
              listComplete?.website.count,
              listComplete?.website.finished,
              listComplete?.website.process,
            ],
            borderColor: ['#475defff', 'rgb(255, 205, 86)', '#9ca8fa'],
            backgroundColor: ['#475defff', 'rgb(255, 205, 86)', '#9ca8fa'],
            borderWidth: 2,
            hoverOffset: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    })
    myChart.destroy()
  }, [
    listComplete?.website.count,
    listComplete?.website.finished,
    listComplete?.website.process,
  ])

  useEffect(() => {
    var ctx = document.getElementById('radarChart').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Count', 'webapp', 'subdomain', 'wordpress', 'vulnscan'],
        datasets: [
          {
            label: 'All Scan',
            data: [
              listComplete?.all_scan.count,
              // listComplete?.all_scan.sf,
              listComplete?.all_scan.x1,
              listComplete?.all_scan.x2,
              listComplete?.all_scan.x3,
              listComplete?.all_scan.x4,
            ],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
    myChart.destroy()
  }, [
    listComplete?.all_scan.count,
    // listComplete?.all_scan.sf,
    listComplete?.all_scan.x1,
    listComplete?.all_scan.x2,
    listComplete?.all_scan.x3,
    listComplete?.all_scan.x4,
  ])

  useEffect(() => {
    var ctx = document.getElementById('barChart').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Count', 'webapp', 'subdomain', 'wordpress', 'vulnscan'],
        datasets: [
          {
            label: 'Scan By User',
            data: [
              listComplete?.scan_by_user.count,
              // listComplete?.scan_by_user.sf,
              listComplete?.scan_by_user.x1,
              listComplete?.scan_by_user.x2,
              listComplete?.scan_by_user.x3,
              listComplete?.scan_by_user.x4,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
    myChart.destroy()
  }, [
    listComplete?.scan_by_user.count,
    // listComplete?.scan_by_user.sf,
    listComplete?.scan_by_user.x1,
    listComplete?.scan_by_user.x2,
    listComplete?.scan_by_user.x3,
    listComplete?.scan_by_user.x4,
    listComplete?.all_scan.count,
    listComplete?.all_scan.sf,
    listComplete?.all_scan.x1,
    listComplete?.all_scan.x2,
    listComplete?.all_scan.x3,
    listComplete?.all_scan.x4,
  ])

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-lg font-semibold md:text-2xl">Overview</h1>
      <div>
        <div className="mx-auto grid grid-cols-1 justify-center gap-4 md:grid-cols-1 lg:grid-cols-2">
          {/* Doughnut chart */}
          <div className="rounded-md bg-white p-6 shadow-sm hover:shadow-md">
            <p className="mb-4 text-xl font-bold">All Scan</p>
            <div
              className="mx-auto"
              style={{
                height: '40vh',
                width: '40vw',
              }}
            >
              <canvas id="radarChart"></canvas>
            </div>
          </div>
          {/* Radar Chart */}
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md">
            <p className="mb-4 text-xl font-bold">Scan Website</p>
            <div
              className="mx-auto"
              style={{
                height: '40vh',
                width: '40vw',
              }}
            >
              <canvas id="pieChart"></canvas>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md md:col-span-2">
            <p className="mb-4 text-xl font-bold">Scan by User</p>
            <div
              className="mx-auto"
              style={{
                height: '40vh',
                width: '40vw',
              }}
            >
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

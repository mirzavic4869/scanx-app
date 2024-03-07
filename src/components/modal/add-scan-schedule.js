import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from '../input'
import { Button } from '../button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { deleteCookie, getCookie } from 'cookies-next'
import { Select } from '../select'
import { useRouter } from 'next/router'
import { baseURL } from '../lib'

export default function AddScanScheduleModal({ isOpen, onClose, getListItem }) {
  const optionsFrequently = [
    {
      value: '',
      text: 'Pilih Format',
    },
    {
      value: 'daily',
      text: 'daily',
    },
    {
      value: 'weekly',
      text: 'weekly',
    },
    {
      value: 'monthly',
      text: 'monthly',
    },
  ]
  const optionsRepeatedDay = [
    {
      value: '0',
      text: 'monday',
    },
    {
      value: '1',
      text: 'tuesday',
    },
    {
      value: '2',
      text: 'wednesday',
    },
    {
      value: '3',
      text: 'thursday',
    },
    {
      value: '4',
      text: 'friday',
    },
    {
      value: '5',
      text: 'saturday',
    },
    {
      value: '6',
      text: 'sunday',
    },
  ]
  const optionsRepeatedMonth = [
    {
      value: 1,
      text: '1',
    },
    {
      value: 2,
      text: '2',
    },
    {
      value: 3,
      text: '3',
    },
    {
      value: 4,
      text: '4',
    },
    {
      value: 5,
      text: '5',
    },
    {
      value: 6,
      text: '6',
    },
    {
      value: 7,
      text: '7',
    },
    {
      value: 8,
      text: '8',
    },
    {
      value: 9,
      text: '9',
    },
    {
      value: 10,
      text: '10',
    },
    {
      value: 11,
      text: '11',
    },
    {
      value: 12,
      text: '12',
    },
    {
      value: 13,
      text: '13',
    },
    {
      value: 14,
      text: '14',
    },
    {
      value: 15,
      text: '15',
    },
    {
      value: 16,
      text: '16',
    },
    {
      value: 17,
      text: '17',
    },
    {
      value: 18,
      text: '18',
    },
    {
      value: 19,
      text: '19',
    },
    {
      value: 20,
      text: '20',
    },
    {
      value: 21,
      text: '21',
    },
    {
      value: 22,
      text: '22',
    },
    {
      value: 23,
      text: '23',
    },
    {
      value: 24,
      text: '24',
    },
    {
      value: 25,
      text: '25',
    },
    {
      value: 26,
      text: '26',
    },
    {
      value: 27,
      text: '27',
    },
    {
      value: 28,
      text: '28',
    },
    {
      value: 29,
      text: '29',
    },
    {
      value: 30,
      text: '30',
    },
    {
      value: 31,
      text: '31',
    },
  ]
  const optionsTools = [
    {
      value: '',
      text: 'Pilih Format',
    },
    {
      value: 'scan_x1',
      text: 'scan_x1',
    },
    {
      value: 'scan_x2',
      text: 'scan_x2',
    },
  ]
  const optionsToolsOutput = useMemo(
    () => ({
      scan_x1: ['html', 'json', 'csv'],
      scan_x2: ['html'],
      scan_x3: ['html', 'json'],
      scan_x4: ['html'],
      spiderfoot: ['json'],
    }),
    []
  )
  const router = useRouter()
  const session = getCookie('session')
  const [frequently, setFrequently] = useState(optionsFrequently[0].value)
  const [repeatedDays, setRepeatedDays] = useState([])
  const [tools, setTools] = useState(optionsTools[0].value)
  const [targetUrl, setTargetUrl] = useState('')
  const [outputFormat, setOutputFormat] = useState('')
  const [endDate, setEndDate] = useState('')
  const [time, setTime] = useState('')
  const [timeC, setTimeC] = useState('')

  useEffect(() => {
    if (tools && optionsToolsOutput[tools]) {
      setOutputFormat(optionsToolsOutput[tools][0])
    }
  }, [tools, optionsToolsOutput])

  function timeAdd(e) {
    const inputTime = e.target.value
    const timeArray = inputTime.split(':')
    const hours = parseInt(timeArray[0], 10)
    const minutes = parseInt(timeArray[1], 10)

    let period = 'AM'
    let displayHours = hours
    let displayHoursC = hours

    if (hours >= 12) {
      period = 'PM'
      if (hours > 12) {
        displayHoursC = hours - 12
      }
    }

    const formattedTime = `${displayHours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`

    const formattedTimeC = `${displayHoursC
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`

    setTime(formattedTime)
    setTimeC(formattedTimeC)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    addScanSchedule(
      frequently,
      repeatedDays,
      tools,
      timeC,
      targetUrl,
      outputFormat,
      endDate
    )
  }

  async function addScanSchedule(
    frequently,
    repeatedDays,
    tools,
    time,
    targetUrl,
    outputFormat,
    endDate
  ) {
    try {
      const payload = JSON.stringify({
        frequently: frequently,
        repeated_days: repeatedDays,
        tools: tools,
        start_time: time,
        target_url: targetUrl,
        output_format: outputFormat,
        end_date: endDate,
      })
      await axios({
        method: 'POST',
        url: `${baseURL}/scheduler`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        data: payload,
      })
      await Swal.fire('Success', 'Data berhasil ditambahkan', 'success')
      setFrequently('')
      setRepeatedDays('')
      setTools('')
      setTime('')
      setTargetUrl('')
      setOutputFormat('')
      setEndDate('')
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                  >
                    <p>Add Scan Schedule</p>
                    <FaTimes
                      className="hover:cursor-pointer"
                      onClick={onClose}
                    />
                  </Dialog.Title>
                  <div className="mt-6">
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">Frequently</p>
                      <select
                        className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
                        onChange={(e) => setFrequently(e.target.value)}
                        value={frequently}
                      >
                        {optionsFrequently.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                    {frequently === 'weekly' && (
                      <Select
                        options={optionsRepeatedDay}
                        onChange={(e) => setRepeatedDays(e)}
                        value={repeatedDays}
                        title="Repeated Days"
                        maxSelect={3}
                        month={false}
                      />
                    )}

                    {frequently === 'monthly' && (
                      <Select
                        options={optionsRepeatedMonth}
                        onChange={(e) => setRepeatedDays(e)}
                        value={repeatedDays}
                        title="Repeated Date"
                        maxSelect={5}
                        month={true}
                      />
                    )}
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">Time</p>
                      <Input
                        onChange={(e) => timeAdd(e)}
                        name="time"
                        value={time}
                        type="time"
                        placeholder="09:00"
                      />
                    </fieldset>
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">End Date</p>
                      <Input
                        onChange={(e) => setEndDate(e.target.value)}
                        name="endDate"
                        value={endDate}
                        type="date"
                      />
                    </fieldset>
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">Tools</p>
                      <select
                        className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
                        onChange={(e) => setTools(e.target.value)}
                        value={tools}
                      >
                        {optionsTools.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">Target URL</p>
                      <Input
                        onChange={(e) => setTargetUrl(e.target.value)}
                        name="url"
                        value={targetUrl}
                        placeholder="https://yourdomain.com/"
                      />
                    </fieldset>
                    <fieldset className="my-3">
                      <p className="mb-2 font-medium">Output Format</p>
                      <select
                        className="block w-full rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-[#475defff] focus:ring-[#475defff]"
                        onChange={(e) => setOutputFormat(e.target.value)}
                        value={outputFormat}
                      >
                        {optionsToolsOutput[tools] === undefined ? (
                          <option>Pilih Format</option>
                        ) : (
                          optionsToolsOutput[tools].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))
                        )}
                      </select>
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

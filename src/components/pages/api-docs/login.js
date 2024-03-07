import React from 'react'

export default function LoginApi() {
  return (
    <div className="w-full rounded-md bg-white">
      <div className="p-6 md:p-8">
        <p className="mb-4 text-xl">Login</p>
        <p>
          [<span className="bg-slate-100 text-red-400">POST</span>] /login
        </p>
      </div>
      {/* Table */}
      <div className="mb-6 md:px-12">
        <div className="relative w-full overflow-x-auto scroll-smooth whitespace-nowrap rounded-lg">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-[#162C56] text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  parameter
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3">
                  value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-y-4 bg-white hover:bg-[#edf0fdff]">
                <td className="px-6 py-4">key</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Example Response */}
      <div className="px-6 md:px-8">
        <p className="mb-4 text-xl">Example Response</p>
        <div className="mb-8 h-[0.5px] bg-[#e2e2e2]"></div>
      </div>
      {/* Code */}
      <div className="mb-6 md:px-12">
        <p></p>
      </div>
    </div>
  )
}

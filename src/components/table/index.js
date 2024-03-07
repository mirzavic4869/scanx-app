import React, { useState } from 'react'
import { useTable } from 'react-table'

export default function Table({ columns, data }) {
  const tableInstance = useTable({
    columns,
    data,
  })

  console.log(data)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table className="w-full text-left text-xs" {...getTableProps()}>
      <thead className="bg-[#162C56] text-xs uppercase text-white">
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps()
          return (
            <tr {...restHeaderGroupProps} key={key}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps()
                return (
                  <th
                    scope="col"
                    className="px-6 py-3 text-base"
                    {...restColumn}
                    key={key}
                  >
                    {column.render('Header')}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          const { key, ...restRowProps } = row.getRowProps()
          return (
            <tr
              className="border-b bg-white text-base hover:bg-[#edf0fdff]"
              key={key}
              {...restRowProps}
            >
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps()
                return (
                  <td
                    className="whitespace-nowrap px-6 py-4"
                    key={key}
                    {...restCellProps}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
        {/* {Object.entries(data[0]).map((item, index) => (
          <tr key={item.id}>
            <td>{index}</td>
            <td>{item.scan_date}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  )
}

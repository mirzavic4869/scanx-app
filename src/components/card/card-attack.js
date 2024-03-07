import React from 'react'
import { Button } from '../button'

export default function AttackCard() {
  return (
    <div className="flex flex-col rounded-md bg-white px-5 py-4 shadow-sm hover:shadow-md">
      <h1 className="mb-3 font-semibold">Attack</h1>
      <div className="mb-4 flex flex-col gap-2">
        <p className="text-xs lg:text-sm">Select user to attack:</p>
        <select
          name="userAttack"
          id="userAttack"
          className="w-full rounded border-2 text-sm"
        >
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
      </div>
      <Button>Attack</Button>
    </div>
  )
}

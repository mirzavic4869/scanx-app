import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function ScanCredentialToggle({ enabled, setEnabled }) {
  return (
    <div className="py-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-primary' : 'bg-gray-300'}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'

export default function Select({
  value,
  onChange,
  options,
  title,
  maxSelect,
  month,
}) {
  const [highlitedIndex, sethighlitedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const maxSelections = maxSelect

  const selectOption = useCallback(
    (option) => {
      if (value.some((o) => o === (option.value || option))) {
        onChange(value.filter((o) => o !== option))
      } else {
        if (value.length < maxSelections) {
          onChange([...value, option.value])
        }
      }
    },
    [maxSelections, onChange, value]
  )

  const clearOptions = () => {
    onChange([])
  }

  const isOptionSelected = (option) => {
    return value.includes(option)
  }

  useEffect(() => {
    if (isOpen) sethighlitedIndex(0)
  }, [isOpen, value])

  useEffect(() => {
    let currentRef = containerRef.current
    const handler = (e) => {
      if (e.target != currentRef) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev)
          if (isOpen) selectOption(options[highlitedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlitedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            sethighlitedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }
    currentRef?.addEventListener('keydown', handler)

    return () => {
      currentRef?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlitedIndex, options, selectOption])

  function days(days) {
    const dayMap = {
      0: 'monday',
      1: 'tuesday',
      2: 'wednesday',
      3: 'thursday',
      4: 'friday',
      5: 'saturday',
      6: 'sunday',
    }

    return dayMap[days] || 'unknown'
  }
  return (
    <>
      <p className="mb-2 font-medium">{title}</p>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className="relative flex min-h-[1em] w-full items-center gap-2 rounded-md border border-solid border-[#e2e2e2] px-4 py-2 outline-none focus:border-primary focus:ring-primary"
      >
        <span className="flex flex-grow flex-wrap gap-2">
          {value.map((v, index) => {
            return (
              <button
                key={`${v}-${index}`}
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                className={`flex cursor-pointer items-center gap-2 rounded-md border bg-transparent px-4 py-2 outline-0 ${value}`}
              >
                {month ? v : days(v)}
                <span className="text-slate-300">&times;</span>
              </button>
            )
          })}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            clearOptions()
          }}
          className="flex cursor-pointer items-center border-0 bg-transparent p-0 text-[#777] outline-0 hover:text-[#333] focus:text-[#333]"
        >
          &times;
        </button>
        <div className="w-[.1em] self-stretch bg-[#777]"></div>
        <div
          className="w-2 h-2 translate-x-0 translate-y-[25%] cursor-pointer border-4 border-transparent border-t-[#777]"
          onClick={() => setIsOpen(true)}
        ></div>
        <ul
          className={`absolute left-0 top-[calc(100%+.25em)] z-[100] m-0 max-h-[15em] w-full list-none overflow-y-auto rounded-md border bg-white p-0
          ${isOpen ? 'block' : 'hidden'}`}
        >
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => sethighlitedIndex(index)}
              key={option.value}
              className={`cursor-pointer px-4 py-2 ${
                isOptionSelected(option) ? 'bg-slate-300' : ''
              } ${index === highlitedIndex ? 'bg-slate-300 text-white' : ''}`}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

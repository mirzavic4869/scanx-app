import Link from 'next/link'
import { useRouter } from 'next/router'
import { SIDER_MENU_USER, SIDER_MENU_ADMIN } from '../lib'
import { getCookie } from 'cookies-next'
import { useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import dynamic from 'next/dynamic'
import logo from '@/assets/images/logo-scanx-white.png'
import Image from 'next/image'

function Sidebar({ isShowSidebar }) {
  const router = useRouter()
  const role = getCookie('role')
  const [isOpen, setIsOpen] = useState({})

  return (
    <>
      <div
        className={`fixed z-50 w-52 md:h-auto ${
          isShowSidebar ? 'left-0' : '-left-52'
        } overflow-y-auto bg-bg_primary py-6 text-white shadow-sm rounded-xl transition-all duration-300 ease-out md:static md:w-52 lg:w-60`}
      >
        {role === 'super_admin' || role === 'moderator' ? (
          <aside className="flex flex-col gap-6">
            <div>
              <Image src={logo} alt="Logo Scanx" width={80} />
              <div className="h-[0.5px] bg-[#e2e2e2] mt-6"></div>
            </div>
            {SIDER_MENU_ADMIN.map((item) => (
              <div key={item.title} className="relative px-2">
                <Link href={item.url} target="_self">
                  <div
                    onClick={() =>
                      setIsOpen((prevState) => ({
                        ...prevState,
                        [item.title]: !prevState[item.title],
                      }))
                    }
                    className={`relative flex flex-row items-center gap-4 rounded-md px-4 py-2.5 transition duration-200 hover:bg-primary hover:text-white ${
                      router.asPath === item.url
                        ? 'block rounded bg-primary px-4 py-2.5 text-white transition duration-200'
                        : ''
                    }`}
                  >
                    {item.icon}
                    <p className="text-sm">{item.title}</p>
                  </div>
                  {isOpen[item.title]
                    ? item.subMenu?.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.url}
                          target="_self"
                        >
                          <div
                            className={`flex flex-row items-center gap-4 rounded py-2 pl-14 text-xs transition duration-200 hover:bg-primary hover:text-white ${
                              router.asPath === subitem.url
                                ? 'block rounded bg-primary py-2 pl-14 text-sm text-white transition duration-200'
                                : ''
                            }`}
                          >
                            {subitem.title}
                          </div>
                        </Link>
                      ))
                    : ''}
                </Link>
                {item.subMenu !== undefined ? (
                  <div
                    onClick={() =>
                      setIsOpen((prevState) => ({
                        ...prevState,
                        [item.title]: !prevState[item.title],
                      }))
                    }
                    className="absolute z-10 flex items-center justify-center w-6 h-6 text-xs cursor-pointer right-3 top-2"
                  >
                    {!isOpen[item.title] ? (
                      <BiSolidRightArrow />
                    ) : (
                      <BiSolidDownArrow />
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </aside>
        ) : (
          <aside className="flex flex-col gap-6">
            <div className="px-6">
              <Image src={logo} alt="Logo Scanx" width={100} />
              <div className="h-[0.5px] bg-[#e2e2e2] mt-6"></div>
            </div>

            {SIDER_MENU_USER.map((item) => (
              <Link key={item.title} href={item.url} target="_self">
                <div key={item.title} className="relative px-2">
                  <Link href={item.url} target="_self">
                    <div
                      onClick={() =>
                        setIsOpen((prevState) => ({
                          ...prevState,
                          [item.title]: !prevState[item.title],
                        }))
                      }
                      className={`relative flex flex-row items-center gap-4 rounded px-4 py-2.5 transition duration-200 hover:bg-primary hover:text-white ${
                        router.asPath === item.url
                          ? 'block rounded bg-primary px-4 py-2.5 text-white transition duration-200'
                          : ''
                      }`}
                    >
                      {item.icon}
                      <p className="text-sm">{item.title}</p>
                    </div>
                    {isOpen[item.title]
                      ? item.subMenu?.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.url}
                            target="_self"
                          >
                            <div
                              className={`flex flex-row items-center gap-4 rounded py-2 pl-14 text-xs transition duration-200 hover:bg-primary hover:text-white ${
                                router.asPath === subitem.url
                                  ? 'block rounded bg-primary py-2 pl-14 text-sm text-white transition duration-200'
                                  : ''
                              }`}
                            >
                              {subitem.title}
                            </div>
                          </Link>
                        ))
                      : ''}
                  </Link>
                  {item.subMenu !== undefined ? (
                    <div
                      onClick={() =>
                        setIsOpen((prevState) => ({
                          ...prevState,
                          [item.title]: !prevState[item.title],
                        }))
                      }
                      className="absolute z-10 flex items-center justify-center w-6 h-6 text-xs cursor-pointer right-3 top-3"
                    >
                      {!isOpen[item.title] ? (
                        <BiSolidRightArrow />
                      ) : (
                        <BiSolidDownArrow />
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Link>
            ))}
          </aside>
        )}
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })

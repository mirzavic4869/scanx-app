import { Header } from '../header'
import { Footer } from '../footer'
import { Sidebar } from '../sidebar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DashboardLayout({ children }) {
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const route = useRouter()
  const showSidebar = () => {
    setIsShowSidebar(!isShowSidebar)
  }
  useEffect(() => {
    setIsShowSidebar(false)
  }, [route.pathname])
  return (
    <div className="flex flex-col max-w-full min-h-screen mx-auto md:h-screen">
      <Header isShowSidebar={isShowSidebar} showSidebar={showSidebar} />
      <div className="overflow-hidden md:flex md:flex-1">
        <Sidebar isShowSidebar={isShowSidebar} />
        <main className="flex-1 px-6 py-3 overflow-y-auto">
          {children}
          <Footer />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

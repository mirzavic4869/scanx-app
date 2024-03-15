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
    <div className="grid max-w-full min-h-screen p-6 mx-auto md:grid-cols-3 md:gap-0 lg:gap-24 lg:grid-cols-5">
      <Sidebar isShowSidebar={isShowSidebar} />
      <div className="flex flex-col md:col-span-2 lg:col-span-4">
        <Header isShowSidebar={isShowSidebar} showSidebar={showSidebar} />
        <main className="py-4">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}

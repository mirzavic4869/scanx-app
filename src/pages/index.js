import { DashboardLayout } from '@/components/layout'
import { Overview, Completed } from '@/components/pages/dashboard'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// export async function getServerSideProps({ req, res }) {
//   const session = getCookie('session', { req, res })
//   useEffect(() => {
//     if (!session) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/login',
//         },
//       }
//     }
//   }, [session])
// }

export default function DashboardMenu() {
  const router = useRouter()
  const session = getCookie('session')
  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login')
  //   }
  // }, [router, session])

  return (
    <>
      <Overview />
      <Completed />
    </>
  )
}

DashboardMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

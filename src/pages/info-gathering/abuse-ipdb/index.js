import { DashboardLayout } from '@/components/layout'
import { Ipdb } from '@/components/pages/info-gathering'

export default function IpdbMenu() {
  return (
    <>
      <Ipdb />
    </>
  )
}

IpdbMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

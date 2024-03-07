import { DashboardLayout } from '@/components/layout'
import { Nmap } from '@/components/pages/info-gathering'

export default function NmapMenu() {
  return (
    <>
      <Nmap />
    </>
  )
}

NmapMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

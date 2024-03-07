import { DashboardLayout } from '@/components/layout'
import { VirusTotal } from '@/components/pages/info-gathering'

export default function VirusTotalMenu() {
  return (
    <>
      <VirusTotal />
    </>
  )
}

VirusTotalMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

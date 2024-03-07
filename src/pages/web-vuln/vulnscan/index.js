import { DashboardLayout } from '@/components/layout'
import { ScanX4 } from '@/components/pages/web-vuln'

export default function ScanX4Menu() {
  return (
    <div>
      <ScanX4 />
    </div>
  )
}

ScanX4Menu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

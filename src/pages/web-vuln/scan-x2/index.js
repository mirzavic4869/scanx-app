import { DashboardLayout } from '@/components/layout'
import { ScanX2 } from '@/components/pages/web-vuln'

export default function ScanX2Menu() {
  return (
    <div>
      <ScanX2 />
    </div>
  )
}

ScanX2Menu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

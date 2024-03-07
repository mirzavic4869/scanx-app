import { DashboardLayout } from '@/components/layout'
import { ScanX3 } from '@/components/pages/web-vuln'

export default function ScanX3Menu() {
  return (
    <div>
      <ScanX3 />
    </div>
  )
}

ScanX3Menu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

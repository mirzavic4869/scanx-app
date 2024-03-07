import { DashboardLayout } from '@/components/layout'
import { ScheduleScan } from '@/components/pages/schedule-scan'

export default function ScheduleScanMenu() {
  return (
    <>
      <ScheduleScan />
    </>
  )
}

ScheduleScanMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

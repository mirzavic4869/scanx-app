import { DashboardLayout } from '@/components/layout'
import { Spiderfoot } from '@/components/pages/info-gathering'

export default function SpiderfootMenu() {
  return (
    <div>
      <Spiderfoot />
    </div>
  )
}

SpiderfootMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

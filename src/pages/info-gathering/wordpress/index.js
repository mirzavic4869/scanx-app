import { DashboardLayout } from '@/components/layout'
import { Wordpress } from '@/components/pages/info-gathering'

export default function WordpressMenu() {
  return (
    <div>
      <Wordpress />
    </div>
  )
}

WordpressMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

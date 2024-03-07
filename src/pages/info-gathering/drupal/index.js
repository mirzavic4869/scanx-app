import { DashboardLayout } from '@/components/layout'
import { Drupal } from '@/components/pages/info-gathering'

export default function DrupalMenu() {
  return (
    <div>
      <Drupal />
    </div>
  )
}

DrupalMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

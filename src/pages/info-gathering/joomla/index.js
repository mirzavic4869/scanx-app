import { DashboardLayout } from '@/components/layout'
import { Joomla } from '@/components/pages/info-gathering'

export default function JoomlaMenu() {
  return (
    <div>
      <Joomla />
    </div>
  )
}

JoomlaMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

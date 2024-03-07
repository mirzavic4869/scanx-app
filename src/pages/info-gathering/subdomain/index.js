import { DashboardLayout } from '@/components/layout'
import { Subdomain } from '@/components/pages/info-gathering'

export default function SubdomainMenu() {
  return (
    <div>
      <Subdomain />
    </div>
  )
}

SubdomainMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

import { DashboardLayout } from '@/components/layout'
import { CVE } from '@/components/pages/vuln'

export default function CVEMenu() {
  return (
    <>
      <CVE />
    </>
  )
}

CVEMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

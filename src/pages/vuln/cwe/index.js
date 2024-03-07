import { DashboardLayout } from '@/components/layout'
import { CWE } from '@/components/pages/vuln'

export default function CWEMenu() {
  return (
    <>
      <CWE />
    </>
  )
}

CWEMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

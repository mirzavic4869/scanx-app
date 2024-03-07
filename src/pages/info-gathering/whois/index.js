import { DashboardLayout } from '@/components/layout'
import { Whois } from '@/components/pages/info-gathering'

export default function WhoisMenu() {
  return (
    <>
      <Whois />
    </>
  )
}

WhoisMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

import { DashboardLayout } from '@/components/layout'
import { ApiKey } from '@/components/pages/setting'

export default function ApiKeyMenu() {
  return (
    <>
      <ApiKey />
    </>
  )
}

ApiKeyMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

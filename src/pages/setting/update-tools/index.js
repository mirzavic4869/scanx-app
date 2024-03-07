import { DashboardLayout } from '@/components/layout'
import { UpdateTools } from '@/components/pages/setting'

export default function UpdateToolsMenu() {
  return (
    <>
      <UpdateTools />
    </>
  )
}

UpdateToolsMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

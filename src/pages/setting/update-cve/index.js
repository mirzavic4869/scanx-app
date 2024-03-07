import { DashboardLayout } from '@/components/layout'
import { UpdateCVE } from '@/components/pages/setting'

export default function UpdateCVEMenu() {
  return (
    <>
      <UpdateCVE />
    </>
  )
}

UpdateCVEMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

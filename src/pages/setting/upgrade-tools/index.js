import { DashboardLayout } from '@/components/layout'
import { UpgradeTools } from '@/components/pages/setting'

export default function UpgradeToolsMenu() {
  return (
    <>
      <UpgradeTools />
    </>
  )
}

UpgradeToolsMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

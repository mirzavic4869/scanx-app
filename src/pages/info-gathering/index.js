import { DashboardLayout } from '@/components/layout'
import { InfoGathering } from '@/components/pages/info-gathering'

export default function InfoGatheringMenu() {
  return (
    <div>
      <InfoGathering />
    </div>
  )
}

InfoGatheringMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

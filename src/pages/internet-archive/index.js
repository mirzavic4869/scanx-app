import { DashboardLayout } from '@/components/layout'
import { InternetArchive } from '@/components/pages/internet-archive'

export default function InternetArchiveMenu() {
  return (
    <>
      <InternetArchive />
    </>
  )
}

InternetArchiveMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

import { DashboardLayout } from '@/components/layout'
import { ScanCredential } from '@/components/pages/scan-credential'

export default function ScanCredentialMenu() {
  return (
    <>
      <ScanCredential />
    </>
  )
}

ScanCredentialMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

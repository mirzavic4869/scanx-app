import { DashboardLayout } from '@/components/layout'
import { WebVuln } from '@/components/pages/web-vuln'

export default function WebVulnMenu() {
  return (
    <div>
      <WebVuln />
    </div>
  )
}

WebVulnMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

import { DashboardLayout } from '@/components/layout'
import { LoginApi } from '@/components/pages/api-docs'

export default function LoginApiMenu() {
  return (
    <>
      <LoginApi />
    </>
  )
}

LoginApiMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

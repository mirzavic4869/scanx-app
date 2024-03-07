import { DashboardLayout } from '@/components/layout'
import { ListUser } from '@/components/pages/user'

export default function ListUserMenu() {
  return (
    <>
      <ListUser />
    </>
  )
}

ListUserMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

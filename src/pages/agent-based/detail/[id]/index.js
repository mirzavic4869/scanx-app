import { DashboardLayout } from '@/components/layout'
import { Detail } from '@/components/pages/agent-based'
import React from 'react'

export default function DetailPage() {
  return (
    <>
      <Detail />
    </>
  )
}

DetailPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

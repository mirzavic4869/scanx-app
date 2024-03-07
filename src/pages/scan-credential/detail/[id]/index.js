import { DashboardLayout } from '@/components/layout'
import { DetailCredential } from '@/components/pages/scan-credential'
import React from 'react'

export default function DetailCredentialPage() {
  return (
    <>
      <DetailCredential />
    </>
  )
}

DetailCredentialPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

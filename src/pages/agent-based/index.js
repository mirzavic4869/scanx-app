import { DashboardLayout } from '@/components/layout'
import { AgentBased } from '@/components/pages/agent-based'
import React from 'react'

export default function AgentBasedMenu() {
  return (
    <>
      <AgentBased />
    </>
  )
}

AgentBasedMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

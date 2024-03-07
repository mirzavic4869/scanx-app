import { DashboardLayout } from "@/components/layout";
import { HistoryScan } from "@/components/pages/history-scan";

export default function HistoryScanMenu() {
  return (
    <>
      <HistoryScan />
    </>
  )
}

HistoryScanMenu.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

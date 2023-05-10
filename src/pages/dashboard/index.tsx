import Dashboard from "@/components/dashboard"
import EmptyState from "@atlaskit/empty-state"
import React from "react"
import { dashboardStructure } from "@/lib/dashboard-structure"

const Home = () => (
  <Dashboard
    activeMainNavKey={dashboardStructure[0].key}
    activeSubNavKey=""
  >
    <EmptyState
      header="You haven't added elements to the dashboard"
      description="Make sure the elements are added to the dashboard. These elements can then be easily
            accessible for your future usages."
    />
  </Dashboard>
)

export default Home

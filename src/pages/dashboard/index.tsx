import Dashboard from "@/components/dashboard"
import EmptyState from "@atlaskit/empty-state"
import { NextPage } from "next"
import React from "react"


const HomePage: NextPage = () => (
  <Dashboard
    navigationKey="dashboardItem"
    subNavigationKey=""
  >
    <EmptyState
      header="You haven't added elements to the dashboard"
      description="Make sure the elements are added to the dashboard. These elements can then be easily
            accessible for your future usages."
    />
  </Dashboard>
)

export default HomePage

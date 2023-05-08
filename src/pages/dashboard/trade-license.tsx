import Dashboard from "../../../components/dashboard"
import EmptyState from "@atlaskit/empty-state"
import React from "react"

const TradeLicense = () => (
  <Dashboard>
    <EmptyState
      header="You haven't requested for any licenses"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur."
    />
  </Dashboard>
)

export default TradeLicense

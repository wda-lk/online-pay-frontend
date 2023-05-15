import Dashboard from "@/components/dashboard/dashboard"
import EmptyState from "@atlaskit/empty-state"
import { NextPage } from "next"
import React from "react"


const AssessmentTaxPaymentPage: NextPage = () => {
  const navItems = [
    {
      key: "assessmentTaxPaymentNavItem",
      href: "/dashboard/assessment-tax",
      label: "Payment"
    },
    {
      key: "assessmentTaxPropertyNavItem",
      href: "/dashboard/assessment-tax/property",
      label: "Property"
    }
  ]

  return (
    <Dashboard
      activeNavigationKey="assessmentTaxNavItem"
      activeSubNavigationKey="assessmentTaxPaymentNavItem"
      subNavigationItems={navItems}
    >
      <EmptyState
        header="Assessment Tax module is still in development"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur."
      />
    </Dashboard>
  )
}

export default AssessmentTaxPaymentPage

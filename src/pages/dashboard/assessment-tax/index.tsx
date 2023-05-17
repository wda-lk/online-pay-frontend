import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import Dashboard from "@/components/dashboard/dashboard"
import EmptyState from "@atlaskit/empty-state"
import { NextPage } from "next"
import PageHeader from "@atlaskit/page-header"


const AssessmentTaxPaymentPage: NextPage = () => {
  const navItems = [
    {
      key: "assessmentTaxPaymentNavItem",
      href: "/dashboard/assessment-tax",
      label: "Payment"
    }
  ]

  const breadcrumbs = [
    { label: "Assessment Tax", href: "/dashboard/assessment-tax" },
    { label: "Payment", href: "/dashboard/assessment-tax" }
  ]

  return (
    <Dashboard
      activeNavigationKey="assessmentTaxNavItem"
      activeSubNavigationKey="assessmentTaxPaymentNavItem"
      subNavigationItems={navItems}
    >
      <PageHeader breadcrumbs={<BreadcrumbsWrapper breadcrumbs={breadcrumbs}/>}>
        Payment
      </PageHeader>
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

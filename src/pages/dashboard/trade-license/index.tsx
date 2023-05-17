import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import Dashboard from "@/components/dashboard/dashboard"
import DynamicTable from "@atlaskit/dynamic-table"
import { NextPage } from "next"
import PageHeader from "@atlaskit/page-header"


const TradeLicensePage: NextPage = () => {
  const navItems = [
    {
      key: "tradeLicenseListNavItem",
      href: "/dashboard/trade-license",
      label: "Licenses"
    },
    {
      key: "tradeLicenseApplicationNavItem",
      href: "/dashboard/trade-license/application",
      label: "Application"
    }
  ]

  const breadcrumbs = [
    { label: "Trade License", href: "/dashboard/trade-license" },
    { label: "Licenses", href: "/dashboard/trade-license" }
  ]

  return (
    <Dashboard
      activeNavigationKey="tradeLicenseNavItem"
      activeSubNavigationKey="tradeLicenseListNavItem"
      subNavigationItems={navItems}
    >
      <PageHeader breadcrumbs={<BreadcrumbsWrapper breadcrumbs={breadcrumbs}/>}>
        Licenses
      </PageHeader>
      <DynamicTable
        head={undefined}
        rows={undefined}
        rowsPerPage={5}
        defaultPage={1}
        loadingSpinnerSize="large"
        isRankable
      />
    </Dashboard>
  )
}

export default TradeLicensePage

import Dashboard from "@/components/dashboard/dashboard"
import DynamicTable from "@atlaskit/dynamic-table"
import { NextPage } from "next"


const TradeLicensePage: NextPage = () => {
    const navItems = [
    {
      key: "tradeLicenseApplicationNavItem",
      href: "/dashboard/trade-license",
      label: "Application"
    }
  ]

  return (
    <Dashboard
      activeNavigationKey="tradeLicenseNavItem"
      activeSubNavigationKey="tradeLicenseApplicationNavItem"
      subNavigationItems={navItems}
    >
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

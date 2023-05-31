import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import Dashboard from "@/components/dashboard/dashboard"
import EmptyState from "@atlaskit/empty-state"
import PageHeader from "@atlaskit/page-header"


const HomePage = () => {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" }
  ]

  return (
    <Dashboard activeNavigationKey="dashboardNavItem">
      <PageHeader breadcrumbs={<BreadcrumbsWrapper breadcrumbs={breadcrumbs}/>}>
        Dashboard
      </PageHeader>
      <EmptyState
        header="You haven't added elements to the dashboard"
        description="Make sure the elements are added to the dashboard. These elements can then be easily
            accessible for your future usages."
      />
    </Dashboard>
  )
}

HomePage.isAuth = true
export default HomePage

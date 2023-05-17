import { Content, LeftSidebar, Main, PageLayout, TopNavigation } from "@atlaskit/page-layout"
import LeftSidebarContent from "@/components/dashboard/left-sidebar-content"
import { N10 } from "@atlaskit/theme/colors"
import { ReactNode } from "react"
import { SubNavigationItem } from "@/lib/sub-navigation-item"
import TopNavigationContent from "@/components/dashboard/top-navigation-content"
import { token } from "@atlaskit/tokens"


type DashboardProps = {
  activeNavigationKey: string
  activeSubNavigationKey?: string
  subNavigationItems?: SubNavigationItem[]
  children: ReactNode
}

const Dashboard = (
  {
    activeNavigationKey,
    activeSubNavigationKey,
    subNavigationItems,
    children
  }: DashboardProps) => (
  <PageLayout>
    <TopNavigation
      id="top-navigation"
      isFixed
    >
      <TopNavigationContent
        activeKey={activeSubNavigationKey || ""}
        items={subNavigationItems || []}
      />
    </TopNavigation>
    <Content>
      <LeftSidebar
        id="side-navigation"
        isFixed={false}
        width={272}
      >
        <div style={{ minHeight: "94vh", backgroundColor: token("elevation.surface", N10) }}>
          <LeftSidebarContent activeKey={activeNavigationKey}/>
        </div>
      </LeftSidebar>
      <Main id="main-content">
        <div style={{ padding: "0 24px" }}>
          {children}
        </div>
      </Main>
    </Content>
  </PageLayout>
)


export default Dashboard

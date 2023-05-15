import {
  Content,
  LeftSidebar,
  Main,
  PageLayout,
  TopNavigation
} from "@atlaskit/page-layout"
import LeftSidebarContent from "@/components/dashboard/left-sidebar-content"
import { ReactNode } from "react"
import { SubNavigationItem } from "@/lib/sub-navigation-item"
import TopNavigationContent from "@/components/dashboard/top-navigation-content"


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
        activeKey={activeSubNavigationKey && ""}
        items={subNavigationItems && []}
      />
    </TopNavigation>
    <Content>
      <LeftSidebar
        id="side-navigation"
        isFixed={false}
        width={272}
      >
        <div style={{ minHeight: "94vh" }}>
          <LeftSidebarContent activeKey={activeNavigationKey}/>
        </div>
      </LeftSidebar>
      <Main id="main-content">
        {children}
      </Main>
    </Content>
  </PageLayout>
)


export default Dashboard

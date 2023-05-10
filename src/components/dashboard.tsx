import {
  AppSwitcher,
  AtlassianNavigation,
  Help,
  Notifications, PrimaryButton, PrimaryDropdownButton,
  ProductHome,
  Profile
} from "@atlaskit/atlassian-navigation"
import {
  Content,
  LeftSidebar,
  Main,
  PageLayout,
  TopNavigation
} from "@atlaskit/page-layout"
import {
  CustomItem,
  CustomItemComponentProps,
  Footer,
  Header,
  HeadingItem,
  NavigationContent,
  NavigationFooter,
  NavigationHeader,
  Section,
  SideNavigation
} from "@atlaskit/side-navigation"
import {
  DashboardStructure,
  dashboardStructure
} from "@/lib/dashboard-structure"
import {
  ReactNode,
  forwardRef
} from "react"
import Avatar from "@atlaskit/avatar"
import CreditCardIcon from "@atlaskit/icon/glyph/creditcard"
import Image from "next/future/image"
import Link from "next/link"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import SettingsIcon from "@atlaskit/icon/glyph/settings"
import StarIcon from "@atlaskit/icon/glyph/star"
import icon from "../../public/logo/icon=comp.svg"
import paymentLogo from "../../public/logo/logo-payment=comp.svg"


type SideNavigationProps = { activeItemKey: string }
type TopNavigationProps = {
  activeItemKey: string,
  topNavigationItems: DashboardStructure[]
}
type DashboardProps = {
  activeMainNavKey: string,
  activeSubNavKey: string
  children: ReactNode
}

const LeftSidebarContent = ({ activeItemKey }: SideNavigationProps) => {
  type CustomLinkProps = CustomItemComponentProps & { href: string };
  const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    (props: CustomLinkProps, ref) => {
      const { children, href, ...rest } = props
      return (
        <Link
          ref={ref}
          href={href}
        >
          <a
            style={{ padding: "8px 10px" }}
            onClick={(e) => {
              e.preventDefault()
            }}
            {...rest}
          >
            {children}
          </a>
        </Link>
      )
    }
  )
  CustomLink.displayName = "CustomLink"

  return (
    <SideNavigation label="Cat2020 side navigation">
      <NavigationHeader>
        <Header
          component={({ children, ...props }) => (
            <a href="#" {...props}>
              {children}
            </a>
          )}
          iconBefore={<Image src={icon} alt=""/>}
          description="Payment gateway"
        >
          Automation System
        </Header>
      </NavigationHeader>
      <NavigationContent>
        <Section
          aria-labelledby="starred-section"
          hasSeparator
        >
          <HeadingItem id="starred-section">STARRED</HeadingItem>
        </Section>
        <Section
          aria-labelledby="all-section"
          hasSeparator
        >
          <HeadingItem id="all-section">ALL</HeadingItem>
          {
            dashboardStructure.map((item) => {
              return (
                <CustomItem
                  key={item.key}
                  href={item.href}
                  component={CustomLink}
                  iconBefore={
                    item.icon == "CreditCardIcon" ? <CreditCardIcon label=""/> : <SettingsIcon label=""/>
                  }
                  iconAfter={<StarIcon label=""/>}
                  isSelected={item.key == activeItemKey}
                >
                  {item.label}
                </CustomItem>
              )
            })
          }
        </Section>
      </NavigationContent>
      <NavigationFooter>
        <Footer
          description={
            <div>
              <a>Give feedback</a>{" ∙ "}
              <a>Learn more</a>
            </div>
          }
        >
          © 2023 CAT2020 <br/> Wayamba Development Authority
        </Footer>
      </NavigationFooter>
    </SideNavigation>
  )
}

const TopNavigationContent = ({ activeItemKey, topNavigationItems }: TopNavigationProps) => {
  const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..."/>

  const DefaultHome = () => (
    <ProductHome
      icon={() =>
        <Image
          src={paymentLogo}
          alt="Cat2020 Payment"
          style={{ width: "auto" }}
          priority
        />
      }
      logo={() =>
        <Image
          src={paymentLogo}
          alt="Cat2020 Payment"
          style={{ width: "auto" }}
          priority
        />
      }
    />
  )

  const DefaultProfile = () => {
    const name = "Yohan Avishke"
    const label = `${name} (online)`
    return (
      <Profile
        icon={
          <Avatar
            presence="online"
            size="small"
          />
        }
        tooltip={label}
      />
    )
  }

  const NotificationsBadge = () => (
    <NotificationIndicator
      onCountUpdated={console.log}
      notificationLogProvider={Promise.resolve({}) as any}
    />
  )

  return (
    <AtlassianNavigation
      label="cat2020 top navigation"
      renderAppSwitcher={DefaultAppSwitcher}
      renderProductHome={DefaultHome}
      primaryItems={
        topNavigationItems.map(item => {
          if (item.children.length != 0) {
            return (
              <PrimaryDropdownButton
                key={item.key}
                isSelected={item.key == activeItemKey}
              >
                {item.label}
              </PrimaryDropdownButton>)
          }
          return (<PrimaryButton key={item.key}>{item.label}</PrimaryButton>)
        })
      }
      renderHelp={() => <Help tooltip="Get help"/>}
      renderProfile={DefaultProfile}
      renderNotifications={() => (
        <Notifications
          badge={NotificationsBadge}
          tooltip="Notifications"
        />
      )}
    />
  )
}

const Dashboard = ({ activeMainNavKey, activeSubNavKey, children }: DashboardProps) => {
  const mainNavItems = dashboardStructure.find(item => {
    return item.key === activeMainNavKey
  })
  const subNavItems = mainNavItems ? mainNavItems.children : []
  return (
    <PageLayout>
      <TopNavigation
        id="top-navigation"
        isFixed
      >
        <TopNavigationContent
          activeItemKey={activeSubNavKey}
          topNavigationItems={subNavItems}
        />
      </TopNavigation>
      <Content>
        <LeftSidebar
          id="side-navigation"
          isFixed={false}
          width={272}
        >
          <LeftSidebarContent activeItemKey={activeMainNavKey}
          />
        </LeftSidebar>
        <Main id="main-content">
          <div style={{ minHeight: "90vh" }}>
            {children}
          </div>
        </Main>
      </Content>
    </PageLayout>
  )
}

export default Dashboard

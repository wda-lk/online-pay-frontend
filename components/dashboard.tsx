import {
  AtlassianNavigation,
  Help,
  Notifications,
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
  Footer,
  Header,
  HeadingItem,
  LinkItem,
  NavigationContent,
  NavigationFooter,
  NavigationHeader,
  Section,
  SideNavigation
} from "@atlaskit/side-navigation"
import Avatar from "@atlaskit/avatar"
import CreditCardIcon from "@atlaskit/icon/glyph/creditcard"
import Image from "next/future/image"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import React from "react"
import SettingsIcon from "@atlaskit/icon/glyph/settings"
import StarIcon from "@atlaskit/icon/glyph/star"
import icon from "../public/logo/icon=comp.svg"
import paymentLogo from "../public/logo/logo-payment=comp.svg"


const TopNavigationContent = () => {
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
      renderProductHome={DefaultHome}
      primaryItems={[]}
      renderHelp={() => <Help tooltip="Get help"/>}
      renderProfile={DefaultProfile}
      renderNotifications={() => (
        <Notifications badge={NotificationsBadge} tooltip="Notifications"/>
      )}
    />
  )
}

const LeftSidebarContent = () => (
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
        <LinkItem
          href="#"
          iconBefore={<CreditCardIcon label=""/>}
          iconAfter={<StarIcon label=""/>}
        >
          Assessment Tax
        </LinkItem>
        <LinkItem
          href="#"
          iconBefore={<CreditCardIcon label=""/>}
          iconAfter={<StarIcon label=""/>}
        >
          Venue Booking
        </LinkItem>
        <LinkItem
          href="#"
          iconBefore={<SettingsIcon label=""/>}
          iconAfter={<StarIcon label=""/>}
        >
          Settings
        </LinkItem>
      </Section>
    </NavigationContent>
    <NavigationFooter>
      <Footer
        description={
          <div>
            <a>Give feedback</a> {" ∙ "}
            <a>Learn more</a>
          </div>
        }
      >
        © 2023 CAT2020 <br/> Wayamba Development Authority
      </Footer>
    </NavigationFooter>
  </SideNavigation>
)

type DashboardProps = {
  children: React.ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <PageLayout>
      <TopNavigation
        id="top-navigation"
        isFixed
      >
        <TopNavigationContent/>
      </TopNavigation>
      <Content>
        <LeftSidebar
          id="side-navigation"
          isFixed={false}
          width={272}
        >
          <LeftSidebarContent/>
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

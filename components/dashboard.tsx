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
import React, {
  forwardRef
} from "react"
import Avatar from "@atlaskit/avatar"
import CreditCardIcon from "@atlaskit/icon/glyph/creditcard"
import Image from "next/future/image"
import Link from "next/link"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import SettingsIcon from "@atlaskit/icon/glyph/settings"
import StarIcon from "@atlaskit/icon/glyph/star"
import icon from "../public/logo/icon=comp.svg"
import paymentLogo from "../public/logo/logo-payment=comp.svg"
import { useRouter } from "next/router"


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

type CustomProps = CustomItemComponentProps & { href: string };

const CustomLink = forwardRef<HTMLAnchorElement, CustomProps>(
  (props: CustomProps, ref) => {
    const { children, href, ...rest } = props
    return (
      <Link
        ref={ref}
        href={href}
      >
        <a
          style={{
            padding: "8px 10px"
          }}
          onClick={(e) => e.preventDefault()}
          {...rest}
        >
          {children}
        </a>
      </Link>
    )
  }
)
CustomLink.displayName = "CustomLink"

const LeftSidebarContent = () => {
  const router = useRouter()
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
          <CustomItem
            href="/dashboard"
            component={CustomLink}
            iconBefore={<CreditCardIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={router.pathname == "/dashboard"}
          >
            Dashboard
          </CustomItem>
          <CustomItem
            href="/dashboard/trade-license"
            component={CustomLink}
            iconBefore={<CreditCardIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={router.pathname == "/dashboard/trade-license"}
          >
            Trade license
          </CustomItem>
          <CustomItem
            href="/dashboard/settings"
            component={CustomLink}
            iconBefore={<SettingsIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={router.pathname == "/dashboard/settings"}
          >
            Settings
          </CustomItem>
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

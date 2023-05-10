import {
  AppSwitcher,
  AtlassianNavigation,
  Help,
  Notifications,
  PrimaryButton,
  PrimaryDropdownButton,
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
  NavigationItem,
  getNavigationItems,
  navigationItems
} from "@/lib/nav-item"
import {
  ReactNode,
  forwardRef
} from "react"
import Avatar from "@atlaskit/avatar"
import CreditCardIcon from "@atlaskit/icon/glyph/creditcard"
import Image from "next/future/image"
import Link from "next/link"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import PageHeader from "@atlaskit/page-header"
import SettingsIcon from "@atlaskit/icon/glyph/settings"
import StarIcon from "@atlaskit/icon/glyph/star"
import dynamic from "next/dynamic"
import icon from "../../public/logo/icon=comp.svg"
import paymentLogo from "../../public/logo/logo-payment=comp.svg"


type SideNavigationProps = { activeNavigationKey: string }
type TopNavigationProps = {
  activeNavigationKey: string,
  activeNavigationItem: NavigationItem | null
}
type DashboardProps = {
  navigationKey: string
  subNavigationKey: string
  children: ReactNode
}

const Breadcrumbs = dynamic(
  () => import("@atlaskit/breadcrumbs"),
  { ssr: false }
)
const BreadcrumbsItem = dynamic(
  () => import("@atlaskit/breadcrumbs").then((module) => module.BreadcrumbsItem),
  { ssr: false }
)

const LeftSidebarContent = ({ activeNavigationKey }: SideNavigationProps) => {
  type CustomLinkProps = CustomItemComponentProps & { href: string };

  const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    (props: CustomLinkProps, ref) => {
      const { children, href, ...rest } = props
      return (
        <Link href={href}>
          <a
            ref={ref}
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
            navigationItems.map((item) => {
              return (
                <CustomItem
                  key={item.key}
                  href={item.href}
                  component={CustomLink}
                  iconBefore={
                    item.icon == "CreditCardIcon" ? <CreditCardIcon label=""/> : <SettingsIcon label=""/>
                  }
                  iconAfter={<StarIcon label=""/>}
                  isSelected={item.key == activeNavigationKey}
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

const TopNavigationContent = ({ activeNavigationKey, activeNavigationItem }: TopNavigationProps) => {
  const navigationItems = activeNavigationItem?.navigationItems || []

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
        navigationItems.map(item => {
          if (item.navigationItems.length != 0) {
            return (
              <PrimaryDropdownButton key={item.key}>
                {item.label}
              </PrimaryDropdownButton>
            )
          }
          return (
            <PrimaryButton
              key={item.key}
              href={item.href}
              isHighlighted={item.key == activeNavigationKey}
            >
              {item.label}
            </PrimaryButton>
          )
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

const Dashboard = ({ navigationKey, subNavigationKey, children }: DashboardProps) => {
  const [
    navigationItem,
    subNavigationItem
  ] = getNavigationItems(navigationKey, subNavigationKey)
  const breadcrumbs = (subNavigationItem || navigationItem)?.breadcrumbs || []

  const BreadcrumbsWrapper = (
    <Breadcrumbs>
      {
        breadcrumbs.map(breadcrumb => {
          console.log(breadcrumb)
          return (
            <BreadcrumbsItem
              key=""
              href={breadcrumb.href}
              text={breadcrumb.label}
            />
          )
        })
      }
    </Breadcrumbs>
  )

  return (
    <PageLayout>
      <TopNavigation
        id="top-navigation"
        isFixed
      >
        <TopNavigationContent
          activeNavigationKey={subNavigationKey}
          activeNavigationItem={navigationItem}
        />
      </TopNavigation>
      <Content>
        <LeftSidebar
          id="side-navigation"
          isFixed={false}
          width={272}
        >
          <div style={{ minHeight: "94vh" }}>
            <LeftSidebarContent activeNavigationKey={navigationKey}/>
          </div>
        </LeftSidebar>
        <Main id="main-content">
          <div style={{ padding: "0 28px" }}>
            <PageHeader breadcrumbs={BreadcrumbsWrapper}>
              {(subNavigationItem || navigationItem)?.label || ""}
            </PageHeader>
            {children}
          </div>
        </Main>
      </Content>
    </PageLayout>
  )
}

export default Dashboard

import {
  AtlassianNavigation,
  Help,
  Notifications,
  ProductHome,
  Profile
} from "@atlaskit/atlassian-navigation"
import {
  PageLayout,
  TopNavigation
} from "@atlaskit/page-layout"
import Avatar from "@atlaskit/avatar"
import Image from "next/future/image"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import paymentLogo from "../public/logo/logo-payment=comp.svg"


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

const TopNavigationContent = () => (
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

const Dashboard = () => {
  return (
    <PageLayout>
      <TopNavigation
        id="top-navigation"
        isFixed={true}
      >
        <TopNavigationContent/>
      </TopNavigation>
    </PageLayout>
  )
}

export default Dashboard

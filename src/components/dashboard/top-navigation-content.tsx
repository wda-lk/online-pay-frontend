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
import Avatar from "@atlaskit/avatar"
import Image from "next/future/image"
import { NotificationIndicator } from "@atlaskit/notification-indicator"
import { SubNavigationItem } from "@/lib/sub-navigation-item"
import paymentLogo from "*.svg"


type TopNavigationContentProps = {
  activeKey?: string,
  items?: SubNavigationItem[]
}

const TopNavigationContent = (
  {
    activeKey,
    items
  }: TopNavigationContentProps) => {
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
        items
        ? (items.map(item => {
          if (item.dropdownItems) {
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
              isHighlighted={item.key == activeKey}
            >
              {item.label}
            </PrimaryButton>
          )
        }))
        : []
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

export default TopNavigationContent

import {
  CustomItem,
  CustomItemComponentProps, Footer,
  Header, HeadingItem,
  NavigationContent, NavigationFooter,
  NavigationHeader, Section,
  SideNavigation
} from "@atlaskit/side-navigation"
import CreditCardIcon from "@atlaskit/icon/glyph/creditcard"
import Image from "next/future/image"
import Link from "next/link"
import SettingsIcon from "@atlaskit/icon/glyph/settings"
import StarIcon from "@atlaskit/icon/glyph/star"
import { forwardRef } from "react"
import icon from "*.svg"


type LeftSidebarContentProps = { activeKey: string }

const LeftSidebarContent = ({ activeKey }: LeftSidebarContentProps) => {
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
          <CustomItem
            key="dashboardNavItem"
            href="/dashboard"
            component={CustomLink}
            iconBefore={<CreditCardIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={"dashboardNavItem" == activeKey}
          >
            Dashboard
          </CustomItem>
          <CustomItem
            key="assessmentTaxNavItem"
            href="/dashboard/assessment-tax"
            component={CustomLink}
            iconBefore={<CreditCardIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={"assessmentTaxNavItem" == activeKey}
          >
            Assessment Tax
          </CustomItem>
          <CustomItem
            key="tradeLicenseNavItem"
            href="/dashboard/trade-license"
            component={CustomLink}
            iconBefore={<CreditCardIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={"tradeLicenseNavItem" == activeKey}
          >
            Trade License
          </CustomItem>
          <CustomItem
            key="settingsNavItem"
            href="/dashboard/settings"
            component={CustomLink}
            iconBefore={<SettingsIcon label=""/>}
            iconAfter={<StarIcon label=""/>}
            isSelected={"settingsNavItem" == activeKey}
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

export default LeftSidebarContent

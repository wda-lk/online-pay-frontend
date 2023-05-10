export interface DashboardStructure {
  key: string,
  label: string,
  href: string,
  icon: string,
  children: this[]
}

export const dashboardStructure: DashboardStructure[] = [
  {
    key: "dashboardLinkItem",
    label: "Dashboard",
    href: "/dashboard",
    icon: "CreditCardIcon",
    children: []
  },
  {
    key: "assessmentTaxLinkItem",
    label: "Assessment Tax",
    href: "/dashboard/assessment-tax",
    icon: "CreditCardIcon",
    children: [
      {
        key: "assessmentTaxPaymentLinkItem",
        label: "Payment",
        href: "dashboard/assessment-tax/payment",
        icon: "CreditCardIcon",
        children: []
      },
      {
        key: "assessmentTaxPropertyLinkItem",
        label: "Property",
        href: "dashboard/assessment-tax/property",
        icon: "CreditCardIcon",
        children: []
      }
    ]
  },
  {
    key: "tradeLicenseLinkItem",
    label: "Trade License",
    href: "/dashboard/trade-license",
    icon: "CreditCardIcon",
    children: [
      {
        key: "tradeLicenseApplicationLinkItem",
        label: "Application",
        href: "trade-license/application",
        icon: "CreditCardIcon",
        children: []
      }
    ]
  },
  {
    key: "settingsLinkItem",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "SettingsIcon",
    children: []
  }
]

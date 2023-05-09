export interface DashboardStructure {
  key: string,
  label: string,
  href: string,
  icon: string,
  isSelected: boolean,
  children: this[]
}

export const dashboardStructure: DashboardStructure[] = [
  {
    key: "dashboardLinkItem",
    label: "Dashboard",
    href: "/dashboard",
    icon: "CreditCardIcon",
    isSelected: true,
    children: []
  },
  {
    key: "assessmentTaxLinkItem",
    label: "Assessment Tax",
    href: "/dashboard/assessment-tax",
    icon: "CreditCardIcon",
    isSelected: false,
    children: [
      {
        key: "assessmentTaxPaymentLinkItem",
        label: "Payment",
        href: "dashboard/assessment-tax/payment",
        icon: "CreditCardIcon",
        isSelected: false,
        children: []
      },
      {
        key: "assessmentTaxPropertyLinkItem",
        label: "Property",
        href: "dashboard/assessment-tax/property",
        icon: "CreditCardIcon",
        isSelected: false,
        children: []
      }
    ]
  },
  {
    key: "tradeLicenseLinkItem",
    label: "Trade License",
    href: "/dashboard/trade-license",
    icon: "CreditCardIcon",
    isSelected: false,
    children: [
      {
        key: "tradeLicenseApplicationLinkItem",
        label: "Application",
        href: "trade-license/application",
        icon: "CreditCardIcon",
        isSelected: false,
        children: []
      }
    ]
  },
  {
    key: "settingsLinkItem",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "SettingsIcon",
    isSelected: false,
    children: []
  }
]

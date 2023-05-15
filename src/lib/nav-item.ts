export interface Breadcrumb {
  label: string,
  href: string
}

export interface NavigationItem {
  key: string,
  label: string,
  href: string,
  icon: string,
  breadcrumbs: Breadcrumb[],
  navigationItems: this[]
}

export const navigationItems: NavigationItem[] = [
  {
    key: "dashboardItem",
    label: "Dashboard",
    href: "/dashboard",
    icon: "CreditCardIcon",
    breadcrumbs: [
      { label: "Dashboard", href: "/dashboard" }
    ],
    navigationItems: []
  },
  {
    key: "assessmentTaxItem",
    label: "Assessment Tax",
    href: "/dashboard/assessment-tax",
    icon: "CreditCardIcon",
    breadcrumbs: [
      { label: "Assessment Tax", href: "/dashboard/assessment-tax" }
    ],
    navigationItems: [
      {
        key: "assessmentTaxPaymentItem",
        label: "Payment",
        href: "/dashboard/assessment-tax",
        icon: "CreditCardIcon",
        breadcrumbs: [
          { label: "Assessment Tax", href: "/dashboard/assessment-tax" },
          { label: "Payment", href: "/dashboard/assessment-tax" }
        ],
        navigationItems: []
      },
      {
        key: "assessmentTaxPropertyItem",
        label: "Property",
        href: "/dashboard/assessment-tax/property",
        icon: "CreditCardIcon",
        breadcrumbs: [
          { label: "Assessment Tax", href: "/dashboard/assessment-tax" },
          { label: "Property", href: "/dashboard/assessment-tax/property" }
        ],
        navigationItems: []
      }
    ]
  },
  {
    key: "tradeLicenseItem",
    label: "Trade License",
    href: "/dashboard/trade-license",
    icon: "CreditCardIcon",
    breadcrumbs: [
      { label: "trade-license", href: "/dashboard/trade-license" }
    ],
    navigationItems: [
      {
        key: "tradeLicenseListItem",
        label: "Licenses",
        href: "/dashboard/trade-license",
        icon: "CreditCardIcon",
        breadcrumbs: [
          { label: "Trade License", href: "/dashboard/trade-license" },
          { label: "Licenses", href: "/dashboard/trade-license" }
        ],
        navigationItems: []
      },
      {
        key: "tradeLicenseApplicationItem",
        label: "Application",
        href: "/dashboard/trade-license/application",
        icon: "CreditCardIcon",
        breadcrumbs: [
          { label: "Trade License", href: "/dashboard/trade-license" },
          { label: "Application", href: "/dashboard/trade-license/application" }
        ],
        navigationItems: []
      }
    ]
  },
  {
    key: "settingsItem",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "SettingsIcon",
    breadcrumbs: [
      { label: "Settings", href: "/dashboard/settings" }
    ],
    navigationItems: []
  }
]

export const getNavigationItems = (navigationKey: string, subNavigationKey: string) => {
  const navigationItem = navigationItems.find(item => item.key === navigationKey)
  if (!navigationItem) {
    return [null, null]
  }
  const subNavigationItems = navigationItem.navigationItems
  const subNavigationItem = subNavigationItems
    .find(item => item.key === subNavigationKey)
  if (!subNavigationItem) {
    return [navigationItem, null]
  }
  return [navigationItem, subNavigationItem]
}

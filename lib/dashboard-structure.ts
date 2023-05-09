interface DashboardStructure {
  label: string,
  isDefault: boolean,
  children: this[]
}

export const dashboardStructure: DashboardStructure[] = [
  {
    label: "Dashboard",
    isDefault: true,
    children: []
  },
  {
    label: "Assessment Tax",
    isDefault: false,
    children: [
      {
        label: "Payment",
        isDefault: true,
        children: []
      },
      {
        label: "Property",
        isDefault: false,
        children: []
      }
    ]
  },
  {
    label: "Trade License",
    isDefault: true,
    children: [
      {
        label: "Application",
        isDefault: true,
        children: []
      }
    ]
  }
]

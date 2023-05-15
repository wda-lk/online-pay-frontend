type DropDown = {
  key: string,
  label: string,
  href?: string
}

export type SubNavigationItem = {
  key: string,
  href: string,
  label: string,
  dropdownItems?: DropDown[]
}

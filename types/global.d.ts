import { ReactNode } from "react"


type Step = {
  number: number
  label: string
  formId?: string
  formTitle: string
  content?: ReactNode
  secondaryButton: {
    label: string
    onClick?: () => void
  }
  primaryButton: {
    label: string
    onClick?: () => void
  }
}

type DropDown = {
  key: string,
  label: string,
  href?: string
}

type SubNavigationItem = {
  key: string,
  href: string,
  label: string,
  dropdownItems?: DropDown[]
}

export {
  Step, SubNavigationItem
}

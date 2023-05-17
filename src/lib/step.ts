import { ReactNode } from "react"


export type Step = {
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

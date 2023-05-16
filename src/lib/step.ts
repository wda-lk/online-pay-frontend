import { ReactNode } from "react"
import { Status } from "@atlaskit/progress-tracker/types"


export type Step = {
  id: string
  label: string
  percentageComplete: number
  status: Status
  href: string
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

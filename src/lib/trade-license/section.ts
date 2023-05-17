import {
  AllInputProps,
  ApplicantInputProps,
  BusinessInputProps,
  OwnerInputProps,
  PropertyInputProps
} from "@/lib/trade-license/input"


export interface ApplicantSectionProps {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: ApplicantInputProps
}

export interface PropertySectionProps {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: PropertyInputProps
}

export interface OwnerSectionProps {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: OwnerInputProps
}

export interface BusinessSectionProps {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: BusinessInputProps
}

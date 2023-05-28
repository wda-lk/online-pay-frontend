export {}

type InputSelect = {
  label: string,
  value: string
}

type ApplicantInputProps = {
  taxType?: InputSelect
  nicNumber: string
  name: string
  district?: InputSelect
  localAuthority?: InputSelect
  gnDivision?: InputSelect
  address: string
  mobileNumber: string
}

type PropertyInputProps = {
  gnDivision?: InputSelect
  ward: string
  street: string
  assessmentNumber: string
  address: string
}

type OwnerInputProps = {
  mobileNumber: string
  ownerName: string
  nicNumber: string
  address: string
}

type BusinessInputProps = {
  nature?: InputSelect
  subNature?: InputSelect
  businessName: string
  regDate: string
  regNumber: string
  employeeCount: string
  telNumber: string
  email: string
  website: string
  lAnnualValue: string
  annualValue: string
  taxAmount: string
  otherCharges: string
}

type AllInputProps = {
  applicantInputProps?: ApplicantInputProps
  propertyInputProps?: PropertyInputProps
  ownerInputProps?: OwnerInputProps
  businessInputProps?: BusinessInputProps
}

type ApplicantSectionProps = {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: ApplicantInputProps
}

type PropertySectionProps = {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: PropertyInputProps
}

type OwnerSectionProps = {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: OwnerInputProps
}

type BusinessSectionProps = {
  formId: string
  formTitle: string
  handleSubmitSuccess: (data: AllInputProps) => void
  inputProps: BusinessInputProps
}

export {
  AllInputProps,
  ApplicantSectionProps,
  BusinessSectionProps,
  InputSelect,
  OwnerSectionProps,
  PropertySectionProps
}

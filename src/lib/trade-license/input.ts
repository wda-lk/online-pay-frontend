export type InputSelect = {
  label: string,
  value: string
}

export type ApplicantInputProps = {
  taxType?: InputSelect
  nicNumber: string
  name: string
  district?: InputSelect
  localAuthority?: InputSelect
  gnDivision?: InputSelect
  address: string
  mobileNumber: string
}

export type PropertyInputProps = {
  gnDivision?: InputSelect
  ward: string
  street: string
  assessmentNumber: string
  address: string
}

export type OwnerInputProps = {
  mobileNumber: string
  ownerName: string
  nicNumber: string
  address: string
}

export type BusinessInputProps = {
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

export type AllInputProps = {
  applicantInputProps?: ApplicantInputProps
  propertyInputProps?: PropertyInputProps
  ownerInputProps?: OwnerInputProps
  businessInputProps?: BusinessInputProps
}

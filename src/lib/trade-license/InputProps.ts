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

export type AllInputProps = {
  applicantInputProps: ApplicantInputProps
}

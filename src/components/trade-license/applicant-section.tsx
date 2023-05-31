import { ApplicantSectionProps, InputSelect } from "@/../types/trade-license"
import Form, { ErrorMessage, Field, FormHeader, FormSection } from "@atlaskit/form"
import Select, { OptionType, ValueType } from "@atlaskit/select"
import { gnDivisions, taxTypes } from "@/lib/data"
import TextField from "@atlaskit/textfield"


const ApplicantSection = ({
  formId,
  formTitle,
  handleSubmitSuccess,
  inputProps
}: ApplicantSectionProps) => {
  const {
    taxType,
    nicNumber,
    name,
    district,
    localAuthority,
    gnDivision,
    address,
    mobileNumber
  } = inputProps

  const handleSubmit = (
    data: {
      taxType: InputSelect
      nicNumber: string
      name: string
      district: InputSelect
      localAuthority: InputSelect
      gnDivision: InputSelect
      address: string
      mobileNumber: string
    }) => {
    handleSubmitSuccess({ applicantInputProps: data })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps }) => (
        <form id={formId} {...formProps} style={{ maxWidth: 624 }}>
          <FormHeader
            title={formTitle}
            description="* indicates a required field"
          />
          <FormSection description="Please select the Tax type, for which you're submitting this Application">
            <Field<ValueType<OptionType>>
              id="taxTypeValue"
              name="taxType"
              label="Tax Type"
              defaultValue={taxType}
              isRequired
              validate={(value) => {
                if (value) {
                  return
                }
                return "Please select a tax type."
              }}
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <Select
                    id={`${id}Select`}
                    options={taxTypes}
                    isSearchable
                    isClearable
                    {...rest}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormSection>
          <FormSection description="Personal information">
            <Field
              id="nicNumber"
              name="nicNumber"
              label="NIC Number"
              defaultValue={nicNumber}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <TextField id={`${id}TextField`}{...rest}/>
              )}
            </Field>
            <Field
              name="name"
              label="Name (with initials)"
              defaultValue={name}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <TextField id={`${id}TextField`} {...rest}/>
              )}
            </Field>
          </FormSection>
          <FormSection description="Home Address information">
            <Field<ValueType<OptionType>>
              id="district"
              name="district"
              label="District"
              defaultValue={district}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Select id={`${id}Select`} options={[]} {...rest}/>
              )}
            </Field>
            <Field<ValueType<OptionType>>
              id="localAuthority"
              name="localAuthority"
              label="Local Authority"
              defaultValue={localAuthority}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Select id={`${id}Select`} options={[]} {...rest}/>
              )}
            </Field>
            <Field<ValueType<OptionType>>
              id="gnDivision"
              name="gnDivision"
              label="GN Division"
              defaultValue={gnDivision}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <Select id={`${id}Select`} options={gnDivisions} {...rest}/>
              )}
            </Field>
            <Field
              name="address"
              label="Address"
              defaultValue={address}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }: any) => (
                <TextField id={`${id}TextField`} {...rest}/>
              )}
            </Field>
          </FormSection>
          <FormSection description="Contact information">
            <Field
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              defaultValue={mobileNumber}
              isRequired
              isDisabled
            >
              {({ fieldProps: { id, ...rest } }) => (
                <TextField id={`${id}TextField`} {...rest}/>
              )}
            </Field>
          </FormSection>
        </form>
      )}
    </Form>
  )
}

export default ApplicantSection

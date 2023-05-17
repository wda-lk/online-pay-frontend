import Form, { ErrorMessage, Field, FormHeader, FormSection, HelperMessage } from "@atlaskit/form"
import Select, { OptionType, ValueType } from "@atlaskit/select"
import { natures, subNatures } from "@/lib/data"
import { BusinessSectionProps } from "@/lib/trade-license/section"
import { DatePicker } from "@atlaskit/datetime-picker"
import { InputSelect } from "@/lib/trade-license/input"
import TextField from "@atlaskit/textfield"


const BusinessSection = ({ formId, formTitle, handleSubmitSuccess, inputProps }: BusinessSectionProps) => {
  const {
    nature,
    subNature,
    businessName,
    regDate,
    regNumber,
    employeeCount,
    telNumber,
    email,
    website,
    lAnnualValue,
    annualValue,
    taxAmount,
    otherCharges
  } = inputProps

  const handleSubmit = (
    data: {
      nature: InputSelect
      subNature: InputSelect
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
    }) => {
    handleSubmitSuccess({ businessInputProps: data })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps }) => (
        <form id={formId} {...formProps}>
          <FormHeader
            title={formTitle}
            description="* indicates a required field"
          />
          <FormSection description="Nature informaiton">
            <Field<ValueType<OptionType>>
              id="nature"
              name="nature"
              label="Nature"
              defaultValue={nature}
              isRequired
              validate={(value) => {
                if (value) {
                  return
                }
                return "Please select a business nature."
              }}
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <Select
                    id={`${id}Select`}
                    options={natures}
                    isSearchable
                    isClearable
                    {...rest}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
            <Field<ValueType<OptionType>>
              id="subNature"
              name="subNature"
              label="Sub Nature"
              defaultValue={subNature}
              isRequired
              validate={(value) => {
                if (value) {
                  return
                }
                return "Please select a business sub-nature."
              }}
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <Select
                    id={`${id}Select`}
                    options={subNatures}
                    isSearchable
                    isClearable
                    {...rest}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormSection>
          <FormSection description="Registration information">
            <Field
              id="businessName"
              name="businessName"
              label="Business Name"
              defaultValue={businessName}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="regDate"
              name="regDate"
              label="Registration Date"
              defaultValue={regDate}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <DatePicker
                    selectProps={{ inputId: `${id}TextField` }}
                    {...rest}
                  />
                  {error &&
                   <ErrorMessage>{error}</ErrorMessage>
                  }
                </>
              )}
            </Field>
            <Field
              id="regNumber"
              name="regNumber"
              label="Registration Number"
              defaultValue={regNumber}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="employeeCount"
              name="employeeCount"
              label="Number of Employees"
              defaultValue={employeeCount}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </FormSection>
          <FormSection description="Contact information">
            <Field
              id="telNumber"
              name="telNumber"
              label="Telephone Number"
              defaultValue={telNumber}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    maxLength={10}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="email"
              name="email"
              label="Email"
              defaultValue={email}
              validate={(value) =>
                value && !value.includes("@") ? "INVALID" : undefined
              }
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error, valid }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && !valid && (
                    <HelperMessage>
                      Enter a valid Email which includes a `@` character
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      Your email is not valid.
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="website"
              name="website"
              label="Website"
              defaultValue={website}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </FormSection>
          <FormSection description="Income infomraion">
            <Field
              id="lAnnualValue"
              name="lAnnualValue"
              label="Last Year Annual Value"
              defaultValue={lAnnualValue}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="annualValue"
              name="annualValue"
              label="Annual Value"
              defaultValue={annualValue}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="taxAmount"
              name="taxAmount"
              label="Tax Amount"
              defaultValue={taxAmount}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              id="otherCharges"
              name="otherCharges"
              label="Other Charges"
              defaultValue={otherCharges}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    {...rest}
                  />
                  {error && (
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                  )}
                </>
              )}
            </Field>
          </FormSection>
        </form>
      )}
    </Form>
  )
}

export default BusinessSection

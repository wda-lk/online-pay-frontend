import Form, { ErrorMessage, Field, FormHeader, FormSection } from "@atlaskit/form"
import Select, { OptionType, ValueType } from "@atlaskit/select"
import { InputSelect } from "@/lib/trade-license/input"
import { PropertySectionProps } from "@/lib/trade-license/section"
import TextField from "@atlaskit/textfield"
import { districts } from "@/lib/data"


const PropertySection = ({ formId, formTitle, handleSubmitSuccess, inputProps }: PropertySectionProps) => {
  const {
    gnDivision,
    ward,
    street,
    assessmentNumber,
    address
  } = inputProps

  const handleSubmit = (
    data: {
      gnDivision: InputSelect
      ward: string
      street: string
      assessmentNumber: string
      address: string
    }) => {
    console.log("hi")

    handleSubmitSuccess({ propertyInputProps: data })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps }) => (
        <form id={formId} {...formProps} style={{ maxWidth: 624 }}>
          <FormHeader
            title={formTitle}
            description="* indicates a required field"
          />
          <FormSection description="Please fill the Business Location information">
            <Field<ValueType<OptionType>>
              id="gnDivision"
              name="gnDivision"
              label="GN Division"
              defaultValue={gnDivision}
              isRequired
              validate={(value) => {
                if (value) {
                  return
                }
                return "Please select a GN division."
              }}
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <Select
                    id={`${id}Select`}
                    options={districts}
                    isSearchable
                    isClearable
                    {...rest}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
            <Field
              id="ward"
              name="ward"
              label="Ward"
              defaultValue={ward}
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
              id="street"
              name="street"
              label="Street"
              defaultValue={street}
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
              id="assessmentNumber"
              name="assessmentNumber"
              label="Assessment Number"
              defaultValue={assessmentNumber}
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
              id="address"
              name="address"
              label="Address"
              defaultValue={address}
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

export default PropertySection

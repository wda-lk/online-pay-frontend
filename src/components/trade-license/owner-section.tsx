import Form, { ErrorMessage, Field, FormHeader, FormSection } from "@atlaskit/form"
import { OwnerSectionProps } from "@/lib/trade-license/section"
import TextField from "@atlaskit/textfield"


const OwnerSection = ({ formId, formTitle, handleSubmitSuccess, inputProps }: OwnerSectionProps) => {
  const {
    mobileNumber,
    ownerName,
    nicNumber,
    address
  } = inputProps

  const handleSubmit = (
    data: {
      mobileNumber: string
      ownerName: string
      nicNumber: string
      address: string
    }) => {
    handleSubmitSuccess({ ownerInputProps: data })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {({ formProps }) => (
        <form id={formId} {...formProps} style={{ maxWidth: 624 }}>
          <FormHeader
            title={formTitle}
            description="* indicates a required field"
          />
          <FormSection description="Plesase fill the Business Owner's personal information">
            <Field
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              defaultValue={mobileNumber}
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
              id="ownerName"
              name="ownerName"
              label="Owner Name (with initials)"
              defaultValue={ownerName}
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
              id="nicNumber"
              name="nicNumber"
              label="NIC Number"
              defaultValue={nicNumber}
              isRequired
            >
              {({ fieldProps: { id, ...rest }, error }) => (
                <>
                  <TextField
                    id={`${id}TextField`}
                    style={{ textTransform: "uppercase" }}
                    maxLength={12}
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

export default OwnerSection

import {
  ErrorMessage,
  Field,
  FormSection
} from "@atlaskit/form"
import TextField from "@atlaskit/textfield"


const PropertyOwnerSection = () => (
  <FormSection>
    <Field
      id="mobileNumber"
      name="mobileNumber"
      label="Mobile Number"
      defaultValue=""
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
      defaultValue=""
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
      defaultValue=""
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
      defaultValue=""
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
)

export default PropertyOwnerSection

import {
  ErrorMessage,
  Field,
  FormSection
} from "@atlaskit/form"
import TextField from "@atlaskit/textfield"


const IncomeSection = () => (
  <FormSection>
    <Field
      id="lAnuualValue"
      name="lAnuualValue"
      label="Last Year Annual Value"
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
      id="anuualValue"
      name="anuualValue"
      label="Annual Value"
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
      id="taxAmount"
      name="taxAmount"
      label="Tax Amount"
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
      id="otherCharges"
      name="otherCharges"
      label="Other Charges"
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

export default IncomeSection

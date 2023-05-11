import {
  ErrorMessage,
  Field,
  FormSection
} from "@atlaskit/form"
import Select, {
  OptionType,
  ValueType
} from "@atlaskit/select"
import TextField from "@atlaskit/textfield"
import { districts } from "@/lib/data"


const PropertyLocationSection = () => (
  <FormSection>
    <Field<ValueType<OptionType>>
      id="gnDivision"
      name="gnDivision"
      label="GN Division"
      isRequired
    >
      {({ fieldProps: { id, ...rest } }) => (
        <Select
          id={`${id}Select`}
          options={districts}
          isSearchable
          isClearable
          {...rest}
        />
      )}
    </Field>
    <Field
      id="ward"
      name="ward"
      label="Ward"
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
      id="street"
      name="street"
      label="Street"
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
      id="assessmentNumber"
      name="assessmentNumber"
      label="Assessment Number"
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

export default PropertyLocationSection

import {
  ErrorMessage,
  Field,
  FormSection
} from "@atlaskit/form"
import Select, {
  OptionType,
  ValueType
} from "@atlaskit/select"
import {
  districts,
  taxTypes
} from "@/lib/data"
import TextField from "@atlaskit/textfield"


const ApplicantSection = () => (
  <>
    <FormSection description="Please select the Tax type, for which you're submitting this Application">
      <Field<ValueType<OptionType>>
        id="taxType"
        name="taxType"
        label="Tax Type"
        isRequired
      >
        {({ fieldProps: { id, ...rest } }) => (
          <Select
            id={`${id}Select`}
            options={taxTypes}
            isSearchable
            isClearable
            {...rest}
          />
        )}
      </Field>
    </FormSection>
    <FormSection description="Personal information">
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
        name="name"
        label="Name (with initials)"
        defaultValue=""
        isRequired
      >
        {({ fieldProps: { id, ...rest } }: any) => (
          <TextField
            id={`${id}TextField`}
            {...rest}
          />
        )}
      </Field>
    </FormSection>
    <FormSection description="Home Address information">
      <Field<ValueType<OptionType>>
        id="district"
        name="district"
        label="District"
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
      <Field<ValueType<OptionType>>
        id="localAuthority"
        name="localAuthority"
        label="Local Authority"
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
        name="address"
        label="Address"
        defaultValue=""
        isRequired
      >
        {({ fieldProps: { id, ...rest } }: any) => (
          <TextField
            id={`${id}TextField`}
            {...rest}
          />
        )}
      </Field>
    </FormSection>
    <FormSection description="Contact information">
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
    </FormSection>
  </>
)

export default ApplicantSection

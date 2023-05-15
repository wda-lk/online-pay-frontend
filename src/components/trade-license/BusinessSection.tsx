import {
  ErrorMessage,
  Field,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import Select, {
  OptionType,
  ValueType
} from "@atlaskit/select"
import {
  natures,
  subNatures
} from "@/lib/data"
import { DatePicker } from "@atlaskit/datetime-picker"
import TextField from "@atlaskit/textfield"


const BusinessSection = () => (
  <>
    <FormSection description="Nature informaiton">
      <Field<ValueType<OptionType>>
        id="nature"
        name="nature"
        label="Nature"
        isRequired
      >
        {({ fieldProps: { id, ...rest } }) => (
          <Select
            id={`${id}Select`}
            options={natures}
            isSearchable
            isClearable
            {...rest}
          />
        )}
      </Field>
      <Field<ValueType<OptionType>>
        id="subNature"
        name="subNature"
        label="Sub Nature"
        isRequired
      >
        {({ fieldProps: { id, ...rest } }) => (
          <Select
            id={`${id}Select`}
            options={subNatures}
            isSearchable
            isClearable
            {...rest}
          />
        )}
      </Field>
    </FormSection>
    <FormSection description="Registration information">
      <Field
        id="businessName"
        name="businessName"
        label="Business Name"
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
        id="regDate"
        name="regDate"
        label="Registration Date"
        defaultValue="2023-01-01"
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
        id="employeeCount"
        name="employeeCount"
        label="Number of Employees"
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
    <FormSection description="Contact information">
      <Field
        id="telNumber"
        name="telNumber"
        label="Telephone Number"
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
        id="email"
        name="email"
        label="Email"
        defaultValue=""
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
    <FormSection description="Income infomraion">
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
  </>
)

export default BusinessSection

import Form, {
  ErrorMessage,
  Field,
  FormHeader,
  FormSection, HelperMessage
} from "@atlaskit/form"
import React, {
  useState
} from "react"
import Select, {
  OptionType,
  ValueType
} from "@atlaskit/select"
import {
  districts, natures, subNatures,
  taxTypes
} from "@/lib/data"
import Button from "@atlaskit/button/standard-button"
import Dashboard from "@/components/dashboard/dashboard"
import { DatePicker } from "@atlaskit/datetime-picker"
import EmptyState from "@atlaskit/empty-state"
import { NextPage } from "next"
import { ProgressIndicator } from "@atlaskit/progress-indicator"
import TextField from "@atlaskit/textfield"


const StartupSection = () => (
  <>
    <FormSection>
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
    <FormSection>
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
    </FormSection>
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
  </>
)

const BusinessLocationSection = () => (
  <>
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
  </>
)

const PropertyOwnerSection = () => (
  <>
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
  </>
)

const BusinessSection = () => (
  <>
    <FormSection>
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
    <FormSection>
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
    <FormSection>
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
  </>
)

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

const SummarySection = () => (
  <EmptyState
    header="Double check if all the data is correct"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat."
  />
)

type ApplicationProgressIndicatorProps = {
  steps: string[],
  selectedIndex: number,
  handlePrev: any,
  handleNext: any
}

const ApplicationProgressIndicator = (
  {
    steps,
    selectedIndex,
    handlePrev,
    handleNext
  }: ApplicationProgressIndicatorProps) => (
  <FormSection>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Button
        isDisabled={selectedIndex === 0}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <ProgressIndicator
        selectedIndex={selectedIndex}
        values={steps}
      />
      <Button
        isDisabled={selectedIndex === steps.length - 1}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  </FormSection>
)

const ApplicationForm = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const steps = ["first", "second", "third", "fourth", "fifth", "six"]

  const handlePrev = () => {
    setSelectedIndex((prevState) => prevState - 1)
  }

  const handleNext = () => {
    setSelectedIndex((prevState) => prevState + 1)
  }

  switch (selectedIndex) {
    case 0:
      return (
        <>
          <StartupSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 1:
      return (
        <>
          <BusinessLocationSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 2:
      return (
        <>
          <PropertyOwnerSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 3:
      return (
        <>
          <BusinessSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 4:
      return (
        <>
          <IncomeSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 5:
      return (
        <>
          <SummarySection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    default:
      return (
        <>
          <StartupSection/>
          <ApplicationProgressIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
  }
}

const TradeLicenseApplicationPage: NextPage = () => {
  const navItems = [
    {
      key: "tradeLicenseApplicationNavItem",
      href: "/dashboard/trade-license",
      label: "Application"
    }
  ]

  return (
    <Dashboard
      activeNavigationKey="tradeLicenseNavItem"
      activeSubNavigationKey="tradeLicenseApplicationNavItem"
      subNavigationItems={navItems}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          maxWidth: "100%",
          minHeight: "100%"
        }}
      >
        <Form onSubmit={console.log}>
          {({ formProps }) => (
            <form{...formProps}>
              <FormHeader
                description="* indicates a required field"
              />
              <ApplicationForm/>
            </form>
          )}
        </Form>
      </div>
    </Dashboard>
  )
}

export default TradeLicenseApplicationPage

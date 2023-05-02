import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import Select, {
  ValueType
} from "@atlaskit/select"
import {
  districts,
  users
} from "../../../lib/data"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import TextField from "@atlaskit/textfield"
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled"
import WatchIcon from "@atlaskit/icon/glyph/watch"
import { useRouter } from "next/router"
import { useState } from "react"


const RegistrationPage: NextPage = () => {
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const router = useRouter()

  const handleSubmit = (
    data: {
      nicNumber: string
      name: string
      address: string
      district: string
      mobileNumber: string
      email: string
      password: string
      confirmPassword: string
    }) => {
    const errors = {
      // Todo NIC and email should be unique
      mobileNumber: users.some(e => e.mobileNumber === data.mobileNumber)
                 ? "Mobile number is already taken. Please try another one."
                 : undefined,
      confirmPassword: data.password !== data.confirmPassword
                       ? "Passwords doesn't match. Please double check."
                       : undefined
    }
    // Todo - Create an inactive user in the database
    if (!errors.mobileNumber && !errors.confirmPassword) {
      users.push(
        {
          nicNumber: data.nicNumber,
          name: data.name,
          address: data.address,
          district: data.district,
          mobileNumber: data.mobileNumber,
          email: data.email,
          password: data.password,
          isActive: false
        }
      )
      console.log(`Created new user for: ${data.mobileNumber}`)
      router.push(
        {
          pathname: "/register/verify-account",
          query: { "nic-number": data.nicNumber, "email": data.email }
        }).then(r => console.log(r))
    }
    return errors
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader
              title="Create an Account"
              description="* indicates a required field"
            />
            <FormSection>
              <Field
                name="nicNumber"
                label="NIC Number"
                defaultValue=""
                isRequired
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      style={{ textTransform: "uppercase" }}
                      maxLength={12}
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
                {({ fieldProps }: any) => (
                  <TextField {...fieldProps}/>
                )}
              </Field>
              <Field
                name="address"
                label="Address"
                defaultValue=""
                isRequired
              >
                {({ fieldProps }: any) => (
                  <TextField {...fieldProps}/>
                )}
              </Field>
              <Field<ValueType<{}>>
                name="district"
                label="District"
                defaultValue={null}
                isRequired
                validate={(value) => {
                  if (value) {
                    return
                  }
                  return "Please select a district."
                }}
              >
                {({ fieldProps: { id, ...rest }, error }) => (
                  <>
                    <Select<{}>
                      inputId={id}
                      {...rest}
                      options={districts}
                      isClearable
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
            </FormSection>
            <FormSection>
              <Field
                name="mobileNumber"
                label="Mobile Number"
                defaultValue=""
                isRequired
              >
                {({ fieldProps }: any) => (
                  <TextField
                    {...fieldProps}
                    maxLength={10}
                  />
                )}
              </Field>
              <Field
                name="email"
                label="Email"
                defaultValue=""
                validate={(value) =>
                  value && !value.includes("@") ? "INVALID" : undefined
                }
              >
                {({ fieldProps, error, valid }) => (
                  <>
                    <TextField {...fieldProps}/>
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
                name="password"
                label="Password"
                defaultValue=""
                isRequired
                validate={(value) =>
                  value && value.length < 6 ? "INVALID" : undefined
                }
              >
                {({ fieldProps, error, valid }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      elemAfterInput={
                        <Button
                          iconBefore={
                            passwordVisible
                            ? <WatchFilledIcon label="Toggle Password" size="medium"/>
                            : <WatchIcon label="Toggle Password" size="medium"/>
                          }
                          appearance="subtle-link"
                          spacing="compact"
                          onClick={() => setPasswordVisibility(!passwordVisible)}
                        />
                      }
                      type={passwordVisible ? "text" : "password"}
                    />
                    {error && !valid && (
                      <HelperMessage>
                        Use 6 or more characters with a mix of letters, numbers and symbols.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Password needs to have more than 6 characters.
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
              <Field
                name="confirmPassword"
                label="Confirm Password"
                defaultValue=""
                isRequired
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      elemAfterInput={
                        <Button
                          iconBefore={
                            passwordVisible
                            ? <WatchFilledIcon label="Toggle Password" size="medium"/>
                            : <WatchIcon label="Toggle Password" size="medium"/>
                          }
                          appearance="subtle-link"
                          spacing="compact"
                          onClick={() => setPasswordVisibility(!passwordVisible)}
                        />
                      }
                      type={passwordVisible ? "text" : "password"}
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
            <FormFooter>
              <ButtonGroup>
                <Button appearance="link">
                  <Link href="/login"><a>Already have an account? Log in</a></Link>
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Create
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default RegistrationPage

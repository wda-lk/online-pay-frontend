import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../components/card"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import TextField from "@atlaskit/textfield"
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled"
import WatchIcon from "@atlaskit/icon/glyph/watch"
import { useState } from "react"
import { users } from "../../lib/users"
import utilStyles from "../../styles/utils.module.css"


export default function RegistrationPage() {
  const [passwordVisible, setPasswordVisibility] = useState(false)

  const handleSubmit = (data: { nicNumber: string; password: string; confirmPassword: string }) => {
    const errors = {
      nicNumber: users.some(e => e.nic === data.nicNumber)
                 ? "User NIC is already taken. Try another one."
                 : undefined,
      confirmPassword: data.password !== data.confirmPassword
                       ? "Passwords doesn't match. Please double check."
                       : undefined
    }
    if (!errors.nicNumber) {
      console.log(data)
    }
    return errors
  }

  return (
    <div className={utilStyles.fullHeightContainer}>
      <Card
        content={
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
                    {({ fieldProps, error, valid }) => {
                      return (
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
                      )
                    }}
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
                    {({ fieldProps, error, valid }) => {
                      return (
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
                      )
                    }}
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
                    <Button appearance="link"><Link href="/login/">Already have an account? Log in</Link></Button>
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
        }
      />
    </div>
  )
}

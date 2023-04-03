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
import Card from "../../../components/card"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import TextField from "@atlaskit/textfield"
import { useRef } from "react"
import { useRouter } from "next/router"
import { useState } from "react"
import { users } from "../../../lib/users"
import utilStyles from "../../../styles/utils.module.css"


export default function VerifyAccountPage() {
  const router = useRouter()
  const [hasSentVerification, sendVerification] = useState(false)
  const existingUser = useRef(users.find(e => e.email === router.query.email))

  const handleEmailSubmit = (data: { email: string; }) => {
    if (router.query.email !== data.email) {
      if (existingUser.current) {
        // Todo - Persist the changed data of the user
        existingUser.current.email = data.email
        console.log(existingUser)
        console.log("User Email was changed.")
      } else {
        console.log("Critical error occurred. Inactive user doesn't exist for the email.")
        return
      }
    }
    // Todo - Fetch code from backend and send it to the email
    console.log("Verification code was emailed.")
    sendVerification(!hasSentVerification)
  }

  const verificationEmailForm =
    <Form onSubmit={handleEmailSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Send Verification"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              name="email"
              label="Email the verification to"
              defaultValue={router.query.email}
              isRequired
              validate={(value) =>
                value && !value.includes("@") ? "INVALID" : undefined
              }
            >
              {({ fieldProps, error, valid }) => (
                <>
                  <TextField {...fieldProps} />
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
          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="link">
                <Link href="/register">Return to registration</Link>
              </Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Send verification
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>

  const handleCodeSubmit = (data: { code: string; }) => {
    // Todo - Verify if the codes match
    const errors = {
      code: data.code !== "123456"
            ? "Invalid code, Please double check your Email."
            : undefined
    }
    if (!errors.code) {
      // Todo - Persist the changed data of the user
      if (existingUser.current) {
        existingUser.current.isActive = true
      }
      console.log(existingUser)
    }
    return errors
  }

  const verificationCodeForm =
    <Form onSubmit={handleCodeSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Verification code sent"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              name="code"
              label="Code to verify your account"
              defaultValue=""
              isRequired
            >
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    {...fieldProps}
                    minLength={6}
                    maxLength={6}
                  />
                  {!error && (
                    <HelperMessage>
                      Enter the six digit verification code
                    </HelperMessage>
                  )}
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
                <Link href="/register">Return to registration</Link>
              </Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Verify
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>

  return (
    <div className={utilStyles.fullHeightContainer}>
      <Card content={hasSentVerification ? verificationCodeForm : verificationEmailForm}/>
    </div>
  )
}

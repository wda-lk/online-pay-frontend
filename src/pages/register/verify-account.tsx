import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import Banner from "@atlaskit/banner"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import { NextPage } from "next"
import TextField from "@atlaskit/textfield"
import styles from "@/pages/login/index.module.css"
import { token } from "@atlaskit/tokens"
import { useRef } from "react"
import { useRouter } from "next/router"
import { useState } from "react"
import { users } from "../../../lib/users"


const VerifyAccountPage: NextPage = () => {
  const router = useRouter()
  const [hasSentVerification, sendVerification] = useState(false)
  const [isBannerShown, showBanner] = useState(false)
  const existingUser = useRef(users.find(e => e.email === router.query.email))

  const handleEmailSubmit = (data: { email: string; }) => {
    let user = existingUser.current
    if (user) {
      if (router.query.email !== data.email) {
        // Todo - Persist the changed data of the user
        user.email = data.email
        console.log("User Email was changed.")
      }
      // Todo - Fetch code from backend and send it to the email
      sendVerification(!hasSentVerification)
      isBannerShown && showBanner(!isBannerShown)
    } else {
      console.log("User account unavailable. Please fill out the registration form.")
      !isBannerShown && showBanner(!isBannerShown)
    }
  }

  const handleCodeSubmit = (data: { code: string; }) => {
    let user = existingUser.current
    if (user) {
      // Todo - Verify if the codes match from API
      const errors = {
        code: data.code !== "123456"
              ? "Invalid code, Please double check your Email."
              : undefined
      }
      if (!errors.code) {
        // Todo - Persist the changed data of the user
        user.isActive = true
        console.log("User account activated.")
        router.push({ pathname: "/login" }).then(r => console.log(r))
      }
      return errors
    } else {
      console.log("User account unavailable. Please fill out the registration form.")
      !isBannerShown && showBanner(!isBannerShown)
    }
  }

  const emailForm =
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
              defaultValue={router.query.email || ""}
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

  const verifyForm =
    <Form onSubmit={handleCodeSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Verify user account"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              name="code"
              label={`Code was sent to ${existingUser.current && existingUser.current.email}`}
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
                      Six digit verification code
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
              <div className={styles.buttonGroupInternal}>
                <Button appearance="link">
                  <Link href="/register">Return to registration</Link>
                </Button>
                <HipchatMediaAttachmentCountIcon
                  primaryColor={token("color.icon.disabled", N400A)}
                  size="small"
                  label=""
                />
                <Button
                  appearance="link"
                  onClick={e => sendVerification(!hasSentVerification)}
                >
                  Resend code
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Verify
                </LoadingButton>
              </div>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>

  return (
    <>
      {isBannerShown && (
        <Banner
          appearance="error"
          icon={<ErrorIcon label="" secondaryColor="inherit"/>}
        >
          User account unavailable. Please fill out the registration form.{" "}
        </Banner>
      )}
      <Card>
        {hasSentVerification ? verifyForm : emailForm}
      </Card>
    </>
  )
}

export default VerifyAccountPage

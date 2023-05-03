import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection, HelperMessage
} from "@atlaskit/form"
import React, {
  MutableRefObject,
  useRef,
  useState
} from "react"
import {
  User,
  users
} from "../../../lib/data"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Image from "next/future/image"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import { NextPage } from "next"
import SlotWrapper from "../../../components/slot-wrapper"
import TextField from "@atlaskit/textfield"
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled"
import WatchIcon from "@atlaskit/icon/glyph/watch"
import openLetterImage from "../../../public/images/open-letter.svg"
import styles from "@/pages/login/index.module.css"
import { token } from "@atlaskit/tokens"
import { useRouter } from "next/router"


const ResetPasswordPage: NextPage = () => {
  const router = useRouter()
  const [hasSentRecovery, sendRecovery] = useState(false)
  const [hasVerifiedCode, verifyCode] = useState(false)
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const existingUser: MutableRefObject<User | undefined> = useRef()

  const handleEmailSubmit = (data: { email: string }) => {
    let user = users.find(e => e.email === data.email)
    if (!user) {
      return { email: "Email address is not registered. Please try another one." }
    }
    existingUser.current = user
    sendRecovery(true)
    return
  }

  const handleCodeSubmit = (data: { code: string; }) => {
    // Todo - Verify if the codes match from API
    const errors = {
      code: data.code !== "123456"
            ? "Invalid code, Please double check your Email."
            : undefined
    }
    if (!errors.code) {
      verifyCode(true)
      return
    }
    return errors
  }

  const handleResetSubmit = (data: { password: string, confirmPassword: string }) => {
    const errors = {
      confirmPassword: data.password !== data.confirmPassword
                       ? "Passwords doesn't match. Please double check."
                       : undefined
    }
    if (!errors.confirmPassword) {
      existingUser.current && (existingUser.current.password = data.password)
      router.push({ pathname: "/login" }).then(r => console.log(r))
      return
    }
    return errors
  }

  const emailForm =
    <Form onSubmit={handleEmailSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Can't log in?"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              label="We'll send a recovery code to"
              name="email"
              isRequired
              validate={(value) =>
                value && !value.includes("@") ? "Your email is not valid." : undefined
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
                <Link href="/login"><a>Return to log in</a></Link>
              </Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Send recovery code
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>

  const recoveryForm =
    <Form onSubmit={handleCodeSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Recover your account"
            description="* indicates a required field"
          />
          <FormSection>
            <SlotWrapper>
              <p>
                We sent a recovery code to you at<br/>
                <b>{existingUser.current && existingUser.current.email}</b>
              </p>
              <Image
                style={{
                  margin: "12px 0 0 0",
                  height: "88px",
                  width: "100px"
                }}
                src={openLetterImage}
                alt="Email sent"
              />
            </SlotWrapper>
          </FormSection>
          <FormSection>
            <Field
              name="code"
              label="Verification Code"
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
                      Six digit recovery code
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
                  <Link href="/login"><a>Return to log in</a></Link>
                </Button>
                <HipchatMediaAttachmentCountIcon
                  primaryColor={token("color.icon.disabled", N400A)}
                  size="small"
                  label=""
                />
                <Button
                  appearance="link"
                  onClick={() => sendRecovery(false)}
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

  const resetForm =
    <Form onSubmit={handleResetSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Enter your new password"
            description="* indicates a required field"
          />
          <FormSection>
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
              <div className={styles.buttonGroupInternal}>
                <Button appearance="link">
                  <Link href="/login"><a>Return to log in</a></Link>
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Confirm the reset
                </LoadingButton>
              </div>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>

  return (
    <Card>
      {hasSentRecovery ? hasVerifiedCode ? resetForm : recoveryForm : emailForm}
    </Card>
  )
}

export default ResetPasswordPage

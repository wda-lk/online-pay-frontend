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
import Image from "next/future/image"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import SlotWrapper from "../../../components/slot-wrapper"
import TextField from "@atlaskit/textfield"
import openLetterImage from "../../../public/images/open-letter.svg"
import styles from "@/pages/login/index.module.css"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import { token } from "@atlaskit/tokens"
import { N400A } from "@atlaskit/theme/colors"


const ResetPasswordPage: NextPage = () => {
  const [hasSentRecovery, sendRecovery] = useState(false)
  const existingUser: MutableRefObject<User | undefined> = useRef()

  const handleSubmit = (data: { email: string }) => {
    let user = users.find(e => e.email === data.email)
    if (!user) {
      return { email: "Email address is not registered. Please try another one." }
    }
    existingUser.current = user
    sendRecovery(true)
    return
  }

  const emailForm =
    <Form onSubmit={handleSubmit}>
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

  const recoverForm =
    <Form onSubmit={handleSubmit}>
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
                  onClick={() => sendRecovery(true)}
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
    <Card>
      {emailForm}
    </Card>
  )
}

export default ResetPasswordPage

import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import React, { useRef } from "react"
import Banner from "@atlaskit/banner"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Image from "next/image"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import { NextPage } from "next"
import SlotLabel from "../../../components/slot-label"
import SlotWrapper from "../../../components/slot-wrapper"
import TextField from "@atlaskit/textfield"
import openLetterImage from "../../../public/images/open-letter.svg"
import styles from "@/pages/login/index.module.css"
import { token } from "@atlaskit/tokens"
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
    <>
      <Form onSubmit={handleCodeSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader
              title="Verify Your Account"
              description="* indicates a required field"
            />
            <FormSection>
              <SlotWrapper hasExtraPadding={true}>
                <p>
                  We sent a verification code to you at<br/>
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
    </>

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

import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage
} from "@atlaskit/form"
import React, {
  useRef
} from "react"
import Banner from "@atlaskit/banner"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Image from "next/future/image"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import { NextPage } from "next"
import { RadioGroup } from "@atlaskit/radio"
import SlotWrapper from "../../../components/slot-wrapper"
import TextField from "@atlaskit/textfield"
import openLetterImage from "../../../public/images/open-letter.svg"
import styles from "@/pages/login/index.module.css"
import { token } from "@atlaskit/tokens"
import { useRouter } from "next/router"
import { useState } from "react"
import { users } from "../../../lib/data"


const ActivateAccountPage: NextPage = () => {
  /*Todo -
     API - Query user account
     Can we keep the account in context*/
  const [isBannerShown, showBanner] = useState(false)
  // True if verification method is sms verification, otherwise False
  const [hasDefaultActivationMethod, changeActivationMethod] = useState(true)
  const [hasSentActivation, sendActivationCode] = useState(false)
  const router = useRouter()
  let email = router.query.email
  let mobileNumber = router.query["mobile-number"]
  let existingUser = useRef(users.find(e => e.mobileNumber === mobileNumber))

  const handleCodeRequest = (data: { senderReference: string; }) => {
    if (existingUser.current) {
      /*Todo -
         API - Update user's data
         API - Generate a recovery code*/
      hasDefaultActivationMethod ? (mobileNumber !== data.senderReference) && (mobileNumber = data.senderReference)
                                 : (email !== data.senderReference) && (email = data.senderReference)
      sendActivationCode(true)
      isBannerShown && showBanner(!isBannerShown)
    } else {
      console.log("User account unavailable. Please fill out the registration form.")
      !isBannerShown && showBanner(!isBannerShown)
    }
  }

  const handleCodeSubmit = (data: { code: string; }) => {
    let user = existingUser.current
    if (user) {
      // Todo - Frontend - Verify the codes
      const errors = {
        code: data.code !== "123456"
              ? "Invalid code, Please double check your Email."
              : undefined
      }
      if (!errors.code) {
        // Todo - API - Update user's active status
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

  const requestForm =
    <Form onSubmit={handleCodeRequest}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Send Verification"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              name="verificationMethodField"
              label="Pick a verification method"
            >
              {({ fieldProps: { value } }) => (
                <RadioGroup
                  name="verificationMethod"
                  defaultValue={hasDefaultActivationMethod ? "sms" : "email"}
                  onChange={e =>
                    e.currentTarget.value == "sms" ? changeActivationMethod(true)
                                                   : changeActivationMethod(false)
                  }
                  options={[
                    {
                      name: "verificationMethod",
                      value: "sms",
                      label: "SMS",
                      isDisabled: router.query["mobile-number"] == undefined
                    },
                    {
                      name: "verificationMethod",
                      value: "email",
                      label: "Email",
                      isDisabled: router.query.email == undefined
                    }
                  ]}
                  value={value}
                  isRequired
                />
              )}
            </Field>
            {
              hasDefaultActivationMethod
              ?
              <Field
                name="mobileNumber"
                label="Mobile Number"
                defaultValue={router.query["mobile-number"] || ""}
                isRequired
              >
                {({ fieldProps }: any) => (
                  <TextField
                    {...fieldProps}
                    maxLength={10}
                  />
                )}
              </Field>
              :
              <Field
                name="email"
                label="Email the verification to"
                defaultValue={router.query.email || ""}
                isRequired
                validate={(value) =>
                  value && !value.includes("@") ? "Your email is not valid." : undefined
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
                      <ErrorMessage>{error}</ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            }

          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="link">
                <Link href="/register"><a>Return to registration</a></Link>
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

  const activationForm =
    <Form onSubmit={handleCodeSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Activate Your Account"
            description="* indicates a required field"
          />
          <FormSection>
            <SlotWrapper>
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
                  <Link href="/register"><a>Return to registration</a></Link>
                </Button>
                <HipchatMediaAttachmentCountIcon
                  primaryColor={token("color.icon.disabled", N400A)}
                  size="small"
                  label=""
                />
                <Button
                  appearance="link"
                  onClick={() => sendActivationCode(false)}
                >
                  Retry sending a code
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Activate
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
        {hasSentActivation ? activationForm : requestForm}
      </Card>
    </>
  )
}

export default ActivateAccountPage

import Form, {
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import { useRef, useState } from "react"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "@/components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import Image from "next/future/image"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import { R500 } from "@atlaskit/theme/colors"
import SlotWrapper from "@/components/slot-wrapper"
import TextField from "@atlaskit/textfield"
import openLetterImage from "../../../public/images/open-letter.svg"
import { signIn } from "next-auth/react"
import { token } from "@atlaskit/tokens"
import { useFlags } from "@atlaskit/flag"


const SignInPage: NextPage = () => {
  const [hasSentMagicLink, setMagicLinkSent] = useState(false)
  const { showFlag } = useFlags()
  let emailRef = useRef("")

  const handleSignIn = async (data: { email: string }) => {
    return await signIn(
      "email",
      {
        email: data.email,
        callbackUrl: `${window.location.origin}/dashboard`,
        redirect: false
      })
      .then((res) => {
        let error = res?.error
        if (error) {
          console.log(error)
          showFlag(
            {
              isAutoDismiss: true,
              icon: (<ErrorIcon label="Error" primaryColor={token("color.icon.danger", R500)}/>),
              title: "Failed to Sign you in",
              description: "Error occurred while trying to create an account for your Email. " +
                           "Please retry later or from another email"
            })
          return
        }
        emailRef.current = data.email
        setMagicLinkSent(true)
      })
  }

  const signInForm = (
    <Form onSubmit={handleSignIn}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader
            title="Sign In to your Account"
            description="* indicates a required field"
          />
          <FormSection>
            <Field
              name="email"
              label="Email"
              defaultValue=""
              isRequired
            >
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Sign In
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  )

  const announcementForm = (
    <Form onSubmit={console.log}>
      {(formProps) => (
        <form {...formProps}>
          <FormHeader title="Confirm your Email"/>
          <FormSection>
            <SlotWrapper>
              <p>
                We emailed a magic link to: <strong>{emailRef.current}</strong>
                <br/>
                Check your inbox and click the link in the email to login.
              </p>
              <Image
                style={{
                  margin: "12px 0 0 0",
                  height: "88px",
                  width: "100px"
                }}
                src={openLetterImage}
                alt="Sent an Email"
              />
            </SlotWrapper>
          </FormSection>
          <FormFooter>
            <Button
              appearance="primary"
              onClick={() => setMagicLinkSent(false)}
            >
              Return to sign in
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
  )

  return (
    <Card>
      {hasSentMagicLink ? announcementForm : signInForm}
    </Card>
  )
}

export default SignInPage

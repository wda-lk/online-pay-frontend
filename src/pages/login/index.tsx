import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import {
  N400A,
  Y300
} from "@atlaskit/theme/colors"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import TextField from "@atlaskit/textfield"
import WarningIcon from "@atlaskit/icon/glyph/warning"
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled"
import WatchIcon from "@atlaskit/icon/glyph/watch"
import styles from "./index.module.css"
import { token } from "@atlaskit/tokens"
import { useFlags } from "@atlaskit/flag"
import { useRouter } from "next/router"
import { useState } from "react"
import { users } from "../../../lib/data"


const LoginPage: NextPage = () => {
  const router = useRouter()
  const { showFlag } = useFlags()
  const [passwordVisible, setPasswordVisibility] = useState(false)

  const handleSubmit = (data: { nicNumber: string; password: string; }) => {
    let existingUser = users.find(e => e.nicNumber === data.nicNumber)
    // validate input data against existing user data
    if (!existingUser) {
      return { nicNumber: "NIC number is not registered. Please try another one." }
    }
    if (existingUser.password !== data.password) {
      return { password: "Passwords is incorrect. Please double check." }
    }
    if (!existingUser.isActive) {
      showFlag({
                 isAutoDismiss: true,
                 icon: (
                   <WarningIcon
                     label="Warning"
                     primaryColor={token("color.icon.warning", Y300)}
                   />
                 ),
                 title: "Failed to log you in",
                 description: "To use our services, your account needs to be activated. Clicking on the below link " +
                              "will take you to our activation portal.",
                 actions: [
                   {
                     content: "Activate my account",
                     onClick: () => router
                       .push({
                               pathname: "/register/verify-account",
                               query: { "nic-number": data.nicNumber, "email": existingUser!.email }
                             })
                       .then(r => console.log(r))
                   }
                 ]
               })
    } else {
      // user logged in without any issues
      router.push("/dashboard").then(r => console.log(r))
      console.log(data)
    }
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader
              title="Login to an Account"
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
                name="password"
                label="Password"
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
                    <Link href="/login/reset-password"><a>Can&apos;t log in?</a></Link>
                  </Button>
                  <HipchatMediaAttachmentCountIcon
                    primaryColor={token("color.icon.disabled", N400A)}
                    size="small"
                    label=""
                  />
                  <Button appearance="link">
                    <Link href="/register"><a>Create an account</a></Link>
                  </Button>
                  <LoadingButton
                    type="submit"
                    appearance="primary"
                    isLoading={submitting}
                  >
                    Login
                  </LoadingButton>
                </div>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default LoginPage

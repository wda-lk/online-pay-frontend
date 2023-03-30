import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import TextField from "@atlaskit/textfield"
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled"
import WatchIcon from "@atlaskit/icon/glyph/watch"
import styles from "./index.module.css"
import { token } from "@atlaskit/tokens"
import { useState } from "react"
import { users } from "../../../lib/users"
import utilStyles from "../../../styles/utils.module.css"


export default function LoginPage() {
  const [passwordVisible, setPasswordVisibility] = useState(false)

  const handleSubmit = (data: { nicNumber: string; password: string; }) => {
    let existingUser = users.find(e => e.nicNumber === data.nicNumber)
    if (!existingUser) {
      return {
        mobileNumber: "NIC number is not registered. Please try another one."
      }
    }
    const errors = {
      password: existingUser.password !== data.password
                ? "Passwords is incorrect. Please double check."
                : undefined
    }
    if (!errors.password) {
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
                      <Button appearance="link">Can&apos;t log in?</Button>
                      <HipchatMediaAttachmentCountIcon
                        primaryColor={token("color.icon.disabled", N400A)}
                        size="small"
                        label=""
                      />
                      <Button appearance="link">
                        <Link href="/register">Create an account</Link>
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
        }
      />
    </div>
  )
}

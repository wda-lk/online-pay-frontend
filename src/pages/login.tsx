import Form, {
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import React, { Component } from "react"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../components/card"
import HipchatMediaAttachmentCountIcon from "@atlaskit/icon/glyph/hipchat/media-attachment-count"
import LoadingButton from "@atlaskit/button/loading-button"
import { N400A } from "@atlaskit/theme/colors"
import TextField from "@atlaskit/textfield"
import styles from "./login.module.css"
import { token } from "@atlaskit/tokens"
import utilStyles from "../../styles/utils.module.css"


export default class LoginPage extends Component<{}> {
  render() {
    return (
      <div className={utilStyles.fullHeightContainer}>
        <Card
          content={
            <Form
              <{ username: string; password: string; remember: boolean }>
              onSubmit={(data) => {
                console.log("form data", data)
                return new Promise(
                  (resolve) => setTimeout(resolve, 2000)
                ).then(() => data.username === "error" ? { username: "IN_USE" } : undefined
                )
              }}
            >
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <FormHeader
                    title="Login to an Account"
                    description="* indicates a required field"
                  />
                  <FormSection>
                    <Field
                      label="Mobile Number"
                      name="mobile"
                      isRequired
                    >
                      {({ fieldProps }: any) => (
                        <>
                          <TextField {...fieldProps}/>
                        </>
                      )}
                    </Field>
                    <Field
                      label="Password"
                      name="password"
                      isRequired
                    >
                      {({ fieldProps }: any) => (
                        <>
                          <TextField {...fieldProps}/>
                        </>
                      )}
                    </Field>
                  </FormSection>
                  <FormFooter>
                    <ButtonGroup>
                      <div className={styles.buttonGroupInternal}>
                        <Button appearance="link">Forgot Password?</Button>
                        <HipchatMediaAttachmentCountIcon
                          primaryColor={token("color.icon.disabled", N400A)}
                          size="small"
                          label=""
                        />
                        <Button appearance="link">Create an account</Button>
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
}

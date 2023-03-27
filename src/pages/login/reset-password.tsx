import React, { Component } from "react"
import utilStyles from "../../../styles/utils.module.css"
import Card from "../../../components/card"
import Form, { Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import TextField from "@atlaskit/textfield"
import ButtonGroup from "@atlaskit/button/button-group"
import Button from "@atlaskit/button/standard-button"
import LoadingButton from "@atlaskit/button/loading-button"

export default class ResetPasswordPage extends Component<{}> {
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
                    title="Can't log in?"
                    description="* indicates a required field"
                  />
                  <FormSection>
                    <Field
                      label="Email"
                      name="email"
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
                      <Button appearance="link">Return to log in</Button>
                      <LoadingButton
                        type="submit"
                        appearance="primary"
                        isLoading={submitting}
                      >
                        Send recovery link
                      </LoadingButton>
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

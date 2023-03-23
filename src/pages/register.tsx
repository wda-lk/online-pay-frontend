import Form, {
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import React, { Component } from "react"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Image from "next/image"
import LoadingButton from "@atlaskit/button/loading-button"
import { N700 } from "@atlaskit/theme/colors"
import TextField from "@atlaskit/textfield"
import UserFormCard from "../../components/user-form-card"
import logoDefault from "../../public/logo/cat2020-default.svg"
import logoNeutral from "../../public/logo/cat2020-compact-neutral.svg"
import { token } from "@atlaskit/tokens"


export default class RegistrationForm extends Component<{}> {
  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <UserFormCard
          logo={{
            "url": logoDefault,
            "alt": "Cat2020 logo"
          }}
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
                    title="Create an Account"
                    description="* indicates a required field"
                  />
                  <FormSection>
                    <Field
                      label="NIC Number"
                      name="nicNumber"
                      isRequired
                    >
                      {({ fieldProps }: any) => (
                        <>
                          <TextField {...fieldProps}/>
                        </>
                      )}
                    </Field>
                    <Field
                      label="Name (with initials)"
                      name="name"
                      isRequired
                    >
                      {({ fieldProps }: any) => (
                        <>
                          <TextField {...fieldProps}/>
                        </>
                      )}
                    </Field>
                  </FormSection>

                  <FormSection>
                    <Field
                      label="Mobile Number"
                      name="mobile"
                    >
                      {({ fieldProps }: any) => (
                        <>
                          <TextField {...fieldProps}/>
                        </>
                      )}
                    </Field>
                    <Field
                      label="Email"
                      name="email"
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
                    <Field
                      label="Confirm Password"
                      name="passwordConfirmation"
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
                      <Button appearance="link">Already have an account? Log in</Button>
                      <LoadingButton
                        type="submit"
                        appearance="primary"
                        isLoading={submitting}
                      >
                        Create
                      </LoadingButton>
                    </ButtonGroup>
                  </FormFooter>
                </form>
              )}
            </Form>
          }
          footer={
            <>
              <Image
                src={logoNeutral}
                alt="Cat2020 Neutral logo"
                style={{
                  margin: "auto"
                }}
              />
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  color: token("color.text.success", N700)
                }}
              >
                © 2023 CAT2020
                <br/>
                Wayamba Development Authority
              </div>
            </>
          }
        />
      </div>
    )
  }
}

import Form, {
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../components/card"
import LoadingButton from "@atlaskit/button/loading-button"
import Test from "../../components/test"
import TextField from "@atlaskit/textfield"
import utilStyles from "../../styles/utils.module.css"


export default function RegistrationPage() {
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
                        <TextField {...fieldProps} maxLength={12}/>
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
                    isRequired
                  >
                    {({ fieldProps }: any) => (
                      <>
                        <TextField
                          {...fieldProps}
                          elemBeforeInput={
                            <Test/>
                          }
                        />
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
      />
    </div>
  )
}

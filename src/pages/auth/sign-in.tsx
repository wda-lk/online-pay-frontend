import Form, { Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import Card from "@/components/card"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import TextField from "@atlaskit/textfield"
import { signIn } from "next-auth/react"


const SignInPage: NextPage = () => {
  const handleSubmit = async (data: { email: string }) => {
    await signIn("email", { email: data.email })
    return
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader
              title="Sign in to Continue"
              description="* indicates a required field"
            >
            </FormHeader>
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
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
                style={{ height: 40, alignItems: "center" }}
                shouldFitContainer
              >
                Continue
              </LoadingButton>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default SignInPage

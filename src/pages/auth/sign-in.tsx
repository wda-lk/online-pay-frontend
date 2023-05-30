import Form, { Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "@/components/card"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import TextField from "@atlaskit/textfield"
import { signIn } from "next-auth/react"


const SignInPage: NextPage = () => {
  const handleSubmit = async (data: { email: string }) => {
    await signIn("email", { email: data.email})
    return
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
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
    </Card>
  )
}

export default SignInPage

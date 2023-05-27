import Form, {
  Field,
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "@/components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import LoadingButton from "@atlaskit/button/loading-button"
import { NextPage } from "next"
import { R500 } from "@atlaskit/theme/colors"
import TextField from "@atlaskit/textfield"
import { signIn } from "next-auth/react"
import { token } from "@atlaskit/tokens"
import { useFlags } from "@atlaskit/flag"
import { useRouter } from "next/router"


const SignInPage: NextPage = () => {
  const router = useRouter()
  const { showFlag } = useFlags()

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
        router
          .push({ pathname: "/auth/confirm-account", query: { "email": data.email } })
          .then(console.log)
      })
  }

  return (
    <Card>
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
    </Card>
  )
}

export default SignInPage

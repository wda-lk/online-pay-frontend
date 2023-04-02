import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection, HelperMessage
} from "@atlaskit/form"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "../../../components/card"
import Link from "next/link"
import LoadingButton from "@atlaskit/button/loading-button"
import TextField from "@atlaskit/textfield"
import { useRouter } from "next/router"
import utilStyles from "../../../styles/utils.module.css"

export default function VerifyAccountPage() {
  const router = useRouter()

  return (
    <div className={utilStyles.fullHeightContainer}>
      <Card
        content={
          <Form
            onSubmit={(data) => {
              console.log("form data", data)
            }}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <FormHeader
                  title="Verify your Account"
                  description="* indicates a required field"
                />
                <FormSection>
                  <Field
                    name="email"
                    label="Email the verification to"
                    defaultValue={router.query.email}
                    isRequired
                    validate={(value) =>
                      value && !value.includes("@") ? "INVALID" : undefined
                    }
                  >
                    {({ fieldProps, error, valid }) => (
                      <>
                        <TextField {...fieldProps} />
                        {error && !valid && (
                          <HelperMessage>
                            Enter a valid Email which includes a `@` character
                          </HelperMessage>
                        )}
                        {error && (
                          <ErrorMessage>
                            Your email is not valid.
                          </ErrorMessage>
                        )}
                      </>
                    )}
                  </Field>
                </FormSection>
                <FormFooter>
                  <ButtonGroup>
                    <Button appearance="link">
                      <Link href="/register">Return to registration</Link>
                    </Button>
                    <LoadingButton
                      type="submit"
                      appearance="primary"
                      isLoading={submitting}
                    >
                      Send verification
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

import Form, {
  FormFooter,
  FormHeader,
  FormSection
} from "@atlaskit/form"
import Button from "@atlaskit/button/standard-button"
import Card from "@/components/card"
import Image from "next/future/image"
import { NextPage } from "next"
import SlotWrapper from "@/components/slot-wrapper"
import openLetterImage from "../../../public/images/open-letter.svg"
import { useRouter } from "next/router"


const ConfirmAccount: NextPage = () => {
  const router = useRouter()

  return (
    <Card>
      <Form onSubmit={console.log}>
        {(formProps) => (
          <form {...formProps}>
            <FormHeader title="Confirm your Email"/>
            <FormSection>
              <SlotWrapper>
                <p>
                  We emailed a magic link to: <strong>{router.query["email"]}</strong>
                  <br/>
                  Check your inbox and click the link in the email to login.
                </p>
                <Image
                  style={{
                    margin: "12px 0 0 0",
                    height: "88px",
                    width: "100px"
                  }}
                  src={openLetterImage}
                  alt="Sent an Email"
                />
              </SlotWrapper>
            </FormSection>
            <FormFooter>
              <Button
                appearance="primary"
                onClick={() => router.push("/auth/sign-in").then(console.log)}
              >
                Return to sign in
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default ConfirmAccount

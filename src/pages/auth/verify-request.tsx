import Form, { FormHeader, FormSection } from "@atlaskit/form"
import Card from "@/components/card"
import Image from "next/future/image"
import { NextPage } from "next"
import { easeIn } from "@atlaskit/motion";
import { keyframes } from "@emotion/react";
import openLetterImage from "../../../public/images/open-letter.svg"


const VerifyRequestPage: NextPage = () => {
  const movesRight = keyframes`
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(300%);
    }
    100% {
      transform: translateX(0);
    }
  `

  return (
    <Card>
      <Form onSubmit={console.log}>
        {(formProps) => (
          <form {...formProps}>
            <FormHeader title="Confirm your Email"/>
            <FormSection>
              <p>
                We emailed a magic link to your Email address. Please check your inbox and click
                the link in the email to login.
              </p>
              <Image
                style={{
                  marginTop: 24,
                  height: "88px",
                  width: "100px"
                }}
                css={{
                  animationName: `${movesRight}`,
                  animationDuration: `2000ms`,
                  animationTimingFunction: easeIn,
                  animationIterationCount: "infinite"
                }}
                src={openLetterImage}
                alt="Sent an Email"
              />
            </FormSection>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default VerifyRequestPage

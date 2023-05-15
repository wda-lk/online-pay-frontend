import Form, {
  FormFooter, FormHeader,
  FormSection
} from "@atlaskit/form"
import {
  ProgressTracker,
  Stages
} from "@atlaskit/progress-tracker"
import React, {
  ReactNode,
  useState
} from "react"
import ApplicantSection from "@/components/trade-license/ApplicantSection"
import BusinessSection from "@/components/trade-license/BusinessSection"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Dashboard from "@/components/dashboard"
import { NextPage } from "next"
import OwnerSection from "@/components/trade-license/OwnerSection"
import PropertySection from "@/components/trade-license/PropertySection"
import { Status } from "@atlaskit/progress-tracker/types"
import SummarySection from "@/components/trade-license/SummarySection"


interface Step {
  id: string
  label: string
  percentageComplete: number
  status: Status
  href: string
  formTitle: string
  content?: ReactNode
  secondaryButton: {
    label: string
    onClick?: () => void
  }
  primaryButton: {
    label: string
    onClick?: () => void
  }
}

const ApplicationPage: NextPage = () => {
  const [currentStepIndex, changeStep] = useState(0)

  const goToNextStep = () => {
    changeStep(currentStepIndex + 1)
  }

  const goToPreviousStep = () => {
    changeStep(currentStepIndex - 1)
  }

  const steps: Step[] = [
    {
      id: "applicant-step",
      label: "Applicant Information",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Applicant Information Section",
      content: <ApplicantSection/>,
      secondaryButton: { label: "Cancel" },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "property-step",
      label: "Property Information",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Property Information Section",
      content: <PropertySection/>,
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "owner-step",
      label: "Owner Information",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Owner Information Section",
      content: <OwnerSection/>,
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "business-step",
      label: "Business Information",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Business Information Section",
      content: <BusinessSection/>,
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "preview-step",
      label: "Preview",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Preview Section",
      content: <SummarySection/>,
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Complete" }
    }
  ]
  const currentStep = steps[currentStepIndex]

  const getProgressSteps = (): Stages => {
    return steps.map((step, index) => {
      return {
        id: step.id,
        label: step.label,
        percentageComplete: currentStepIndex > index ? 100 : 0,
        status: currentStepIndex === index ? "current" as Status : step.status,
        href: step.href
      }
    })
  }

  return (
    <Dashboard
      navigationKey="tradeLicenseItem"
      subNavigationKey="tradeLicenseApplicationItem"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 624
        }}
      >
        <Form onSubmit={console.log}>
          {({ formProps }) => (
            <form{...formProps}>
              <FormHeader
                title={currentStep.label}
                description="* indicates a required field"
              />
              <FormSection>
                {currentStep.content || "No Content Available"}
              </FormSection>
              <FormSection>
                <ProgressTracker items={getProgressSteps()}/>
              </FormSection>
              <FormFooter>
                <ButtonGroup>
                  <Button
                    appearance="subtle"
                    onClick={currentStep.secondaryButton.onClick}
                  >
                    {currentStep.secondaryButton.label}
                  </Button>
                  <Button
                    appearance="primary"
                    onClick={currentStep.primaryButton.onClick}
                  >
                    {currentStep.primaryButton.label}
                  </Button>
                </ButtonGroup>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    </Dashboard>
  )
}

export default ApplicationPage

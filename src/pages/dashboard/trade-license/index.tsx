import Form, {
  FormFooter,
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
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Select, {
  OptionType,
  ValueType
} from "@atlaskit/select"
import {
  districts, natures, subNatures,
  taxTypes
} from "@/lib/data"
import Button from "@atlaskit/button/standard-button"
import Dashboard from "@/components/dashboard/dashboard"
import { DatePicker } from "@atlaskit/datetime-picker"
import EmptyState from "@atlaskit/empty-state"
import BusinessSection from "@/components/trade-license/BusinessSection"
import IncomeSection from "@/components/trade-license/IncomeSection"
import { NextPage } from "next"
import { Status } from "@atlaskit/progress-tracker/types"


interface Step {
  id: string
  label: string
  percentageComplete: number
  status: Status
  href: string
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
      id: "user-step",
      label: "User",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      secondaryButton: { label: "Cancel" },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "property-step",
      label: "Property",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "owner-step",
      label: "Owner",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "business-step",
      label: "Business",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      secondaryButton: { label: "Prev", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: "preview-step",
      label: "Preview",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
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

  const navItems = [
    {
      key: "tradeLicenseApplicationNavItem",
      href: "/dashboard/trade-license",
      label: "Application"
    }
  ]

  return (
    <Dashboard
      activeNavigationKey="tradeLicenseNavItem"
      activeSubNavigationKey="tradeLicenseApplicationNavItem"
      subNavigationItems={navItems}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 624,
          minHeight: 624,
          borderStyle: "dashed"
        }}
      >
        <Form onSubmit={console.log}>
          {({ formProps }) => (
            <form{...formProps}>
              <FormSection>
                <ProgressTracker items={getProgressSteps()}/>
              </FormSection>
              <FormSection>
                Form
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
              <FormSection>
                <ProgressTracker items={getProgressSteps()}/>
              </FormSection>
            </form>
          )}
        </Form>
      </div>
    </Dashboard>
  )
}

export default ApplicationPage

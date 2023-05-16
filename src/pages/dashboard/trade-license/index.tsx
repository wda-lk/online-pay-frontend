import Form, {
  FormHeader,
  FormSection
} from "@atlaskit/form"
import {
  ProgressTracker,
  Stages
} from "@atlaskit/progress-tracker"
import ApplicantSection from "@/components/trade-license/ApplicantSection"
import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import BusinessSection from "@/components/trade-license/BusinessSection"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Dashboard from "@/components/dashboard/dashboard"
import Drawer from "@atlaskit/drawer"
import DynamicTable from "@atlaskit/dynamic-table"
import { NextPage } from "next"
import OwnerSection from "@/components/trade-license/OwnerSection"
import PageHeader from "@atlaskit/page-header"
import PropertySection from "@/components/trade-license/PropertySection"
import { Status } from "@atlaskit/progress-tracker/types"
import { Step } from "@/lib/step"
import SummarySection from "@/components/trade-license/SummarySection"
import Takeover from "@/components/takeover"
import { useState } from "react"


const TradeLicensePage: NextPage = () => {
  const [applicationOpen, openApplication] = useState(false)
  const [currentStepIndex, changeStep] = useState(0)

  const navItems = [
    {
      key: "tradeLicenseListNavItem",
      href: "/dashboard/trade-license",
      label: "Licenses"
    }
  ]

  const breadcrumbs = [
    { label: "Trade License", href: "/dashboard/trade-license" },
    { label: "Licenses", href: "/dashboard/trade-license" }
  ]

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
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
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
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
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
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
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
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
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
    <>
      <Drawer
        width="extended"
        onClose={() => openApplication(false)}
        isOpen={applicationOpen}
      >
        <Takeover
          progressTracker={(
            <ProgressTracker items={getProgressSteps()}/>
          )}
          navigationButtons={(
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
          )}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 624,
              overflow: "auto"
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
                </form>
              )}
            </Form>
          </div>
        </Takeover>
      </Drawer>
      <Dashboard
        activeNavigationKey="tradeLicenseNavItem"
        activeSubNavigationKey="tradeLicenseListNavItem"
        subNavigationItems={navItems}
      >
        <PageHeader
          breadcrumbs={<BreadcrumbsWrapper breadcrumbs={breadcrumbs}/>}
          actions={
            (
              <ButtonGroup>
                <Button
                  appearance="primary"
                  onClick={() => openApplication(true)}
                >
                  Apply for Trade License
                </Button>
              </ButtonGroup>
            )
          }
        >
          Licenses
        </PageHeader>
        <DynamicTable
          head={undefined}
          rows={undefined}
          rowsPerPage={5}
          defaultPage={1}
          loadingSpinnerSize="large"
          isRankable
        />
      </Dashboard>
    </>
  )
}

export default TradeLicensePage

import Form, { FormHeader, FormSection } from "@atlaskit/form"
import React, { useState } from "react"
import ApplicantSection from "@/components/trade-license/ApplicantSection"
import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import BusinessSection from "@/components/trade-license/BusinessSection"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Dashboard from "@/components/dashboard/dashboard"
import { NextPage } from "next"
import OwnerSection from "@/components/trade-license/OwnerSection"
import PageHeader from "@atlaskit/page-header"
import PropertySection from "@/components/trade-license/PropertySection"
import { Status } from "@atlaskit/progress-tracker/types"
import { Step } from "@/lib/step"
import SummarySection from "@/components/trade-license/SummarySection"
import Takeover from "@/components/takeover"
import styles from "./application.module.css"


const ApplicationForm = () => {
  const [activeStepIndex, changeStep] = useState(1)

  const goToNextStep = () => {
    changeStep(activeStepIndex + 1)
  }

  const goToPreviousStep = () => {
    changeStep(activeStepIndex - 1)
  }

  const steps: Step[] = [
    {
      id: 1,
      label: "Applicant",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Applicant Information Section",
      content: <ApplicantSection/>,
      secondaryButton: { label: "Cancel" },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: 2,
      label: "Property",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Property Information Section",
      content: <PropertySection/>,
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: 3,
      label: "Owner",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Owner Information Section",
      content: <OwnerSection/>,
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: 4,
      label: "Business",
      percentageComplete: 0,
      status: "visited" as Status,
      href: "#",
      formTitle: "Business Information Section",
      content: <BusinessSection/>,
      secondaryButton: { label: "Back", onClick: goToPreviousStep },
      primaryButton: { label: "Next", onClick: goToNextStep }
    },
    {
      id: 5,
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

  const currentStep = steps[activeStepIndex - 1]

  return (
    <Takeover
      progressTracker={
        <div className={styles.mainContainer}>
          <div className={`${styles.stepContainer} ${styles["width-" + activeStepIndex]}`}>
            {steps.map((step) => (
              <div
                className={styles.stepWrapper}
                key={step.id}
              >
                <div
                  className={
                    `${styles.stepStyle} ${activeStepIndex >= step.id ? styles.completed : styles.incomplete}`
                  }
                >
                  {
                    activeStepIndex > step.id
                    ? (<div className={styles.checkMark}>L</div>)
                    : (<span className={styles.stepCount}>{step.id}</span>)
                  }
                </div>
                <div className={styles.stepsLabelContainer}>
                  <span className={styles.stepLabel}>
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      footer={
        <ButtonGroup>
          <Button
            appearance="primary"
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
      }
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
  )
}

const TradeLicenseApplicationPage: NextPage = () => {
  const navItems = [
    {
      key: "tradeLicenseListNavItem",
      href: "/dashboard/trade-license",
      label: "Licenses"
    },
    {
      key: "tradeLicenseApplicationNavItem",
      href: "/dashboard/trade-license/application",
      label: "Application"
    }
  ]

  const breadcrumbs = [
    { label: "Trade License", href: "/dashboard/trade-license" },
    { label: "Application", href: "/dashboard/trade-license/application" }
  ]

  return (
    <Dashboard
      activeNavigationKey="tradeLicenseNavItem"
      activeSubNavigationKey="tradeLicenseApplicationNavItem"
      subNavigationItems={navItems}
    >
      <PageHeader breadcrumbs={<BreadcrumbsWrapper breadcrumbs={breadcrumbs}/>}>
        Application
      </PageHeader>
      <ApplicationForm/>
    </Dashboard>
  )
}

export default TradeLicenseApplicationPage

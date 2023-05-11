import Form, {
  FormFooter,
  FormHeader, FormSection
} from "@atlaskit/form"
import React, {
  useState
} from "react"
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
import ProgressFormIndicator from "@/components/trade-license/ProgressFormIndicator"
import PropertyLocationSection from "@/components/trade-license/PropertyLocationSection"
import PropertyOwnerSection from "@/components/trade-license/PropertyOwnerSection"
import StartupSection from "@/components/trade-license/StartupSection"
import SummarySection from "@/components/trade-license/SummarySection"
import FormProgressTracker from "@/components/trade-license/FormProgressTracker"


const ApplicationForm = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const steps = ["first", "second", "third", "fourth", "fifth", "six"]

  const handlePrev = () => {
    setSelectedIndex((prevState) => prevState - 1)
  }

  const handleNext = () => {
    setSelectedIndex((prevState) => prevState + 1)
  }

  switch (selectedIndex) {
    case 0:
      return (
        <>
          <StartupSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 1:
      return (
        <>
          <PropertyLocationSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 2:
      return (
        <>
          <PropertyOwnerSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 3:
      return (
        <>
          <BusinessSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 4:
      return (
        <>
          <IncomeSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    case 5:
      return (
        <>
          <SummarySection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
    default:
      return (
        <>
          <StartupSection/>
          <ProgressFormIndicator
            steps={steps}
            selectedIndex={selectedIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )
  }
}

const ApplicationPage: NextPage = () => {
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
        height: "624px",
          minHeight: "100%",
        borderStyle: "dashed"
      }}
    >
      <Form onSubmit={console.log}>
        {({ formProps }) => (
          <form{...formProps}>
            <FormSection>
                <FormProgressTracker/>
              </FormSection>
              <FormSection>
              Form
            </FormSection>
            <FormFooter>
              Navigation Buttons
            </FormFooter>
            <FormSection>
              <FormProgressTracker/>
            </FormSection>
            </form>
          )}
        </Form>
      </div>
    </Dashboard>
  )
}

export default ApplicationPage

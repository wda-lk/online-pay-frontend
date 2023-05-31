import React, { useState } from "react"
import { prismaCore, prismaOnlinePay } from "@/lib/prisma"
import { AllInputProps } from "@/../types/trade-license"
import ApplicantSection from "@/components/trade-license/applicant-section"
import BreadcrumbsWrapper from "@/components/breadcrumbs-wrapper"
import BusinessSection from "@/components/trade-license/business-section"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Dashboard from "@/components/dashboard/dashboard"
import { InferGetServerSidePropsType } from "next";
import OwnerSection from "@/components/trade-license/owner-section"
import PageHeader from "@atlaskit/page-header"
import PreviewSection from "@/components/trade-license/preview-section"
import PropertySection from "@/components/trade-license/property-section"
import { Step } from "@/../types/global"
import Takeover from "@/components/takeover"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import styles from "./application.module.css"
import { useRouter } from "next/router"


const defaultPropertyInputProps = {
  gnDivision: undefined,
  ward: "",
  street: "",
  assessmentNumber: "",
  address: ""
}

const defaultOwnerInputProps = {
  mobileNumber: "",
  ownerName: "",
  nicNumber: "",
  address: ""
}

const defaultBusinessInputProps = {
  nature: undefined,
  subNature: undefined,
  businessName: "",
  regDate: "",
  regNumber: "",
  employeeCount: "",
  telNumber: "",
  email: "",
  website: "",
  lAnnualValue: "",
  annualValue: "",
  taxAmount: "",
  otherCharges: ""
}


const ApplicationForm = ({ user, location }: any) => {
  const router = useRouter()
  // To control the progression of the form
  const [activeStepIndex, changeStep] = useState(1)
  const defaultApplicantInputProps = {
    taxType: undefined,
    nicNumber: user.nicNumber,
    name: user.name,
    district: { label: location.districtName, value: location.districtId },
    localAuthority: { label: location.subOfficeName, value: location.subOfficeId },
    gnDivision: { label: location.gnName, value: location.gnId },
    address: user.address,
    mobileNumber: user.mobileNumber
  }
  const [allInputProps, changeInputProps] =
    useState<AllInputProps>({
      applicantInputProps: defaultApplicantInputProps,
      propertyInputProps: defaultPropertyInputProps,
      ownerInputProps: defaultOwnerInputProps,
      businessInputProps: defaultBusinessInputProps
    })

  const nextStep = (data: AllInputProps) => {
    if (data.applicantInputProps) {
      changeInputProps({
          ...allInputProps,
          applicantInputProps: data.applicantInputProps
        })
    } else if (data.propertyInputProps) {
      changeInputProps({
          ...allInputProps,
          propertyInputProps: data.propertyInputProps
        })
    } else if (data.ownerInputProps) {
      changeInputProps({
          ...allInputProps,
          ownerInputProps: data.ownerInputProps
        })
    } else if (data.businessInputProps) {
      changeInputProps({
          ...allInputProps,
          businessInputProps: data.businessInputProps
        })
    }
    changeStep(activeStepIndex + 1)
  }

  const previousStep = () => {
    changeStep(activeStepIndex - 1)
  }

  const submitForm = () => {
    // Todo - API -  Create an Application record
    router.push("/dashboard/trade-license").then(console.log)
  }

  const steps: Step[] = [
    {
      number: 1,
      label: "Applicant",
      formId: "applicantSection",
      formTitle: "Applicant Information Section",
      content:
        <ApplicantSection
          formId="applicantSection"
          formTitle="Applicant Information Section"
          handleSubmitSuccess={nextStep}
          inputProps={allInputProps.applicantInputProps || defaultApplicantInputProps}
        />,
      secondaryButton: { label: "Cancel" },
      primaryButton: { label: "Next" }
    },
    {
      number: 2,
      label: "Property",
      formId: "propertySection",
      formTitle: "Property Information Section",
      content:
        <PropertySection
          formId="propertySection"
          formTitle="Property Information Section"
          handleSubmitSuccess={nextStep}
          inputProps={allInputProps.propertyInputProps || defaultPropertyInputProps}
        />,
      secondaryButton: { label: "Back", onClick: previousStep },
      primaryButton: { label: "Next" }
    },
    {
      number: 3,
      label: "Owner",
      formId: "OwnerSection",
      formTitle: "Owner Information Section",
      content:
        <OwnerSection
          formId="OwnerSection"
          formTitle="Owner Information Section"
          handleSubmitSuccess={nextStep}
          inputProps={allInputProps.ownerInputProps || defaultOwnerInputProps}
        />,
      secondaryButton: { label: "Back", onClick: previousStep },
      primaryButton: { label: "Next" }
    },
    {
      number: 4,
      label: "Business",
      formId: "BusinessSection",
      formTitle: "Business Information Section",
      content:
        <BusinessSection
          formId="BusinessSection"
          formTitle="Business Information Section"
          handleSubmitSuccess={nextStep}
          inputProps={allInputProps.businessInputProps || defaultBusinessInputProps}
        />,
      secondaryButton: { label: "Back", onClick: previousStep },
      primaryButton: { label: "Preview" }
    },
    {
      number: 5,
      label: "Preview",
      formTitle: "Preview Section",
      content: <PreviewSection inputProps={allInputProps}/>,
      secondaryButton: { label: "Back", onClick: previousStep },
      primaryButton: { label: "Submit", onClick: submitForm }
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
                key={step.number}
              >
                <div className={
                  `${styles.stepStyle} ${activeStepIndex >= step.number
                                         ? styles.completed
                                         : styles.incomplete}`
                }
                >
                  {
                    activeStepIndex > step.number
                    ? <div className={styles.checkMark}>L</div>
                    : <span className={
                      `${styles.stepCount} ${activeStepIndex >= step.number
                                             ? styles.completed
                                             : styles.incomplete}`
                    }
                    >
                      {step.number}
                    </span>
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
            appearance="subtle"
            onClick={currentStep.secondaryButton.onClick}
          >
            {currentStep.secondaryButton.label}
          </Button>
          <Button
            appearance="primary"
            type="submit"
            form={currentStep.formId}
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
          overflow: "auto"
        }}
      >
        {currentStep.content || "No Content Available"}
      </div>
    </Takeover>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  const user =
    await prismaOnlinePay.user
                         .findUnique({ where: { email: session?.user?.email } })
  if (!user || !user.gnDivisionId) {
    console.log(`Critical error occurred, Logged in user: ${session?.user?.email} is unavailable 
    or invalid in the server.`)
    await signOut()
    return
  }
  const location =
    await prismaCore.gNDivisionLocation
                    .findUnique({ where: { gnId: user.gnDivisionId } })
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      location
    }
  }
}

const TradeLicenseApplicationPage = ({
  user,
  location
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <ApplicationForm user={user} location={location}/>
    </Dashboard>
  )
}

TradeLicenseApplicationPage.isAuth = true
export default TradeLicenseApplicationPage

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
import ProgressTracker from "@/components/progress-tracker"
import PropertySection from "@/components/trade-license/property-section"
import { Step } from "@/../types/global"
import Takeover from "@/components/takeover"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
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

const ApplicationForm = ({ user, userGNDivision, gnDivisions }: any) => {
  const router = useRouter()
  // To control the progression of the form
  const [activeStepIndex, changeStep] = useState(1)
  const defaultApplicantInputProps = {
    taxType: undefined,
    nicNumber: user.nicNumber,
    name: user.name,
    district: { label: userGNDivision.districtName, value: userGNDivision.districtId },
    localAuthority: { label: userGNDivision.subOfficeName, value: userGNDivision.subOfficeId },
    gnDivision: { label: userGNDivision.gnName, value: userGNDivision.gnId },
    address: user.address,
    mobileNumber: user.mobileNumber
  }
  // To store all the user inputs form the form
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
          gnDivisions={gnDivisions}
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
      progressTracker={<ProgressTracker steps={steps} activeStepIndex={activeStepIndex}/>}
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
      <div style={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto"
      }}>
        {currentStep.content || "No Content Available"}
      </div>
    </Takeover>
  )
}

const getServerSideProps = async (context: any) => {
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
  const gnDivisions
    = await prismaCore.gNDivisionLocation
                      .findMany({
                        where: { isActive: true },
                        orderBy: { gnName: "asc" }
                      })
  const userGNDivision =
    gnDivisions.filter(gn => gn.gnId === user.gnDivisionId)[0]
  if (!userGNDivision) {
    console.log(`Critical error occurred, User's GN Division: ${user.gnDivisionId} is not found in 
    the database.`)
    await signOut()
    return
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      userGNDivision,
      gnDivisions // load this async in the Select
    }
  }
}

const TradeLicenseApplicationPage = ({
  user,
  userGNDivision,
  gnDivisions
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
      <ApplicationForm user={user} userGNDivision={userGNDivision} gnDivisions={gnDivisions}/>
    </Dashboard>
  )
}

TradeLicenseApplicationPage.isAuth = true
export default TradeLicenseApplicationPage
export { getServerSideProps }

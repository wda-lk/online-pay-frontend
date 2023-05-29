import Form, { ErrorMessage, Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import Select, { ValueType } from "@atlaskit/select"
import Card from "@/components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import { GetStaticProps } from "next"
import { InputSelect } from "@/../types/trade-license"
import LoadingButton from "@atlaskit/button/loading-button"
import { R500 } from "@atlaskit/theme/colors"
import { SelectOption } from "@/../types/global"
import TextField from "@atlaskit/textfield"
import { prismaCore } from "@/lib/prisma"
import { token } from "@atlaskit/tokens"
import { useFlags } from "@atlaskit/flag"
import { useState } from "react"
import { useSession } from "next-auth/react"


const getStaticProps: GetStaticProps = async () => {
  const districts = await
    prismaCore
      .district
      .findMany(
        {
          where: { status: 1 },
          select: { id: true, nameEnglish: true },
          orderBy: { nameEnglish: "asc" }
        })
  const gnDivisions = await
    prismaCore
      .gNDivisionLocation
      .findMany(
        {
          where: { isActive: true },
          select: { gnId: true, gnName: true, districtId: true, districtName: true }
        })
  return { props: { districts, gnDivisions } }
}

type District = {
  id: number
  nameEnglish?: string
}

type GNDivision = {
  gnId: number
  gnName: string
  districtId?: number
  districtName?: string
}

type UserInfoPageProps = {
  districts: District[]
  gnDivisions: GNDivision[]
}

const UserInfoPage = ({ districts, gnDivisions }: UserInfoPageProps) => {
  const { showFlag } = useFlags()
  const [districtId, setDistrictId] = useState<number | null>(null)
  const { data: session, status } = useSession()
  console.log(session)

  const handleSubmit = async (data: {
    nicNumber: string,
    name: string,
    mobileNumber: string,
    district: InputSelect,
    gnDivision: InputSelect,
    address: string
  }) => {
    // GET /api/users/[nicNumber]
    let res = await fetch(`${window.location.origin}/api/users/${data.nicNumber}`)
    let status = res.status
    let body = await res.json()
    // If a critical error occurred
    if (status !== 200 && status !== 404) {
      showFlag(
        {
          isAutoDismiss: true,
          icon: (<ErrorIcon label="Error" primaryColor={token("color.icon.danger", R500)}/>),
          title: "Failed to Sign you in",
          description: `Error occurred while validating the information you entered. Status: ${status}, Error: ${body}`
        })
      return
    }
    // User with NIC already exists
    const errors = {
      nicNumber: status === 200
                 ? "NIC number is already taken. Please try another one."
                 : undefined
    }
    if (!errors.nicNumber) {
      // Update user record
      const reqData = {
        nicNumber: data.nicNumber,
        name: data.name,
        mobileNumber: data.mobileNumber,
        gnDivisionId: parseInt(data.gnDivision.value),
        address: data.address
      }
      // POST /api/users
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData)
      }
      res = await fetch(`${window.location.origin}/api/users`, options)
      // status = res.status
      // body = await res.json()
      // // User updating failed
      // if (status !== 201) {
      //   showFlag(
      //     {
      //       isAutoDismiss: true,
      //       icon: (<ErrorIcon label="Error" primaryColor={token("color.icon.danger", R500)}/>),
      //       title: "Failed to Sign you in",
      //       description: `Error occurred while completing your profile. Status: ${status}, Error: ${body}`
      //     })
      // }
    }
    return errors
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting, setFieldValue }) => (
          <form {...formProps}>
            <FormHeader
              title="Complete your Profile"
              description="* indicates a required field"
            />
            <FormSection>
              <Field
                name="nicNumber"
                label="NIC Number"
                defaultValue=""
                isRequired
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      style={{ textTransform: "uppercase" }}
                      maxLength={12}
                    />
                    {error && (
                      <ErrorMessage>
                        {error}
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
              <Field
                name="name"
                label="Name (with initials)"
                defaultValue=""
                isRequired
              >
                {({ fieldProps }: any) => (
                  <TextField {...fieldProps}/>
                )}
              </Field>
              <Field
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                defaultValue=""
                isRequired
              >
                {({ fieldProps: { id, ...rest }, error }) => (
                  <>
                    <TextField
                      id={`${id}TextField`}
                      maxLength={10}
                      {...rest}
                    />
                    {error && (
                      <ErrorMessage>
                        {error}
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            </FormSection>
            <FormSection>
              <Field<ValueType<SelectOption>>
                name="district"
                label="District"
                defaultValue={null}
                isRequired
                validate={(value) => {
                  if (value) {
                    return
                  }
                  return "Please select your District."
                }}
              >
                {({ fieldProps: { id, onChange, ...rest }, error }) => (
                  <>
                    <Select<SelectOption>
                      inputId={id}
                      {...rest}
                      options={
                        districts.map(district => {
                          return {
                            value: district.id.toString(),
                            label: district.nameEnglish || "undefined"
                          }
                        })
                      }
                      isClearable
                      onChange={(e) => {
                        setDistrictId(e && parseInt(e.value))
                        setFieldValue("gnDivision", null)
                        onChange(e)
                      }}
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <Field<ValueType<SelectOption>>
                name="gnDivision"
                label="Grama Niladari(GN) Division"
                defaultValue={null}
                isRequired
                validate={(value) => {
                  if (value) {
                    return
                  }
                  return "Please select your Grama Niladari(GN) Division."
                }}
              >
                {({ fieldProps: { id, ...rest }, error }) => (
                  <>
                    <Select<SelectOption>
                      inputId={id}
                      {...rest}
                      options={
                        districtId ? gnDivisions
                                     .filter(gn => gn.districtId == districtId)
                                     .map(gn => {
                                       return {
                                         value: gn.gnId.toString(),
                                         label: gn.gnName
                                       }
                                     })
                                   : []
                      }
                      isClearable
                      isDisabled={!districtId}
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <Field
                name="address"
                label="Address"
                defaultValue=""
                isRequired
              >
                {({ fieldProps }: any) => (
                  <TextField {...fieldProps}/>
                )}
              </Field>
            </FormSection>
            <FormFooter>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
              >
                Create
              </LoadingButton>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

export default UserInfoPage
export { getStaticProps }

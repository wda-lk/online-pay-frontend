import Form, { ErrorMessage, Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import Select, { ValueType } from "@atlaskit/select"
import Button from "@atlaskit/button/standard-button"
import ButtonGroup from "@atlaskit/button/button-group"
import Card from "@/components/card"
import ErrorIcon from "@atlaskit/icon/glyph/error"
import { GetStaticProps } from "next"
import { InputSelect } from "@/../types/trade-license"
import LoadingButton from "@atlaskit/button/loading-button"
import { R500 } from "@atlaskit/theme/colors"
import { ResponseData } from "@/../types/global";
import { SelectOption } from "@/../types/global"
import TextField from "@atlaskit/textfield"
import { prismaCore } from "@/lib/prisma"
import { signOut } from "next-auth/react"
import { token } from "@atlaskit/tokens"
import { useFlags } from "@atlaskit/flag"
import { useRouter } from "next/router";
import { useState } from "react"


const getStaticProps: GetStaticProps = async () => {
  // Query all Districts and GN divisions through static rendering since these are not frequently
  // changed
  const districts
    = await prismaCore.district
                      .findMany({
                        where: { status: 1 },
                        select: { id: true, nameEnglish: true },
                        orderBy: { nameEnglish: "asc" }
                      })
  const gnDivisions
    = await prismaCore.gNDivisionLocation
                      .findMany({
                        where: { isActive: true },
                        select: {
                          gnId: true,
                          gnName: true,
                          districtId: true,
                          districtName: true
                        },
                        orderBy: { gnName: "asc" }
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

type NewUserPageProps = {
  districts: District[]
  gnDivisions: GNDivision[]
}

const NewUserPage = ({ districts, gnDivisions }: NewUserPageProps) => {
  const router = useRouter()
  const { showFlag } = useFlags()
  const [
    districtId,
    setDistrictId
  ] = useState<number | null>(null)

  const handleSubmit = async (data: {
    nicNumber: string,
    name: string,
    mobileNumber: string,
    district: InputSelect,
    gnDivision: InputSelect,
    address: string
  }) => {
    const nicNumber = data.nicNumber.toUpperCase()
    // GET /api/users?nicNumber=[nicNumber]
    let res = await fetch(
      `${window.location.origin}/api/users?nicNumber=${nicNumber}`
    )
    let status = res.status
    let body: ResponseData = await res.json()
    if (status !== 200 && status !== 404) {
      showFlag({
        isAutoDismiss: true,
        icon: <ErrorIcon label="Error" primaryColor={token("color.icon.danger", R500)}/>,
        title: body.error || "Failed to Sign you in",
        description: body.message
      })
      return
    }
    // If NIC number is already taken show an error near the input
    if (status === 200) {
      return {
        nicNumber: "NIC number is already taken. Please try another one."
      }
    }
    // PUT /api/users
    res = await fetch(`${window.location.origin}/api/users`,
      {
        method: "PUT",
        body: JSON.stringify({
          nicNumber: nicNumber,
          name: data.name,
          mobileNumber: data.mobileNumber,
          gnDivisionId: parseInt(data.gnDivision.value),
          address: data.address
        })
      })
    status = res.status
    body = await res.json()
    if (status !== 201) {
      showFlag({
        isAutoDismiss: true,
        icon: <ErrorIcon label="Error" primaryColor={token("color.icon.danger", R500)}/>,
        title: body.error || "Failed to Sign you in",
        description: body.message
      })
      return
    }
    router.push("/dashboard").then(console.log)
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
                {({
                  fieldProps: { id, ...rest },
                  error
                }) => (
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
                {({
                  fieldProps: { id, onChange, ...rest },
                  error
                }) => (
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
                {({
                  fieldProps: { id, ...rest },
                  error
                }) => (
                  <>
                    <Select<SelectOption>
                      inputId={id}
                      {...rest}
                      options={
                        districtId
                        ? gnDivisions
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
              <ButtonGroup>
                <Button appearance="link" onClick={() => signOut()}>
                  Return to sign in
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Submit
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </Card>
  )
}

NewUserPage.isAuth = true
export default NewUserPage
export { getStaticProps }

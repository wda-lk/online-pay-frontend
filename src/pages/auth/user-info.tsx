import Form, { ErrorMessage, Field, FormFooter, FormHeader, FormSection } from "@atlaskit/form"
import Select, { ValueType } from "@atlaskit/select"
import Card from "@/components/card"
import { GetStaticProps } from "next"
import LoadingButton from "@atlaskit/button/loading-button"
import { SelectOption } from "@/../types/global"
import TextField from "@atlaskit/textfield"
import { prismaCore } from "@/lib/prisma"
import { useState } from "react"


const getStaticProps: GetStaticProps = async () => {
  const districts = await prismaCore
    .district
    .findMany(
      {
        where: { status: 1 },
        select: { id: true, nameEnglish: true },
        orderBy: { nameEnglish: "asc" }
      })
  const gnDivisions = await prismaCore
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
  const [districtId, setDistrictId] = useState<number | null>(null)

  const handleSubmit = (
    data: {
      nicNumber: string
      name: string
      address: string
      gnDivision: string
      mobileNumber: string
    }) => {
    /*users.push(
      {
        nicNumber: data.nicNumber,
        name: data.name,
        address: data.address,
        gnDivision: data.gnDivision,
        mobileNumber: data.mobileNumber,
        email: data.email,
        password: data.password,
        isActive: false
      }
    )
    console.log(`Created new user for: ${data.nicNumber}`)
    router.push(
      {
        pathname: "/register/activate-account",
        query: { "mobile-number": data.mobileNumber, "email": data.email }
      }).then(r => console.log(r))*/
    return
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting, setFieldValue, getValues }) => (
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

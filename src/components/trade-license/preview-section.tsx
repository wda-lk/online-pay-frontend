import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import { AllInputProps } from "@/lib/trade-license/input"
import { N100 } from "@atlaskit/theme/colors"
import dynamic from "next/dynamic"
import { token } from "@atlaskit/tokens"


const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  { ssr: false }
)

const styles = StyleSheet.create(
  {
    page: {
      padding: 35
    },
    horizontalLine: {
      width: "100%",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.8px",
      borderBottomColor: token("color.text", N100),
      margin: "15px 0"
    },
    paragraph: {
      fontSize: 10,
      fontFamily: "Times-Roman"
    },
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 5
    },
    inputIndex: {
      width: 35,
      textAlign: "left"
    },
    inputLabel: {
      width: 220
    },
    inputFiller: {
      display: "flex",
      flexWrap: "wrap",
      borderBottomStyle: "dotted",
      borderBottomWidth: "1px",
      borderBottomColor: token("color.text", N100),
      width: 270
    },
    sectionContainer: {
      display: "flex"
    },
    filler: {
      textDecoration: "underline",
      textDecorationColor: token("color.text", N100),
      textDecorationStyle: "dashed"
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    footerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    signatureDate: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    signatureContainer: {
      display: "flex",
      alignItems: "center",
      paddingTop: 8
    },
    signatureFiller: {
      width: 100,
      // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
      borderBottom: "1px dotted black",
      marginBottom: 2
    }
  }
)

type PreviewSectionProps = {
  inputProps: AllInputProps
}

const PreviewSection = ({ inputProps }: PreviewSectionProps) => {
  const {
    applicantInputProps,
    propertyInputProps,
    ownerInputProps,
    businessInputProps
  } = inputProps

  let current = new Date().toJSON()
  let currentDate = current.slice(0, 10)
  let currentYear = current.slice(2, 4)

  return (
    <PDFViewer style={{ height: "65vh" }}>
      <Document>
        <Page style={styles.page}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={{ width: 70, margin: "0 auto 10px auto" }}
            src="/images/gov-logo.png"
          />
          <View style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            <Text style={{ fontSize: 13, fontFamily: "Times-Bold", fontWeight: "bold", marginBottom: 5 }}>
              Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "Times-Bold", textDecoration: "underline", marginBottom: 5 }}>
              Payment Application for Trade License / Industrial tax / Business Tax for year 20{currentYear}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>1.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                {"Industry / Business Owner's name"}
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {ownerInputProps?.ownerName}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>2.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Personal Address
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {ownerInputProps?.address}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>3.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                National Identity number
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {ownerInputProps?.nicNumber}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>4.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Telephone number
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {ownerInputProps?.mobileNumber}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>5.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business name
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.businessName}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>6.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business nature
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.nature?.value}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>7.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business address
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {propertyInputProps?.address}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>8.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business Assessment number
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {propertyInputProps?.assessmentNumber}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>9.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business Registration number
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.regNumber}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>10.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Industry / Business Registration date
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.regDate}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>11.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Employee count
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.employeeCount}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>12.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Email
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.email}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.paragraph, styles.inputIndex]}>13.</Text>
              <Text style={[styles.paragraph, styles.inputLabel]}>
                Annual value
              </Text>
              <Text style={[styles.paragraph, styles.inputFiller]}>
                {businessInputProps?.annualValue}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <Text style={styles.paragraph}>Director,</Text>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Sri Lanka.</Text>
            <Text style={[styles.paragraph, { marginBottom: 10 }]}>
              Please issue a trade license for the location of above mentioned industry / business for year of
              20{currentYear}
            </Text>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Signature</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <Text style={styles.paragraph}>Recommendation of the revenue inspector,</Text>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Sri Lanka.</Text>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>
              I hereby report that the information provided by the applicant is accurate and for year 20{currentYear},
              {businessInputProps?.businessName} is being maintained at this location.
            </Text>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Signature of Revenue inspector</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <Text style={styles.paragraph}>Regional Medical officer of health,</Text>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Sri Lanka.</Text>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Please report.</Text>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Chairman/Secretary/Officer in Charge</Text>
                <Text style={styles.paragraph}>Pradeshiya Sabha Head/Sub office</Text>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page}>
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.paragraph}>Regional Medical officer of health,</Text>
                <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Sri Lanka.</Text>
              </View>
              <Text style={[{ marginBottom: 10 }, styles.paragraph]}>My Number: Pol/L.G ....................</Text>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Public Health inspector</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.paragraph}>Chairman/Secretary/Officer in Charge,</Text>
                <Text style={styles.paragraph}>Pradeshiya Sabha Head/Sub office,</Text>
                <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Sri Lanka.</Text>
              </View>
            </View>
            <Text style={[styles.paragraph, { marginBottom: 10 }]}>
              {"Approve / Didn't approve"}
            </Text>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Regional Health medical officer,</Text>
                <Text style={styles.paragraph}>Sri Lanka.</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Approval of Revenue inspector,</Text>
            </View>
            <Text style={[{ marginBottom: 10 }, styles.paragraph]}>
              All the information provided by the applicant is truthful, and for the year of 20
              <Text style={styles.filler}>{currentYear}</Text>, business/industry&nbsp;
              <Text style={styles.filler}>{businessInputProps?.businessName}</Text> which is situated at&nbsp;
              <Text style={styles.filler}>{propertyInputProps?.address}</Text>, is valued for a net worth/net income
              &nbsp;of Rs.<Text style={styles.filler}>{businessInputProps?.annualValue}</Text> should be charged with
              &nbsp;a business tax/industrial tax/trade license tax of Rs.
              <Text style={styles.filler}>{businessInputProps?.taxAmount}</Text>&nbsp;.
            </Text>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Signature of Revenue inspector</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Approve/Disapprove issuing of the license,</Text>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Signature of Secretary,</Text>
                <Text style={styles.paragraph}>Sri Lanka.</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={[{ marginBottom: 10 }, styles.paragraph]}>Approve/Disapprove issuing of the license,</Text>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.signatureDate}>
                <Text style={styles.paragraph}>Date: </Text>
                <Text style={[styles.signatureFiller, styles.paragraph]}>{currentDate}</Text>
              </View>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureFiller}></Text>
                <Text style={styles.paragraph}>Signature of Chairman,</Text>
                <Text style={styles.paragraph}>Sri Lanka.</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default PreviewSection

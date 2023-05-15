import dynamic from "next/dynamic"


const Breadcrumbs = dynamic(
  () => import("@atlaskit/breadcrumbs"),
  { ssr: false }
)
const BreadcrumbsItem = dynamic(
  () => import("@atlaskit/breadcrumbs").then((module) => module.BreadcrumbsItem),
  { ssr: false }
)

type Breadcrumb = {
  label: string
  href: string
}

type BreadcrumbsWrapperProps = {
  breadcrumbs: Breadcrumb[]
}

const BreadcrumbsWrapper = ({ breadcrumbs }: BreadcrumbsWrapperProps) => (
  <Breadcrumbs>
    {
      breadcrumbs.map(breadcrumb => {
        console.log(breadcrumb)
        return (
          <BreadcrumbsItem
            key=""
            href={breadcrumb.href}
            text={breadcrumb.label}
          />
        )
      })
    }
  </Breadcrumbs>
)

export default BreadcrumbsWrapper

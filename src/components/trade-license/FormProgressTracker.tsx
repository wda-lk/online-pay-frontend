import {
  ProgressTracker,
  Stages
} from "@atlaskit/progress-tracker"

const FormProgressTracker = () => {
  const items: Stages = [
    {
      id: "user-stage",
      label: "Stage 01 - User",
      percentageComplete: 0,
      status: "unvisited",
      href: "#"
    },
    {
      id: "property-stage",
      label: "Stage 02 - Property",
      percentageComplete: 0,
      status: "unvisited",
      href: "#"
    },
    {
      id: "business-stage",
      label: "Stage 03 - Business",
      percentageComplete: 0,
      status: "unvisited",
      href: "#"
    },
    {
      id: "preview-stage",
      label: "Stage 04 - Preview",
      percentageComplete: 0,
      status: "unvisited",
      href: "#"
    }
  ]

  return (
    <div style={{ margin: "auto" }}>
      <ProgressTracker items={items} spacing="comfortable"/>
    </div>
  )
}

export default FormProgressTracker

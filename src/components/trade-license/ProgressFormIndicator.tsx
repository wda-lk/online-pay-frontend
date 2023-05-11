import Button from "@atlaskit/button/standard-button"
import { FormSection } from "@atlaskit/form"
import { ProgressIndicator } from "@atlaskit/progress-indicator"


type ProgressFormIndicatorProps = {
  steps: string[],
  selectedIndex: number,
  handlePrev: any,
  handleNext: any
}

const ProgressFormIndicator = ({ steps, selectedIndex, handlePrev, handleNext }: ProgressFormIndicatorProps) => (
  <FormSection>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Button
        isDisabled={selectedIndex === 0}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <ProgressIndicator
        selectedIndex={selectedIndex}
        values={steps}
      />
      <Button
        isDisabled={selectedIndex === steps.length - 1}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  </FormSection>
)

export default ProgressFormIndicator

import { Step } from "@/../types/global";
import styles from "./progress-tracker.module.css"


type ProgressTrackerProps = {
  steps: Step[]
  activeStepIndex: number
}

const ProgressTracker = ({ steps, activeStepIndex }: ProgressTrackerProps) => {
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.stepContainer} ${styles["width-" + activeStepIndex]}`}>
        {steps.map((step) => (
          <div className={styles.stepWrapper} key={step.number}>
            <div className={
              `${styles.stepStyle} ${activeStepIndex >= step.number
                                     ? styles.completed
                                     : styles.incomplete}`
            }>
              {
                activeStepIndex > step.number
                ? <div className={styles.checkMark}>L</div>
                : <span className={
                  `${styles.stepCount} ${activeStepIndex >= step.number
                                         ? styles.completed
                                         : styles.incomplete}`
                }>
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
  )
}

export default ProgressTracker

import { ReactNode } from "react"
import styles from "./takeover.module.css"


type TakeoverProps = {
  progressTracker?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

const Takeover = ({ progressTracker, children, footer }: TakeoverProps) => (
  <div className={styles.container}>
    <div className={styles.progressTrackerContainer}>
      {progressTracker}
    </div>
    <div className={styles.contentContainer}>
      {children}
    </div>
    <div className={styles.footerContainer}>
      {footer}
    </div>
  </div>
)

export default Takeover

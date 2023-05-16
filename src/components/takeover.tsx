import { ReactNode } from "react"
import styles from "./takeover.module.css"
import { token } from "@atlaskit/tokens"


type TakeoverProps = {
  children: ReactNode
  progressTracker: ReactNode
  navigationButtons: ReactNode
}

const Takeover = (
  {
    children,
    progressTracker,
    navigationButtons
  }: TakeoverProps) => (
  <div className={styles.container}>
    <div
      className={styles.headerContainer}
      style={{
        boxShadow: token(
          "elevation.shadow.overflow",
          "0px 2px 4px rgba(9, 30, 66, 0.1)"
        )
      }}
    >
      <div>
        <h3>Trade License Application</h3>
      </div>
      <div>
        {progressTracker}
      </div>
    </div>
    <div className={styles.contentContainer}>
      {children}
    </div>
    <div
      className={styles.footerContainer}
      style={{
        boxShadow: token(
          "elevation.shadow.overflow",
          "0px -2px 4px rgba(9, 30, 66, 0.1)"
        )
      }}
    >
      {navigationButtons}
    </div>
  </div>
)

export default Takeover

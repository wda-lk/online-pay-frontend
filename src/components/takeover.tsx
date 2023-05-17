import { ReactNode } from "react"


type TakeoverProps = {
  progressTracker?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

const Takeover = ({ progressTracker, children, footer }: TakeoverProps) => (
  <div style={{ display: "flex", flexDirection: "column", height: "84vh", borderStyle: "solid" }}>
    <div style={{ height: "10vh", borderStyle: "dashed", padding: "0 12px" }}>
      {progressTracker}
    </div>
    <div style={{ height: "69vh", borderStyle: "dashed", overflowY: "scroll", padding: "0 12px" }}>
      {children}
    </div>
    <div style={{ display: "flex", alignItems: "center", height: "5vh", borderStyle: "dashed", padding: "0 12px" }}>
      {footer}
    </div>
  </div>
)

export default Takeover

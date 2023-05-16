import { ReactNode } from "react"

type TakeoverProps = {
  children: ReactNode
  progressTracker: ReactNode
  navigationButtons: ReactNode
}

const Takeover = ({ children, progressTracker, navigationButtons }: TakeoverProps) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ height: 100, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 40, display: "flex", alignItems: "center" }}>
        <h1>Trade License Application</h1>
      </div>
      <div style={{
        height: 60,
        display: "flex",
        alignItems: "center"
      }}>
        {progressTracker}
      </div>
    </div>
    <div style={{ height: "82vh", overflowY: "scroll" }}>
      {children}
    </div>
    <div style={{ height: 60, display: "flex", alignItems: "center" }}>
      {navigationButtons}
    </div>
  </div>
)

export default Takeover

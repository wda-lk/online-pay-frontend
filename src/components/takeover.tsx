import Drawer from "@atlaskit/drawer"
import { ReactNode } from "react"
import styles from "./takeover.module.css"


type TakeoverProps = {
  drawerControls: {
    isOpen: boolean
    openDrawer: (isOpen: boolean) => void
  }
  children: ReactNode
  progressTracker: ReactNode
  navigationButtons: ReactNode
}

const Takeover = (
  {
    drawerControls,
    children,
    progressTracker,
    navigationButtons
  }: TakeoverProps) => (
  <Drawer
    width="extended"
    onClose={() => drawerControls.openDrawer(true)}
    isOpen={drawerControls.isOpen}
    overrides={{
      Sidebar: {
        component: ({ children }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexBasis: "auto",
              flexDirection: "column",
              width: 64,
              height: "100vh"
            }}
          >
            <div style={{ display: "flex", height: "5vh", width: 64, backgroundColor: "#494949", color: "white" }}>
              {children}
            </div>
            <div style={{ height: "90vh", width: 64, backgroundColor: "white" }}></div>
            <div style={{ height: "5vh", width: 64, backgroundColor: "#494949" }}></div>
          </div>
        )
      },
      Content: {
        component: ({ children }) => (
          <div style={{ flex: 1, overflow: "auto" }}>
            {children}
          </div>
        )
      }
    }}
  >
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3>Trade License Application</h3>
      </div>
      <div className={styles.progressTrackerContainer}>
        {progressTracker}
      </div>
      <div className={styles.contentContainer}>
        {children}
      </div>
      <div
        className={styles.footerContainer}
        style={{}}
      >
        {navigationButtons}
      </div>
    </div>
  </Drawer>
)

export default Takeover

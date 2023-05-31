import { N30A, N400, N800 } from "@atlaskit/theme/colors"
import Image from "next/future/image"
import { ReactNode } from "react"
import logo from "../../public/logo/logo.svg"
import logoCompact from "../../public/logo/logo=comp&neu.svg"
import styles from "./card.module.css"
import { token } from "@atlaskit/tokens"


type CardProps = {
  children: ReactNode
}

const Card = ({ children }: CardProps) => (
  <div className={`${styles.fullHeightContainer} ${styles.backgroundImage}`}>
    <div
      className={styles.card}
      style={{
        color: token("color.text", N800),
        backgroundColor: token("elevation.surface.overlay", "#fff"),
        boxShadow: token(
          "elevation.shadow.overlay",
          "0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)"
        )
      }}
    >
      <Image
        className={styles.headerLogo}
        src={logo}
        alt="Cat2020 logo"
      />
      {children}
      <div
        className={styles.footer}
        style={{ borderTop: `2px solid ${token("color.border", N30A)}` }}
      >
        <Image
          className={styles.footerLogo}
          src={logoCompact}
          alt="Cat2020 Neutral logo"
        />
        <div className={styles.footerText}>
          <p style={{ color: token("color.text.disabled", N400) }}>
            © 2023 CAT2020
            <br/>
            Wayamba Development Authority
          </p>
        </div>
      </div>
    </div>
  </div>
)


export default Card

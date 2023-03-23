import { N30A, N700, N800 } from "@atlaskit/theme/colors"
import Image from "next/image"
import React from "react"
import { ReactNode } from "react"
import logoDefault from "../public/logo/cat2020-default.svg"
import logoNeutral from "../public/logo/cat2020-compact-neutral.svg"
import styles from "./card.module.css"
import { token } from "@atlaskit/tokens"


type CardProps = {
  content: ReactNode
}

export default function Card(props: CardProps) {
  return (
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
        src={logoDefault}
        alt="Cat2020 logo"
      />
      {props.content}
      <div
        className={styles.footer}
        style={{ borderTop: `1px solid ${token("color.border", N30A)}` }}
      >
        <Image
          className={styles.footerLogo}
          src={logoNeutral}
          alt="Cat2020 Neutral logo"
        />
        <div
          className={styles.footerText}
          style={{ color: token("color.text.success", N700) }}
        >
          © 2023 CAT2020
          <br/>
          Wayamba Development Authority
        </div>
      </div>
    </div>
  )
}

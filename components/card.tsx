import { N30A, N700, N800 } from "@atlaskit/theme/colors"
import Image from "next/image"
import React from "react"
import { ReactNode } from "react"
import logoDefault from "../public/logo/cat2020-default.svg"
import logoNeutral from "../public/logo/cat2020-compact-neutral.svg"
import { token } from "@atlaskit/tokens"


type CardProps = {
  content: ReactNode
}

export default function Card(props: CardProps) {
  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "16px",
        flexDirection: "column",
        color: token("color.text", N800),
        backgroundColor: token("elevation.surface.overlay", "#fff"),
        boxShadow: token(
          "elevation.shadow.overlay",
          "0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)"
        ),
        borderRadius: 4
      }}
    >
      <Image
        src={logoDefault}
        alt="Cat2020 logo"
        style={{
          margin: "auto",
          marginBottom: "12px"
        }}
      />
      {props.content}
      <div
        style={{
          marginTop: "24px",
          borderTop: `1px solid ${token("color.border", N30A)}`,
          paddingTop: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Image
          src={logoNeutral}
          alt="Cat2020 Neutral logo"
          style={{
            margin: "auto"
          }}
        />
        <div style={{
          marginTop: "8px",
          textAlign: "center",
          color: token("color.text.success", N700)
        }}
        >
          © 2023 CAT2020
          <br/>
          Wayamba Development Authority
        </div>
      </div>
    </div>
  )
}

import { N30A, N800 } from "@atlaskit/theme/colors"
import Image from "next/image"
import React from "react"
import { ReactElement } from "react"
import { token } from "@atlaskit/tokens"


export interface CardProps {
  logo: {
    url: string,
    alt: string
  }
  content: ReactElement
  footer: ReactElement
}

export default function UserFormCard({ logo, content, footer }: CardProps) {
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
        src={logo.url}
        alt="{logo.alt}"
        style={{
          margin: "auto",
          marginBottom: "12px"
        }}
      />
      {content}
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
        {footer}
      </div>
    </div>
  )
}

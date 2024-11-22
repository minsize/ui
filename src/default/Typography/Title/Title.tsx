import style from "./Title.module.css"
import { type HTMLAttributes, type TextProps, Text, TextContext } from "ui"

import { type Component, mergeProps, splitProps, useContext } from "solid-js"

interface Title extends HTMLAttributes<HTMLSpanElement> {
  mode?: "default"
}

const modes: Record<"default", TextProps> = {
  default: {
    iOS: {
      color: "primary",
      size: "medium",
      weight: "500",
    },
    android: "iOS",
    macOS: "iOS",
    windows: "iOS",
    others: "iOS",
  },
}

const Title: Component<Title> = (props) => {
  const context = useContext(TextContext)

  const merged = mergeProps({ mode: "default" }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "mode",
  ])

  return (
    <Text
      class={style.Title}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
      {...(context?.title
        ? (context.title as any)
        : modes[local.mode as NonNullable<Title["mode"]>])}
    >
      {local.children}
    </Text>
  )
}

export default Title

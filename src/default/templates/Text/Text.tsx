import style from "./Text.module.css"
import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

export type Platform = "iOS" | "android" | "macOS" | "windows" | "others"

export type TextObject = {
  color: "accent" | "primary" | "secondary"
  size: "small" | "medium" | "large"
  weight: "400" | "500" | "600" | "700"
}

interface Text extends JSX.HTMLAttributes<HTMLSpanElement> {
  iOS: TextObject | Omit<Platform, "iOS">
  android: TextObject | Omit<Platform, "android">
  macOS: TextObject | Omit<Platform, "macOS">
  windows: TextObject | Omit<Platform, "windows">
  others: TextObject | Omit<Platform, "others">
}

const Text: Component<Text> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "iOS",
    "android",
    "macOS",
    "windows",
    "others",
  ])

  return (
    <span
      class={style.Text}
      classList={{
        ...(
          ["iOS", "android", "macOS", "windows", "others"] as Platform[]
        ).reduce((acb, platform) => {
          const key =
            typeof local[platform] === "string"
              ? (local[platform] as Platform)
              : platform

          const { color, size, weight } = local[key] as TextObject

          acb[style[`Text--${platform}__color--${color}`]] = !!color
          acb[style[`Text--${platform}__size--${size}`]] = !!size
          acb[style[`Text--${platform}__weight--${weight}`]] = !!weight
          return acb
        }, {} as Record<string, boolean>),

        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </span>
  )
}

export default Text

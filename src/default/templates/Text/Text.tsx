import style from "./Text.module.css"
import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

export type Platform = "iOS" | "android" | "macOS" | "windows" | "others"

export type TextObject = {
  /**
   * Цвет текста.
   */
  color: "accent" | "primary" | "secondary" | "inherit"
  /**
   * Размер текста.
   */
  size: "small" | "medium" | "large" | "x-large" | "xx-large"
  /**
   * Жирность шрифта.
   */
  weight: "400" | "500" | "600" | "700"
  /**
   * Выравнивание текста.
   */
  align?: "start" | "center" | "end"
}

export type TextProps = {
  iOS: TextObject | Omit<Platform, "iOS">
  android: TextObject | Omit<Platform, "android">
  macOS: TextObject | Omit<Platform, "macOS">
  windows: TextObject | Omit<Platform, "windows">
  others: TextObject | Omit<Platform, "others">
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

          const { color, size, weight, align } = local[key] as TextObject

          acb[style[`Text--${platform}__color--${color}`]] = !!color
          acb[style[`Text--${platform}__size--${size}`]] = !!size
          acb[style[`Text--${platform}__weight--${weight}`]] = !!weight
          acb[style[`Text--${platform}__align--${align}`]] = !!align
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

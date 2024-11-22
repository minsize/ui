/* UI */
import { type TextProps } from "@ui/Types"
import createStyle from "@src/default/utils/createStyle"
/* UI */

import styleDefault from "../Cell.module.css"
import iOS from "./iOS.module.css"
import android from "./android.module.css"
import macOS from "./macOS.module.css"
import windows from "./windows.module.css"
import others from "./others.module.css"

export const styles = createStyle(styleDefault, {
  iOS,
  android,
  macOS,
  windows,
  others,
})

type TypographyType = "title" | "subTitle"

export const generateTypography = (
  props: Record<TypographyType, TextProps>,
): Record<TypographyType, TextProps> => ({
  title: {
    iOS: {
      size: "medium",
      weight: "400",
      color: "primary",
    },
    android: {
      size: "medium",
      weight: "500",
      color: "primary",
    },
    macOS: "android",
    windows: "android",
    others: "android",
    ...props.title,
  },
  subTitle: {
    iOS: {
      size: "small",
      weight: "400",
      color: "secondary",
    },
    android: "iOS",
    macOS: "iOS",
    windows: "iOS",
    others: "iOS",
    ...props.subTitle,
  },
})

import style from "./SubTitle.module.css"

import { type HTMLAttributes, type TextProps } from "@ui/Types"
import Text from "@src/default/Templates/Text/Text"
import TextContext from "@src/default/Templates/Text/context"

import { type Component, mergeProps, splitProps, useContext } from "solid-js"

interface SubTitle extends HTMLAttributes<HTMLSpanElement> {
  mode?: "default"
}

const modes: Record<"default", TextProps> = {
  default: {
    iOS: {
      color: "secondary",
      size: "small",
      weight: "400",
    },
    android: "iOS",
    macOS: "iOS",
    windows: "iOS",
    others: "iOS",
  },
}

const SubTitle: Component<SubTitle> = (props) => {
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
      class={style.SubTitle}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
      {...(context?.subTitle
        ? (context.subTitle as any)
        : modes[local.mode as NonNullable<SubTitle["mode"]>])}
    >
      {local.children}
    </Text>
  )
}

export default SubTitle

import style from "./SubTitle.module.css"
import { Text } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface SubTitle extends JSX.HTMLAttributes<HTMLSpanElement> {}

const SubTitle: Component<SubTitle> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Text
      class={style.SubTitle}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      iOS={{
        size: "large",
        weight: "400",
        color: "secondary",
        align: "center",
      }}
      android={"iOS"}
      macOS={"iOS"}
      windows={"iOS"}
      others={"iOS"}
      {...others}
    >
      {local.children}
    </Text>
  )
}

export default SubTitle

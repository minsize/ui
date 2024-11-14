import style from "./Title.module.css"
import { Text } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface Title extends JSX.HTMLAttributes<HTMLSpanElement> {}

const Title: Component<Title> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Text
      class={style.Title}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      iOS={{
        size: "large",
        weight: "500",
        color: "primary",
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

export default Title

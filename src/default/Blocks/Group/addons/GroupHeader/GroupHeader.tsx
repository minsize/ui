import style from "./GroupHeader.module.css"
import { Text } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface GroupHeader extends JSX.HTMLAttributes<HTMLSpanElement> {
  mode?: "accent" | "primary"
}

const GroupHeader: Component<GroupHeader> = (props) => {
  const merged = mergeProps({ mode: "accent" }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "mode",
  ])

  return (
    <Text
      class={style.GroupHeader}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
      iOS={{
        color: local.mode === "accent" ? "primary" : "secondary",
        weight: "500",
        size: "medium",
      }}
      android={{
        color: local.mode === "accent" ? "accent" : "primary",
        weight: "500",
        size: "medium",
      }}
      macOS={"iOS"}
      windows={"iOS"}
      others={"iOS"}
    >
      {local.children}
    </Text>
  )
}

export default GroupHeader

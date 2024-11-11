import style from "./GroupFooter.module.css"
import { Text } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface GroupFooter extends JSX.HTMLAttributes<HTMLSpanElement> {}

const GroupFooter: Component<GroupFooter> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Text
      class={style.GroupFooter}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
      iOS={{
        color: "secondary",
        weight: "400",
        size: "small",
      }}
      android={"iOS"}
      macOS={"iOS"}
      windows={"iOS"}
      others={"iOS"}
    >
      {local.children}
    </Text>
  )
}

export default GroupFooter

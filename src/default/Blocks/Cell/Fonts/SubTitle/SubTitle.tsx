import style from "./SubTitle.module.css"
import { Show, Text } from "ui"

import { type JSX, type Component, splitProps } from "solid-js"

interface SubTitle extends JSX.HTMLAttributes<HTMLSpanElement> {}

const SubTitle: Component<SubTitle> = (props) => {
  const [local, others] = splitProps(props, ["class", "classList", "children"])

  return (
    <Show when={!!local.children} native>
      <Text
        iOS={{
          size: "small",
          weight: "400",
          color: "secondary",
        }}
        android={"iOS"}
        macOS={"iOS"}
        windows={"iOS"}
        others={"iOS"}
        {...others}
      >
        {local.children}
      </Text>
    </Show>
  )
}

export default SubTitle

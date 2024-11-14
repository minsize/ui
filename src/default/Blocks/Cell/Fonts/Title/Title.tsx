import style from "./Title.module.css"
import { Show, Text } from "ui"

import { type JSX, type Component, splitProps } from "solid-js"

interface Title extends JSX.HTMLAttributes<HTMLSpanElement> {}

const Title: Component<Title> = (props) => {
  const [local, others] = splitProps(props, ["class", "classList", "children"])

  return (
    <Show when={!!local.children} native>
      <Text
        class={style.Title}
        classList={{
          ...local.classList,
          [`${local.class}`]: !!local.class,
        }}
        iOS={{
          size: "medium",
          weight: "400",
          color: "primary",
        }}
        android={{
          size: "medium",
          weight: "500",
          color: "primary",
        }}
        macOS={"android"}
        windows={"android"}
        others={"android"}
        {...others}
      >
        {local.children}
      </Text>
    </Show>
  )
}

export default Title

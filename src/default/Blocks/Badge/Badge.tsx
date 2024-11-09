import style from "./Badge.module.css"
import { Align } from "ui"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"

interface Badge extends JSX.HTMLAttributes<HTMLElement> {
  before?: JSX.Element
  after?: JSX.Element

  appearance?: "accent" | "green" | "red"
  mode?: "filled" | "merges" | "outline"
  size?: "small" | "medium" | "large"
  type?: "text" | "icon"
}

const Badge: Component<Badge> = (props) => {
  const merged = mergeProps(
    { appearance: "accent", mode: "filled", size: "medium", type: "text" },
    props,
  )
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "before",
    "after",
    "appearance",
    "mode",
    "size",
    "type",
  ])

  return (
    <Align
      class={style.Badge}
      classList={{
        [style[`Badge__appearance--${local.appearance}`]]: !!local.appearance,
        [style[`Badge__mode--${local.mode}`]]: !!local.mode,
        [style[`Badge__size--${local.size}`]]: !!local.size,
        [style[`Badge__type--${local.type}`]]: !!local.type,

        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {({ Before, Children, After }) => (
        <>
          <Before class={style.Badge__before}>{local.before}</Before>
          <Children class={style.Badge__in}>{local.children}</Children>
          <After class={style.Badge__after}>{local.after}</After>
        </>
      )}
    </Align>
  )
}

export default Badge

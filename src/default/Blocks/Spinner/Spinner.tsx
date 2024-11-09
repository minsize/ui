import style from "./Spinner.module.css"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"

interface Spinner extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "regular" | "large" | "medium" | "auto"
  color?: "secondary"
}

const Spinner: Component<Spinner> = (props) => {
  const merged = mergeProps({ size: "regular", color: "secondary" }, props)
  const [local, others] = splitProps(merged, ["size", "color"])

  return (
    <div
      class={style.Spinner}
      classList={{
        [style[`Spinner__size--${local.size}`]]: !!local.size,
        [style[`Spinner__color--${local.color}`]]: !!local.color,
      }}
      {...others}
    >
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    </div>
  )
}

export default Spinner

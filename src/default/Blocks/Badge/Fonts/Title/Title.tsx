import style from "./Title.module.css"
import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface Title extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large"
  weight?: "400" | "500" | "600" | "700"
  color?: "accent" | "primary" | "secondary"
}

const Title: Component<Title> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <div
      class={style.Test}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </div>
  )
}

export default Title

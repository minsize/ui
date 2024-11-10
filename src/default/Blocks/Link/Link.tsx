import style from "./Link.module.css"
import { Events, IEvents } from "ui"

import { type Component, mergeProps, splitProps } from "solid-js"

interface Link extends IEvents {
  href?: string
}

const Link: Component<Link> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Events
      type={others.href ? "a" : "button"}
      class={style.Link}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </Events>
  )
}

export default Link

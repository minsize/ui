import style from "./Link.module.css"
import { Events, IEvents } from "ui"

import { type JSX, mergeProps, splitProps, ValidComponent } from "solid-js"

interface Link<T extends ValidComponent> extends IEvents<T> {
  component?: T
}

const Link = <T extends ValidComponent>(props: Link<T>): JSX.Element => {
  const merged = mergeProps(
    { component: props.href ? "a" : "button" },
    props,
  ) as Link<T>
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Events
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

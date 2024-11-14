import style from "./Plug.module.css"
import { Show } from "ui"

import { type JSX, type Component, splitProps } from "solid-js"

interface Plug extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: JSX.Element
  title?: JSX.Element
  subtitle?: JSX.Element
  action?: JSX.Element
  mode?: "center" | "lower" | "mini"
}

const Plug: Component<Plug> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "classList",
    "children",
    "icon",
    "title",
    "subtitle",
    "action",
    "mode",
  ])

  return (
    <div
      class={style.Plug}
      classList={{
        [style[`Plug__mode--${local.mode}`]]: !!local.mode,
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      <div class={style.Plug__in}>
        <Show
          component={"span"}
          class={style.Plug__icon}
          children={local.icon}
        />
        <Show
          component={"span"}
          class={style.Plug__title}
          children={local.title}
        />
        <Show
          component={"span"}
          class={style.Plug__subtitle}
          children={local.subtitle}
        />
        <Show
          component={"span"}
          class={style.Plug__action}
          children={local.action}
        />
      </div>

      <Show
        component={"span"}
        class={style.Plug__children}
        children={local.children}
      />
    </div>
  )
}

export default Plug

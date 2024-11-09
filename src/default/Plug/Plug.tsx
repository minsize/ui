import { Component, JSXElement, Show, splitProps } from "solid-js"
import { JSX } from "solid-js/jsx-runtime"

import style from "./Plug.module.css"

interface Plug extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: JSXElement
  title?: JSXElement
  description?: JSXElement
  header?: JSXElement
  action?: JSXElement
  mode?: "center" | "lower" | "mini" | "modal" | "error"
}

const Plug: Component<Plug> = (props) => {
  const [local, others] = splitProps(props, [
    "mode",
    "class",
    "classList",
    "children",
    "icon",
    "title",
    "description",
    "header",
    "action",
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
      <Show when={!!local.icon || !!local.title || !!local.description}>
        <div class={style.Plug__in}>
          <Show when={local.icon}>
            <div class={style.Plug__icon}>{local.icon}</div>
          </Show>
          <Show when={local.title}>
            <div class={style.Plug__title}>{local.title}</div>
          </Show>
          <Show when={local.description}>
            <div class={style.Plug__description}>{local.description}</div>
          </Show>
        </div>
      </Show>

      <Show when={local.header}>
        <div class={style.Plug__header}>{local.header}</div>
      </Show>

      <Show when={local.children}>
        <div class={style.Plug__children}>{local.children}</div>
      </Show>

      <Show when={local.action}>
        <div class={style.Plug__action}>{local.action}</div>
      </Show>
    </div>
  )
}

export default Plug

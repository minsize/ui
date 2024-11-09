import style from "./Radio.module.css"

import { Events, Show } from "root/src/default/templates"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"

interface Radio extends JSX.HTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onChecked?: (prev: boolean, next: boolean) => void
  disabled?: boolean
}

const Radio: Component<Radio> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "onChecked",
    "disabled",
  ])

  const handlerChecked = () => {
    !local.disabled &&
      local.onChecked &&
      local.onChecked(!!others.checked, !others.checked)
  }

  return (
    <Events
      class={style.Radio}
      onClick={handlerChecked}
      disabled={local.disabled || !local.onChecked}
    >
      <div class={style.Radio__in}>
        <input
          type={"radio"}
          class={style.Radio__input}
          classList={{
            ...local.classList,
            [`${local.class}`]: !!local.class,
          }}
          disabled={local.disabled || !local.onChecked}
          {...others}
        />
        <span class={style.Radio__circle} />
      </div>
    </Events>
  )
}

export default Radio

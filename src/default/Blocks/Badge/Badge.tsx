import { styles } from "./styles"
import { type HTMLAttributes, Align, useStyle } from "ui"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Badge extends HTMLAttributes<DynamicProps<"span">> {
  /**
   * Элемент, который будет отображаться перед основным содержимым значка.
   */
  before?: JSX.Element
  /**
   * Элемент, который будет отображаться после основного содержимого значка.
   */
  after?: JSX.Element
  /**
   * Определяет внешний вид значка.
   */
  appearance?: "accent" | "green" | "red"
  /**
   * Определяет стиль отображения значка.
   *
   * - **filled**: Значок заполнен цветом, без границ.
   * - **merges**: Значок сливается с фоном, создавая эффект "заливки".
   * - **outline**: Значок отображается с контуром (обводкой), без заливки.
   */
  mode?: "filled" | "merges" | "outline"
  /**
   * Определяет размер значка.
   */
  size?: "small" | "medium" | "large"
  /**
   * Определяет тип содержимого значка.
   */
  type?: "text" | "icon"
}

const Badge: Component<Badge> = (props) => {
  const style = useStyle(styles, props.platform)
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
    "platform",
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
      <Align.Before class={style.Badge__before} children={local.before} />
      <Align.Children class={style.Badge__in} children={local.children} />
      <Align.After class={style.Badge__after} children={local.after} />
    </Align>
  )
}

export default Badge

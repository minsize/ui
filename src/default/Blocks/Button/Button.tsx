import { styles } from "./styles"
import { Icon, Container } from "./addons"
import { SubTitle, Title } from "./Fonts"

import { type HTMLAttributes, Events, Flex, useStyle } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Button extends HTMLAttributes<DynamicProps<"button">> {
  /**
   * Цвет кнопки.
   */
  appearance?: "accent" | "primary" | "secondary" | "red" | "green"

  /**
   * Размер кнопки.
   */
  size?: "small" | "medium" | "large"

  /**
   * Режим отображения кнопки.
   *
   * - **filled**: Кнопка заполнена цветом, без границ.
   * - **merges**: Кнопка сливается с фоном, создавая эффект "заливки".
   * - **outline**: Кнопка отображается с контуром (обводкой), без заливки.
   */
  mode?: "filled" | "outline" | "merges"

  /**
   * Отключает кнопку.
   */
  disabled?: boolean

  /**
   * Растягивает кнопку на всю ширину контейнера.
   */
  stretched?: boolean
}

type ComponentButton = Component<Button> & {
  Container: typeof Container
  Icon: typeof Icon
  Title: typeof Title
  SubTitle: typeof SubTitle
}

const Button: ComponentButton = (props) => {
  const style = useStyle(styles, props.platform)
  const merged = mergeProps(
    {
      appearance: "accent",
      mode: "fill",
      size: "medium",
    },
    props,
  )
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "appearance",
    "size",
    "mode",
    "stretched",
    "platform",
  ])

  return (
    <Events
      class={style.Button}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,

        [style[`Button__appearance--${local.appearance}`]]: !!local.appearance,
        [style[`Button__size--${local.size}`]]: !!local.size,
        [style[`Button__mode--${local.mode}`]]: !!local.mode,
        [style[`Button--stretched`]]: local.stretched,
      }}
      {...others}
    >
      <Flex component={"div"} class={style.Button__in}>
        {local.children}
      </Flex>
      <span class={style.Button__background} />
    </Events>
  )
}

Button.Container = Container
Button.Icon = Icon
Button.Title = Title
Button.SubTitle = SubTitle

export default Button

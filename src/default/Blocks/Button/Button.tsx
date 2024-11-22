import { styles, generateTypography } from "./styles"
import { Icon, Container } from "./addons"

/* UI */
import { type HTMLAttributes } from "@ui/Types"

import Flex from "@src/default/Blocks/Flex/Flex"

import Events from "@src/default/Templates/Events/Events"
import TextContext from "@src/default/Templates/Text/context"

import useStyle from "@src/default/utils/useStyle"
/* UI */

import { type Component, mergeProps, splitProps } from "solid-js"
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
    <TextContext.Provider
      value={generateTypography({
        title: {
          class: style[`Button__title`],
        },
        subTitle: {
          class: style[`Button__subtitle`],
        },
      })}
    >
      <Events
        class={style.Button}
        classList={{
          [`${local.class}`]: !!local.class,
          ...local.classList,

          [style[`Button__appearance--${local.appearance}`]]:
            !!local.appearance,
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
    </TextContext.Provider>
  )
}

Button.Container = Container
Button.Icon = Icon

export default Button

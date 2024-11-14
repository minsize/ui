import style from "./Flex.module.css"
import { type JSX, type ValidComponent, mergeProps, splitProps } from "solid-js"
import { Dynamic, type DynamicProps } from "solid-js/web"

interface Flex<T extends ValidComponent>
  extends JSX.HTMLAttributes<DynamicProps<T>> {
  /**
   * Компонент, который будет использоваться для рендеринга Flexbox.
   * По умолчанию используется `div`.
   */
  component?: T
  /**
   * Выравнивание элементов по вертикальной оси.
   */
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch"
  /**
   * Выравнивание элементов по горизонтальной оси.
   */
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-around"
    | "space-between"
    | "space-evenly"
  /**
   * Направление Flexbox (по горизонтали или вертикали).
   */
  direction?: "row" | "column"
  /**
   * Определяет, должен ли порядок элементов быть обратный.
   */
  reverse?: boolean
}

const Flex = <T extends ValidComponent>(props: Flex<T>) => {
  const merged = mergeProps(
    {
      component: "span",
      alignItems: "center",
      justifyContent: "center",
      direction: "row",
      reverse: false,
    },
    props,
  )
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "alignItems",
    "justifyContent",
    "direction",
    "reverse",
  ])

  return (
    <Dynamic
      class={style.Flex}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,

        [style[`Flex__alignItems--${local.alignItems}`]]: !!local.alignItems,
        [style[`Flex__justifyContent--${local.justifyContent}`]]:
          !!local.justifyContent,
        [style[`Flex__direction--${local.direction}`]]: !!local.direction,
        [style[`Flex--reverse`]]: local.reverse,
      }}
      {...others}
    />
  )
}

export default Flex

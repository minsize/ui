import style from "./Flex.module.css"
import {
  type JSX,
  type Component,
  type ValidComponent,
  mergeProps,
  splitProps,
} from "solid-js"
import { Dynamic, type DynamicProps } from "solid-js/web"

interface Flex<T extends ValidComponent>
  extends JSX.HTMLAttributes<DynamicProps<T>> {
  component?: T
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch"
  justifyContent?: "start" | "center" | "end"
  direction?: "row" | "column"
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

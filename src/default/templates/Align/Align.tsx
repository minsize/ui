import style from "./Align.module.css"
import { Before, Children, After } from "./addons"
import { Flex } from "ui"

import { type JSX, type Component, splitProps } from "solid-js"
import { DynamicProps } from "solid-js/web"

interface Align extends JSX.HTMLAttributes<DynamicProps<"article">> {}

type ComponentAlign = Component<Align> & {
  Before: typeof Before
  Children: typeof Children
  After: typeof After
}

const Align: ComponentAlign = (props) => {
  const [local, others] = splitProps(props, ["class", "classList", "children"])

  return (
    <Flex
      component={"article"}
      alignItems={"center"}
      justifyContent={"center"}
      class={style.Align}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,
      }}
      {...others}
    >
      {local.children}
    </Flex>
  )
}

Align.Before = Before

Align.Children = Children

Align.After = After

export default Align

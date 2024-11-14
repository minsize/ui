import style from "./Plug.module.css"
import { Flex } from "ui"
import { Action, Container, Icon } from "./addons"
import { SubTitle, Title } from "./Fonts"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Plug extends Omit<JSX.HTMLAttributes<DynamicProps<"div">>, "title"> {
  full?: boolean
}

type ComponentPlug = Component<Plug> & {
  Container: typeof Container
  Action: typeof Action
  Icon: typeof Icon
  Title: typeof Title
  SubTitle: typeof SubTitle
}

const Plug: ComponentPlug = (props) => {
  const merged = mergeProps({ mode: "bottom" }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "full",
  ])

  return (
    <Flex
      component={"div"}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,

        [style[`Plug--full`]]: local.full,
      }}
      direction={"column"}
      justifyContent={"center"}
      class={style.Plug}
      {...others}
    >
      {local.children}
    </Flex>
  )
}

Plug.Container = Container
Plug.Action = Action
Plug.Icon = Icon
Plug.Title = Title
Plug.SubTitle = SubTitle

export default Plug

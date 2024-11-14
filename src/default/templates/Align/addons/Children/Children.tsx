import style from "./Children.module.css"
import { Show } from "ui"

import { type JSX, type Component, splitProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Children extends JSX.HTMLAttributes<DynamicProps<"div">> {}

const Children: Component<Children> = (props) => {
  const [local, others] = splitProps(props, ["class", "classList"])

  return (
    <Show
      component={"div"}
      class={style.children}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,
      }}
      {...others}
    />
  )
}

export default Children

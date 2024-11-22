import style from "./Before.module.css"
import { Show } from "root/src/default/Templates"

import { type JSX, type Component, splitProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Before extends JSX.HTMLAttributes<DynamicProps<"span">> {
  when?: boolean
}

const Before: Component<Before> = (props) => {
  const [local, others] = splitProps(props, ["class", "classList"])

  return (
    <Show
      component={"span"}
      class={style.Before}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,
      }}
      {...others}
    />
  )
}

export default Before

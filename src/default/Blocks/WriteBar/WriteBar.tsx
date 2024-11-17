import style from "./WriteBar.module.css"
import { Align, Textarea } from "ui"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  createEffect,
} from "solid-js"
import { DynamicProps } from "solid-js/web"

interface WriteBar extends JSX.HTMLAttributes<DynamicProps<"div">> {}

const WriteBar: Component<WriteBar> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  let ref: HTMLTextAreaElement

  createEffect(() => {})

  return (
    <Align
      component={"div"}
      class={style.WriteBar}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      <Align.Children>
        <Textarea maxHeight={"150px"} placeholder={"asf"} />
      </Align.Children>
    </Align>
  )
}

export default WriteBar

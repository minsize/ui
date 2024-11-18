import style from "./Field.module.css"
import { Textarea } from "./addons"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface Field extends JSX.HTMLAttributes<HTMLDivElement> {}

type ComponentField = Component<Field> & {
  Textarea: typeof Textarea
}

const Field: ComponentField = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <div
      class={style.Field}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </div>
  )
}

Field.Textarea = Textarea

export default Field

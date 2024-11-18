import style from "./Field.module.css"
import { Field as ElField } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"

interface Field extends JSX.HTMLAttributes<HTMLDivElement> {}

type ComponentField = Component<Field> & {
  Textarea: typeof ElField.Textarea
}

const Field: ComponentField = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList"])

  return (
    <ElField
      class={style.Field}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    />
  )
}

Field.Textarea = ElField.Textarea

export default Field

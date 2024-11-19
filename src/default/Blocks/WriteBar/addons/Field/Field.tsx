import { styles } from "./styles"

import {
  type HTMLAttributes,
  Field as ElField,
  usePlatform,
  useStyle,
} from "ui"

import { type Component, createEffect, mergeProps, splitProps } from "solid-js"

interface Field extends HTMLAttributes<HTMLDivElement> {}

type ComponentField = Component<Field> & {
  Textarea: typeof ElField.Textarea
}

const Field: ComponentField = (props) => {
  const style = useStyle(styles, props.platform)
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

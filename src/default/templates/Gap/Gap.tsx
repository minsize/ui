import style from "./Gap.module.css"

import Flex, { type Flex as TypeFlex } from "@src/default/Blocks/Flex/Flex"

import {
  type ValidComponent,
  type Component,
  mergeProps,
  splitProps,
} from "solid-js"
import { type Property } from "csstype"

interface Gap<T extends ValidComponent = "span"> extends TypeFlex<T> {
  count: Property.Gap<(string & {}) | 0>
}

const Gap: Component<Gap> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "count",
  ])

  return (
    <Flex
      class={style.Gap}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      style={{
        gap: local.count,
      }}
      {...others}
    >
      {local.children}
    </Flex>
  )
}

export default Gap

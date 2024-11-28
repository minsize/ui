import style from "./Separator.module.css"

import { CellStore } from "../../context"
import ElSeparator from "@src/default/Blocks/Separator/Separator"
import Show from "@src/default/Templates/Show/Show"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"

interface Separator extends JSX.HTMLAttributes<HTMLSpanElement> {
  when: boolean
}

const Separator: Component<Separator> = (props) => {
  const context = useContext(CellStore)

  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "when",
  ])

  return (
    <Show when={local.when}>
      <ElSeparator
        class={context.getStyleSeparator()}
        classList={{
          [`${local.class}`]: !!local.class,
          ...local.classList,
        }}
        {...others}
        color={"secondary"}
        size={"full"}
      />
    </Show>
  )
}

export default Separator

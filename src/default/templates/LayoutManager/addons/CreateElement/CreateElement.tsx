import style from "./CreateElement.module.css"
import { LayoutManagerStore } from "../../context"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
  Show,
} from "solid-js"

interface CreateElement extends JSX.HTMLAttributes<HTMLDivElement> {
  type: "first" | "last"
}

const CreateElement: Component<CreateElement> = (props) => {
  const context = useContext(LayoutManagerStore)

  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "type",
  ])

  console.log({ context })

  return (
    <Show keyed when={context?.getChild?.(local.type)}>
      {(child) => (
        <div
          classList={{
            [`${local.class}`]: !!local.class,
            ...local.classList,

            ...context?.styleIndex?.(local.type),
          }}
          {...others}
          onAnimationEnd={() => context?.onAnimationEnd?.(local.type)}
        >
          {child.component({ nav: child.nav })}
        </div>
      )}
    </Show>
  )
}

export default CreateElement

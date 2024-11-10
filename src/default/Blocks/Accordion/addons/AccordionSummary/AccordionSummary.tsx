import style from "./AccordionSummary.module.css"
import { AccordionStore } from "../../context"

import { Cell, IconChevron } from "ui"

import {
  type JSX,
  type Component,
  splitProps,
  useContext,
  mergeProps,
} from "solid-js"

interface AccordionSummary extends JSX.HTMLAttributes<HTMLElement> {
  before?: JSX.Element
  description?: JSX.Element
  disabled?: boolean
  separator?: boolean
}

const AccordionSummary: Component<AccordionSummary> = (props) => {
  const merged = mergeProps({ separator: false }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "before",
    "description",
    "disabled",
    "separator",
  ])

  const context = useContext(AccordionStore)

  const handlerClick = () => {
    context.onChange && context.onChange()
  }

  return (
    <Cell
      class={style.AccordionSummary}
      onClick={handlerClick}
      before={local.before}
      description={local.description}
      disabled={local.disabled}
      separator={local.separator}
      after={
        <span>
          {local.disabled ? (
            "lock"
          ) : (
            <IconChevron
              class={style.AccordionSummary__icon}
              type={context.status?.() ? "up" : "down"}
            />
          )}
        </span>
      }
    >
      {local.children}
    </Cell>
  )
}

export default AccordionSummary

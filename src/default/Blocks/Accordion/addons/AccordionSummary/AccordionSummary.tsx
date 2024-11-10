import style from "./AccordionSummary.module.css"
import { AccordionStore } from "../../context"

import { Align, Cell, Events } from "ui"

import { type JSX, type Component, splitProps, useContext } from "solid-js"

interface AccordionSummary extends JSX.HTMLAttributes<HTMLElement> {
  before?: JSX.Element
  description?: JSX.Element
  disabled?: boolean
}

const AccordionSummary: Component<AccordionSummary> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "classList",
    "children",
    "before",
    "description",
    "disabled",
  ])

  const context = useContext(AccordionStore)

  const handlerClick = () => {
    context.onChange && context.onChange(true)
  }

  return (
    <Cell
      onClick={handlerClick}
      before={local.before}
      description={local.description}
      disabled={local.disabled}
      separator={false}
      after={
        <span>
          {local.disabled ? "lock" : context.status?.() ? "open" : "close"}
        </span>
      }
    >
      {local.children}
    </Cell>
  )
}

export default AccordionSummary

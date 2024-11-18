import style from "./AccordionSummary.module.css"
import { AccordionStore } from "../../context"

import { type HTMLAttributes, Cell, IconChevron } from "ui"

import {
  type JSX,
  type Component,
  splitProps,
  useContext,
  mergeProps,
} from "solid-js"
import { DynamicProps } from "solid-js/web"

interface AccordionSummary extends HTMLAttributes<DynamicProps<"article">> {
  /**
   * Элемент, который будет отображаться перед основным содержимым ячейки.
   */
  before?: JSX.Element
  /**
   * Заголовок ячейки.
   * Рекомендуем использовать компонент: `Accordion.Summary.Title`
   */
  children?: JSX.Element
  /**
   * Дополнительный текст (подзаголовок), который будет отображаться под основным текстом ячейки.
   *
   * Рекомендуем использовать компонент: `Accordion.Summary.SubTitle`
   *
   * @deprecated
   */
  subtitle?: JSX.Element
  /**
   * Указывает, является ли ячейка неактивной.
   */
  disabled?: boolean
  /**
   * Указывает, должен ли быть отображен разделитель под ячейкой.
   */
  separator?: boolean
}

type ComponentAccordionSummary = Component<AccordionSummary> & {
  Title: typeof Cell.Title
  SubTitle: typeof Cell.SubTitle
}

const AccordionSummary: ComponentAccordionSummary = (props) => {
  const merged = mergeProps({ separator: false }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "disabled",
  ])

  const context = useContext(AccordionStore)

  const handlerClick = () => {
    context.onChange && context.onChange()
  }

  return (
    <Cell
      class={style.AccordionSummary}
      onClick={handlerClick}
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
      selected={context.status?.()}
      {...others}
    >
      {local.children}
    </Cell>
  )
}

AccordionSummary.Title = Cell.Title
AccordionSummary.SubTitle = Cell.SubTitle

export default AccordionSummary

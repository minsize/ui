import style from "./Accordion.module.css"
import { AccordionContent, AccordionSummary } from "./addons"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"
import { AccordionStore } from "./context"
import { createStore } from "solid-js/store"

interface Accordion
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Используется для группировки нескольких списков
   */
  key?: string | string

  onChange?: (status: boolean) => void
}

type ComponentAccordion = Component<Accordion> & {
  Content: typeof AccordionContent
  Summary: typeof AccordionSummary
}

type Store = {
  status: boolean
}

const Accordion: ComponentAccordion = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "onChange",
  ])

  const [store, setStore] = createStore<Store>({ status: false })

  const handlerChange = () => {
    const status = !!!store.status
    setStore("status", status)
    local.onChange && local.onChange(status)
  }

  const value = {
    status: () => store.status,
    onChange: handlerChange,
  }

  return (
    <div
      class={style.Accordion}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      <AccordionStore.Provider value={value}>
        {local.children}
      </AccordionStore.Provider>
    </div>
  )
}

Accordion.Content = AccordionContent
Accordion.Summary = AccordionSummary

export default Accordion

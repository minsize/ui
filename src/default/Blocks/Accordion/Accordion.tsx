import style from "./Accordion.module.css"
import { AccordionContent, AccordionSummary, AccordionList } from "./addons"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
  createUniqueId,
  createEffect,
  on,
} from "solid-js"
import { AccordionStore, AccordionStoreList } from "./context"
import { createStore } from "solid-js/store"

interface Accordion
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Примечание: Используйте этот идентификатор только в контексте компонента Accordion.List.
   */
  key?: string

  onChange?: (status: boolean) => void
}

type ComponentAccordion = Component<Accordion> & {
  Content: typeof AccordionContent
  Summary: typeof AccordionSummary
  List: typeof AccordionList
}

type Store = {
  status: boolean
}

const Accordion: ComponentAccordion = (props) => {
  const merged = mergeProps({ key: createUniqueId() }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "onChange",
    "key",
  ])

  const context = useContext(AccordionStoreList)

  const [store, setStore] = createStore<Store>({ status: false })

  createEffect(
    on(
      () => context?.status?.(local.key),
      (status) => {
        if (typeof status === "boolean") {
          setStore("status", status)
        }
      },
    ),
  )

  const handlerChange = () => {
    const status = context?.onChange?.(local.key) ?? !!!store.status
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
Accordion.List = AccordionList

export default Accordion

import style from "./AccordionList.module.css"
import { AccordionStore, AccordionStoreList } from "../../context"

import { Align, Cell, Events } from "ui"

import { type JSX, type Component, splitProps, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { list } from "postcss"

interface AccordionList
  extends Omit<JSX.HTMLAttributes<HTMLElement>, "onChange"> {
  onChange?: (status: boolean) => void
}

type Store = {
  list: Record<string, boolean>
}

const AccordionList: Component<AccordionList> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "classList",
    "children",
    "onChange",
  ])

  const [store, setStore] = createStore<Store>({
    list: {},
  })

  const value = {
    status: (key: string) => store.list[key],
  }

  return (
    <section>
      <AccordionStoreList.Provider value={value}>
        {local.children}
      </AccordionStoreList.Provider>
    </section>
  )
}

export default AccordionList

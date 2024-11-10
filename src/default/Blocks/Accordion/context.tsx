import { createContext } from "solid-js"

export const AccordionStore = createContext<{
  status?: () => boolean
  onChange?: (status: boolean) => void
}>({})

export const AccordionStoreList = createContext<{
  status?: (key: string) => boolean
  onChange?: (status: boolean) => void
}>({})

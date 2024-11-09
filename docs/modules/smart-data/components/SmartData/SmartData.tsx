// import style from "./SmartData.module.css"
import {
  type JSX,
  type Component,
  createContext,
  splitProps,
  mergeProps,
  createEffect,
} from "solid-js"

import { Content, Skeleton, Error } from "./addition"
import { SmartDataAtom } from "../../handlers"
import {
  type GlobalAtom,
  type SmartData as ISmartData,
} from "../../types/index"
import { globalSignal } from "elum-state/solid"
import { createStore } from "solid-js/store"

export const context = createContext({
  skeleton: true,
  error: false,
  content: false,
})

interface SmartDataProps extends JSX.HTMLAttributes<HTMLDivElement> {
  atom: GlobalAtom<any>
  key?: string | number
}

export type CSmartData = Component<SmartDataProps> & {
  Content: typeof Content
  Skeleton: typeof Skeleton
  Error: typeof Error
}

const SmartData: CSmartData = (props) => {
  const merged = mergeProps({ key: "default" }, props)
  const [local, others] = splitProps(merged, ["atom", "key"])

  const [state] = globalSignal(
    local.atom as unknown as GlobalAtom<SmartDataAtom<ISmartData<unknown>>>,
  )

  const [values, setValues] = createStore({
    skeleton: false,
    error: false,
    content: true,
  })

  createEffect(() => {
    const data = state().cache.get(String(local.key))
    setValues({
      skeleton: !data?.system?.isError && !!data?.system?.isLoad,
      error: !!data?.system?.isError,
      content: !data?.system?.isError && !data?.system?.isLoad,
    })
  })

  return <context.Provider value={values}>{props.children}</context.Provider>
}

SmartData.Content = Content
SmartData.Skeleton = Skeleton
SmartData.Error = Error

export default SmartData

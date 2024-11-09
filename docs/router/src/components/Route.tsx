import { globalSignal, setter } from "elum-state/solid"
import {
  type JSX,
  type Component,
  createContext,
  onMount,
  createEffect,
} from "solid-js"
import { HISTORY_ATOM, SETTINGS_ATOM, STRUCT_ATOM } from "../atom"
import { bridgeSetupBackButton } from "@apiteam/twa-bridge/solid"
import { pushPage } from "../actions/pushPage"

export const RouteContext = createContext({
  pathname: "",
})

interface Route {
  pathname?: string
  children: JSX.Element
  struct: {
    viewId: string
    panels: Record<string, string>
  }[]
  startPage: string
}

const Route: Component<Route> = (props) => {
  const [history] = globalSignal(HISTORY_ATOM)

  createEffect(() => {
    const is_visible = history().history.slice(-1)[0]?.is_back || false
    bridgeSetupBackButton({ is_visible })
  })

  const value = {
    pathname: props.pathname || "",
  }

  onMount(() => {
    setter(SETTINGS_ATOM, value)
    setter(STRUCT_ATOM, props.struct)
    pushPage({ pageId: props.startPage, is_back: false })
  })

  return (
    <RouteContext.Provider value={value}>
      {props.children}
    </RouteContext.Provider>
  )
}

export default Route

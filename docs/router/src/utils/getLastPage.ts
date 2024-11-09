import { getter } from "elum-state/solid"
import { ROUTER_ATOM } from "router/lib"
import { HISTORY_ATOM, STRUCT_ATOM } from "../atom"

const getLastPage = () => {
  const lastView = getter(HISTORY_ATOM).history.slice(-1)[0]
  if (lastView) {
    const view = getter(STRUCT_ATOM).find((a) => a.viewId === lastView.viewId)
    if (view) {
      const foundPage = Object.entries(view.panels).find(
        ([_, panelId]) => panelId === lastView.panelId,
      )
      return foundPage?.[0]
    }
  }
  return undefined
}

export default getLastPage

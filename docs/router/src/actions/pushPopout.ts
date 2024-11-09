import { getter, setter } from "elum-state/solid"
import { Params } from ".."
import {
  HISTORY_ATOM,
  LAST_HISTORY_ATOM,
  MODAL_ATOM,
  PARAMS_ATOM,
  POPOUT_ATOM,
  STRUCT_ATOM,
} from "../atom"
import { HISTORY } from "../atom/history"
import { getLastPage, setHistory } from "../utils"

type Props<P extends Params> = {
  popoutId: string
  params?: P
  is_back?: boolean
}

const pushPopout = <P extends Params>({
  popoutId,
  params,
  is_back = true,
}: Props<P>): boolean => {
  const pageId = getLastPage() || ""
  const page = getter(STRUCT_ATOM).find((a) => a.panels[pageId])
  if (!page) {
    console.error("pageId is not found of struct.")
    return false
  }

  const history = getter(HISTORY_ATOM)

  const lastView = history.history.slice(-1)[0]
  if (!lastView) {
    console.error("pageId is not found of struct.")
    return false
  }

  const { viewId, panelId } = {
    viewId: page.viewId,
    panelId: page.panels[pageId],
  }

  setHistory({ pageId, popoutId, params })

  setter(HISTORY_ATOM, (value) => {
    const newHistory: HISTORY["history"][0] = {
      viewId,
      panelId,
      modalId: lastView.modalId,
      popoutId,
      params,
      is_back,
    }

    value.history.push(newHistory)

    if (value.view[page.viewId]) {
      value.view[page.viewId].push(newHistory)
    }

    return value
  })

  if (params) {
    setter(PARAMS_ATOM, (value) => {
      value["all"] = params
      value[`popout=${popoutId}`] = params
      return Object.assign({ ...value })
    })
  }

  setter(POPOUT_ATOM, popoutId)

  return true
}

export { pushPopout }

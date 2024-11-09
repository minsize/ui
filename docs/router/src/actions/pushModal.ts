import { getter, setter } from "elum-state/solid"
import { Params } from ".."
import {
  HISTORY_ATOM,
  LAST_HISTORY_ATOM,
  MODAL_ATOM,
  PARAMS_ATOM,
  STRUCT_ATOM,
} from "../atom"
import { HISTORY } from "../atom/history"
import { getLastPage, setHistory } from "../utils"

type Props<P extends Params> = {
  modalId: string
  params?: P
  is_back?: boolean
}

const pushModal = <P extends Params>({
  modalId,
  params,
  is_back = true,
}: Props<P>): boolean => {
  const pageId = getLastPage() || ""
  const page = getter(STRUCT_ATOM).find((a) => a.panels[pageId])
  if (!page) {
    console.error("pageId is not found of struct.")
    return false
  }

  const { viewId, panelId } = {
    viewId: page.viewId,
    panelId: page.panels[pageId],
  }

  setHistory({ pageId, modalId, params })

  setter(HISTORY_ATOM, (value) => {
    const newHistory: HISTORY["history"][0] = {
      viewId,
      panelId,
      modalId,
      params,
      is_back,
    }

    value.history.push(newHistory)

    if (value.view[page.viewId]) {
      value.view[page.viewId].push(newHistory)
    }

    return value
  })

  setter(LAST_HISTORY_ATOM, (value) => {
    value[page.viewId] = panelId
    return Object.assign({ ...value })
  })

  if (params) {
    setter(PARAMS_ATOM, (value) => {
      value["all"] = params
      value[`modal=${modalId}`] = params
      return Object.assign({ ...value })
    })
  }

  setter(MODAL_ATOM, modalId)

  return true
}

export { pushModal }

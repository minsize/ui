import { getter, setter } from "elum-state/solid"
import { Params } from ".."
import {
  HISTORY_ATOM,
  LAST_HISTORY_ATOM,
  MODAL_ATOM,
  PANEL_ATOM,
  PARAMS_ATOM,
  POPOUT_ATOM,
  STRUCT_ATOM,
  VIEW_ATOM,
} from "../atom"
import { HISTORY } from "../atom/history"
import { setHistory } from "../utils"

const backPage = (backIndex: number = 1): boolean => {
  if (backIndex - 1) {
    window.history.go((backIndex - 1) * -1)
  }
  const history = getter(HISTORY_ATOM)

  const lastView = history.history.slice(-2)[0]
  if (!lastView) {
    console.error("pageId is not found of struct.")
    return false
  }

  const struct = getter(STRUCT_ATOM)

  const view = struct.find((a) => a.viewId === lastView.viewId)
  if (!view) {
    console.error("pageId is not found of struct.")
    return false
  }

  const foundPage = Object.entries(view.panels).find(
    ([_, panelId]) => panelId === lastView.panelId,
  )
  if (!foundPage) {
    console.error("pageId is not found of struct.")
    return false
  }

  const pageId = foundPage[0]

  const page = struct.find((a) => a.panels[pageId])
  if (!page) {
    console.error("pageId is not found of struct.")
    return false
  }

  const { viewId, panelId } = {
    viewId: page.viewId,
    panelId: page.panels[pageId],
  }

  setHistory({
    pageId: pageId,
    modalId: lastView.modalId,
    popoutId: lastView.popoutId,
    params: lastView.params,
  })

  setter(HISTORY_ATOM, (value) => {
    if (backIndex && value.history.length >= 1) {
      value.history = value.history.slice(0, backIndex * -1)
    }

    return { ...value }
  })

  setter(LAST_HISTORY_ATOM, (value) => {
    value[viewId] = panelId
    return Object.assign({ ...value })
  })

  setter(PARAMS_ATOM, (value) => {
    value["all"] = lastView.params
    if (!!lastView.popoutId) {
      value[`popout=${lastView.popoutId}`] = lastView.params
    } else if (!!lastView.modalId) {
      value[`modal=${lastView.modalId}`] = lastView.params
    } else if (!!pageId) {
      value[`page=${pageId}`] = lastView.params
    }
    return Object.assign({ ...value })
  })

  setter(VIEW_ATOM, viewId)
  setter(PANEL_ATOM, panelId)
  setter(MODAL_ATOM, lastView.modalId)
  setter(POPOUT_ATOM, lastView.popoutId)

  return true
}

export { backPage }

import { getter, setter } from "elum-state/solid"
import { Params } from ".."
import {
  HISTORY_ATOM,
  LAST_HISTORY_ATOM,
  PANEL_ATOM,
  STRUCT_ATOM,
  VIEW_ATOM,
} from "../atom"
import { HISTORY } from "../atom/history"
import { setHistory, setParams } from "../utils"

type Props<P extends Params> = {
  pageId: string
  params?: P
  is_back?: boolean
}

const pushPage = <P extends Params>({
  pageId,
  params,
  is_back = true,
}: Props<P>): boolean => {
  const page = getter(STRUCT_ATOM).find((a) => a.panels[pageId])
  if (!page) {
    console.error("pageId is not found of struct.")
    return false
  }

  const { viewId, panelId } = {
    viewId: page.viewId,
    panelId: page.panels[pageId],
  }

  setHistory({ pageId, params })

  setter(HISTORY_ATOM, (value) => {
    const newHistory: HISTORY["history"][0] = {
      viewId,
      panelId,
      params,
      is_back,
    }

    value.history.push(newHistory)

    if (value.view[page.viewId]) {
      value.view[page.viewId].push(newHistory)
    }

    return { ...value }
  })

  setter(LAST_HISTORY_ATOM, (value) => {
    value[page.viewId] = panelId
    return Object.assign({ ...value })
  })

  setParams({ pageId, params })

  setter(VIEW_ATOM, page.viewId)
  setter(PANEL_ATOM, page.panels[pageId])

  return true
}

export { pushPage }

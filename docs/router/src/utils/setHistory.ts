import { SETTINGS_ATOM } from "../atom"
import { getter } from "elum-state/solid"

type HistoryParams = {
  pageId: string
  modalId?: string
  popoutId?: string
  params?: any
}

const setHistory = ({ pageId, modalId, popoutId, params }: HistoryParams) => {
  const context = getter(SETTINGS_ATOM)

  let path = ""
  if (context.pathname) path = context.pathname
  if (pageId) path += pageId
  if (modalId) path += `=${modalId}`
  if (popoutId) path += `-${popoutId}`
  if (params) {
    let stringParams = ""
    for (var item of Object.entries(params)) {
      if (item[1]) stringParams += `${item[0]}=${item[1]},`
    }
    if (stringParams) path += `:${stringParams.slice(0, -1)}`
  }
  window.history.pushState(
    {},
    "",
    path + window.location.hash + window.location.search,
  )
}

/*
https://apiteam.ru/home=modalId:id=1,userId=2
*/

export default setHistory

import { getter, globalSignal } from "elum-state/solid"
import { PARAMS_ATOM } from "../atom"
import { Accessor, createEffect, createSignal, untrack } from "solid-js"
import { getHistory } from "../utils"

/*
  Переписать на изменяемый
*/

export const useParams = <A extends any>(): Accessor<A> => {
  const [type, setType] = createSignal("all")
  const location = getHistory()

  if (location.popoutId) {
    setType(`popout=${location.popoutId}`)
  } else if (location.modalId) {
    setType(`modal=${location.modalId}`)
  } else if (location.pageId) {
    setType(`page=${location.pageId}`)
  }

  const [storParams] = globalSignal(PARAMS_ATOM)

  const [params, setParams] = createSignal(getter(PARAMS_ATOM)[type()] || {})

  createEffect(() => {
    const _params = untrack(params)
    const newParams = storParams()[type()]
    if (JSON.stringify(_params) !== JSON.stringify(newParams)) {
      setParams(newParams || {})
    }
  })

  return params
}

export default useParams

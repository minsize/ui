import {
  type GlobalAtom,
  type SmartData,
  type SetStateAction,
  type SmartDataAtom,
} from "../types"
import { createDefault, defaultEquals, getKey } from "../utils"

import { globalSignal } from "elum-state/solid"

import { Accessor, createEffect, createSignal, untrack } from "solid-js"

/* Use Signal by Atom */
export const createSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  options: OPTIONS,
  params: {
    key?: string | number | (() => string | number)
    /*
    true - Не нужно обновлять сигнал
    */
    equals?: (prev: T, next: T) => boolean
  } = {
    key: "default",
  },
): [get: Accessor<T>, set: (value: SetStateAction<T>) => void] => {
  const [getter, setter] = globalSignal(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
  )

  const [cache, setCache] = createSignal<SmartData<T>>(
    {
      data: createDefault(untrack(getter).default),
      update_at: new Date(),
    },
    {
      equals: (prev, next) => defaultEquals(prev, next, params.equals),
    },
  )

  createEffect(() => {
    const state = untrack(getter)
    const onRequested = state.onRequested
    const key = getKey(params.key)
    const isRequest = state.requests.get(key)

    if (!isRequest && onRequested) {
      const onResult = (status: boolean) => {
        setter((value) => {
          value.requests.set(key, status)
          return { ...value }
        })
      }

      onResult(true)
      onRequested(() => onResult(false), key, options)
    }
  })

  createEffect(() => {
    const key = getKey(params.key)

    const data = getter().cache.get(key) || {
      data: createDefault(getter().default),
      update_at: new Date(),
    }
    if (!data.system) {
      data.system = {
        isError: false,
        isLoad: false,
      }
    }
    if (!!!data?.data) {
      data.system.isLoad = true
      data.update_at = new Date(0)
    }

    setCache({ ...data })
  })

  const _setCache = (v: SetStateAction<T>, update_via?: number) => {
    const key = getKey(params.key)
    return setter((value) => {
      const update_at = new Date(
        Date.now() + (update_via || getter().update_via),
      )

      const newValue = value.cache.get(key) || {
        data: createDefault(value.default),
        update_at,
      }

      newValue.data =
        typeof v === "function" ? (v as Function)({ ...newValue.data }) : v
      newValue.update_at = update_at

      value.cache.set(key, newValue)
      return { ...value }
    })
  }

  return [() => cache()?.data, _setCache]
}

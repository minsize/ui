import {
  type GlobalAtom,
  type SetStateAction,
  type SmartData,
  type SmartDataAtom,
} from "../types"
import { globalSignal } from "elum-state/solid"
import {
  type Accessor,
  createEffect,
  createSignal,
  createUniqueId,
  mergeProps,
  on,
  onCleanup,
  onMount,
  splitProps,
  untrack,
} from "solid-js"
import { createStore } from "solid-js/store"
import { createDefault } from "../utils"
import setterSmartData from "./setterSmartData"

export const createSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  options: OPTIONS | (() => OPTIONS),
  params: {
    key?: string | number | (() => string | number)
    /*
    нужно ли автоматически отправить запрос
    */
    isRequest?: boolean | (() => boolean)
    /*
    true - Не нужно обновлять сигнал
    */
    equals?: (prev: T, next: T) => boolean
  } /*
  {
    key = "default",
    isRequest = true,
    equals,
  }: 
  */,
): [
  get: Accessor<T>,
  set: (value: SetStateAction<T>) => void,
  get: Accessor<SmartData<T>["system"]>,
] => {
  const merged = mergeProps(
    {
      key: "default",
      isRequest: true,
    },
    params,
  )
  const [local] = splitProps(merged, ["equals", "isRequest", "key"])

  const [store, setStore] = createStore({ when: true })

  onMount(() => setStore("when", true))
  onCleanup(() => setStore("when", false))

  const [getter, setter] = globalSignal(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
  )

  const getKey = () => {
    return typeof local.key === "function"
      ? String(local.key())
      : String(local.key)
  }

  const getOptions = () => {
    return typeof options === "function" ? (options as Function)() : options
  }

  const getRequest = () => {
    return typeof local.isRequest === "function"
      ? (local.isRequest as Function)()
      : local.isRequest
  }

  const [cache, setCache] = createSignal<SmartData<T>>(
    {
      data: createDefault(untrack(getter).default),
      update_at: new Date(),
      req_id: "default",
    },
    {
      equals: (prev, next) => {
        return !local.equals
          ? prev?.req_id === next?.req_id
          : local.equals(prev?.data, next?.data)
      },
    },
  )

  const [system, setSystem] = createSignal<SmartData<T>["system"]>(
    untrack(cache)?.system,
  )

  createEffect(
    on(getKey, (prev, next) => {
      if (prev !== next) {
        const state = untrack(getter)
        const key = prev
        const onRequested = state.onRequested

        const _isRequest = state.requests.get(key)

        if (!_isRequest && getRequest() && store.when) {
          const onResult = (status: boolean) => {
            setter((value) => {
              value.requests.set(key, status)
              return { ...value }
            })
          }

          if (onRequested) {
            onResult(true)
            onRequested(() => onResult(false), key, getOptions())
          }
        }
      }
    }),
  )

  createEffect(() => {
    const data = getter().cache.get(getKey()) || {
      data: createDefault(getter().default),
      update_at: new Date(),
      req_id: "default",
    }
    if (!data.system) {
      data.system = {
        isError: false,
        isLoad: false,
        isFullLoad: false,
      }
    }
    // if (!!!data?.data) {
    //   data.system.isLoad = true
    //   data.update_at = new Date(0)
    // }

    if (data.req_id === "default") {
      data.req_id = createUniqueId()
      setter((value) => {
        value.cache.set(getKey(), data)
        return { ...value }
      })
    }

    setCache({ ...data })
    setSystem({ ...data.system })
  })

  const _setCache = (
    value: SetStateAction<T>,
    params?: {
      key?: string | number
      update_via?: number
      isLoad?: boolean | "auto"
      isError?: boolean | "auto"
      isFullLoad?: boolean | "auto"
    },
  ) => setterSmartData(atom, value, params)

  return [() => cache()?.data, _setCache, system]
}

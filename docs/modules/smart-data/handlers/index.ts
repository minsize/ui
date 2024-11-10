import {
  type GlobalAtom,
  type Atom,
  type SmartData,
  SetStateAction,
} from "../types"
import { atom, getter, setter } from "elum-state/solid"

import { Accessor, createEffect, createSignal, untrack } from "solid-js"
import { globalSignal } from "elum-state/solid"

export type SmartDataAtom<T, OPTIONS> = {
  default: T
  cache: Map<string, SmartData<T>>
  requests: Map<string, boolean>
  onRequested?: (
    onFinish: () => void,
    key: string | number,
    options: OPTIONS,
  ) => void
  update_via: number
}

/* Create Atom */
export const smartDataAtom = <T, OPTIONS>(
  opt: Atom<T, OPTIONS>,
): GlobalAtom<T, OPTIONS> => {
  return atom({
    key: opt.key,
    default: {
      default: opt.default,
      update_via: opt.update_via || 5_000,
      onRequested: opt.onRequested,
      cache: new Map<string, SmartData<T>>(),
      requests: new Map<string, boolean>(),
    },
  }) as unknown as GlobalAtom<T, OPTIONS>
}

const getDefault = <T>(data: T): T => {
  return Array.isArray(data) ? ([...data] as T) : { ...data }
}

/* Use Signal by Atom */
export const createSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  options: OPTIONS,
  {
    key = "default",
    equals,
  }: {
    key?: string | number | (() => string | number)
    /*
    true - Не нужно обновлять сигнал
    */
    equals?: (prev: T, next: T) => boolean
  },
): [get: Accessor<T>, set: (value: SetStateAction<T>) => void] => {
  const [getter, setter] = globalSignal(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
  )

  const getKey = () => {
    return typeof key === "function" ? String(key()) : String(key)
  }

  const [cache, setCache] = createSignal<SmartData<T>>(
    {
      data: getDefault(untrack(getter).default),
      update_at: new Date(),
    },
    {
      equals: (prev, next) =>
        !equals
          ? prev?.update_at === next?.update_at
          : equals(prev?.data, next?.data),
    },
  )

  createEffect(() => {
    const state = untrack(getter)
    const onRequested = state.onRequested

    const isRequest = state.requests.get(getKey())

    if (!isRequest) {
      const onResult = (status: boolean) => {
        setter((value) => {
          value.requests.set(getKey(), status)
          return { ...value }
        })
      }

      if (onRequested) {
        onResult(true)
        onRequested(() => onResult(false), getKey(), options)
      }
    }
  })

  createEffect(() => {
    const data = getter().cache.get(getKey()) || {
      data: getDefault(getter().default),
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
    return setter((value) => {
      const _update_via = update_via || getter().update_via

      const newValue = value.cache.get(getKey()) || {
        data: getDefault(value.default),
        update_at: new Date(Date.now() + _update_via),
      }

      newValue.data =
        typeof v === "function" ? (v as Function)({ ...newValue.data }) : v
      newValue.update_at = new Date(Date.now() + _update_via)

      value.cache.set(getKey(), newValue)
      return { ...value }
    })
  }

  return [() => cache()?.data, _setCache]
}

export const getterSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  key: string | number = "default",
) => {
  const store = getter(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
  )
  return store.cache.get(String(key))?.data
}

export const setterSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  v: SetStateAction<T>,
  {
    key = "default",
    update_via,
  }: {
    key?: string | number
    update_via?: number
  },
) => {
  return setter(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
    (value) => {
      const _update_via = update_via || value.update_via

      let newValue = value.cache.get(String(key)) || {
        data: getDefault(value.default),
        update_at: new Date(Date.now() + _update_via),
      }
      if (!newValue.system) {
        newValue.system = {
          isError: false,
          isLoad: false,
        }
      }

      newValue.data =
        typeof v === "function" ? (v as Function)({ ...newValue.data }) : v
      newValue.update_at = new Date(Date.now() + _update_via)
      newValue.system.isLoad = false
      newValue.system.isError = false

      value.cache.set(String(key), newValue)
      return { ...value }
    },
  )
}

export const managerSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  {
    key = "default",
    update_via,
  }: {
    key?: string | number
    update_via?: number
  },
) => {
  const state = getter(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
  )

  const data = state.cache.get(String(key))

  const _set = (_key: "isError" | "isLoad", _value: boolean) => {
    setter(
      atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
      (value) => {
        const _update_via = update_via || value.update_via

        const newValue = value.cache.get(String(key)) || {
          data: getDefault(value.default),
          update_at: new Date(Date.now() + _update_via),
        }

        if (!newValue.system) {
          newValue.system = {
            isError: false,
            isLoad: false,
          }
        }
        newValue.system[_key] = _value

        value.cache.set(String(key), newValue)
        return { ...value }
      },
    )
  }

  return {
    ...data,
    setError: (value: boolean) => _set("isError", value),
    /*
      Установка статуса загрузки, если не указан будет установлен автоматически
    */
    setLoad: (value?: boolean) => _set("isLoad", value || !!!data?.data),
  }
}

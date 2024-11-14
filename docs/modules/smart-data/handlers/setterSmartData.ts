import {
  type GlobalAtom,
  type SetStateAction,
  type SmartDataAtom,
} from "../types"
import { createDefault } from "../utils"
import { setter } from "elum-state/solid"
import { createUniqueId, mergeProps } from "solid-js"

const setterSmartData = <T, OPTIONS>(
  atom: GlobalAtom<T, OPTIONS>,
  v: SetStateAction<T> | undefined,
  params?: {
    key?: string | number
    update_via?: number
    isLoad?: boolean | "auto"
    isError?: boolean | "auto"
    isFullLoad?: boolean | "auto"
  },
) => {
  const merged = mergeProps(
    {
      key: "default",
      isLoad: false,
      isError: false,
      isFullLoad: false,
    },
    params,
  )

  return setter(
    atom as unknown as GlobalAtom<SmartDataAtom<T, OPTIONS>, OPTIONS>,
    (value) => {
      const _update_via = merged.update_via || value.update_via
      const key = String(merged.key)

      let newValue = value.cache.get(key) || {
        data: createDefault(value.default),
        update_at: new Date(Date.now() + _update_via),
        req_id: "default",
      }
      if (!newValue.system) {
        newValue.system = {
          isError: false,
          isLoad: false,
          isFullLoad: false,
        }
      }

      if (v !== undefined) {
        newValue.data =
          typeof v === "function"
            ? (v as Function)(
                Array.isArray(newValue.data)
                  ? [...newValue.data]
                  : { ...newValue.data },
              )
            : v
      }
      newValue.update_at = new Date(Date.now() + _update_via)
      newValue.req_id = createUniqueId()
      newValue.system.isLoad =
        merged.isLoad === "auto" ? !!newValue.system.isLoad : merged.isLoad
      newValue.system.isError =
        merged.isError === "auto" ? !!newValue.system.isError : merged.isError
      newValue.system.isFullLoad =
        merged.isFullLoad === "auto"
          ? !!newValue.system.isFullLoad
          : merged.isFullLoad

      value.cache.set(key, newValue)
      return { ...value }
    },
  )
}

export default setterSmartData

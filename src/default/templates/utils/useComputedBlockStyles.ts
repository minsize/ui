import { type Platform, usePlatform } from "ui"

import { createEffect, on } from "solid-js"
import { createStore } from "solid-js/store"

/**
 * Хук для получения и отслеживания вычисленных стилей.
 */
const useComputedBlockStyles = <T extends HTMLTextAreaElement>(
  ref: () => T,
  platform?: Platform,
) => {
  const platformValue = usePlatform(platform)
  const [store, setStore] = createStore<Partial<CSSStyleDeclaration>>({})

  const onUpdate = () => {
    const computedStyle = window.getComputedStyle(ref())
    setStore(computedStyle)
  }
  createEffect(on([platformValue, ref], onUpdate))

  return store
}

export default useComputedBlockStyles

import { createEffect, on } from "solid-js"
import { createStore } from "solid-js/store"
import { usePlatform, type Platform } from "ui"

/**
 * Хук для выбора стилей в зависимости от платформы.
 */
const useStyle = (
  styles: Record<Platform, CSSModuleClasses>,
  customPlatform?: Platform,
) => {
  const platform = usePlatform(customPlatform)
  const [store, setStore] = createStore({ ...styles[platform()] })

  createEffect(
    on(platform, (platform) => {
      setStore({ ...styles[platform] })
    }),
  )

  return store
}

export default useStyle

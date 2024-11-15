import { Platform } from "ui"
import { Accessor, createSignal } from "solid-js"

const [signal, setSignal] = createSignal<Platform>("iOS")

const getPlatform = () => {
  /**
   * Platform--iOS
   * Platform--android
   * Platform--macOS
   * Platform--windows
   * Platform--others
   */
  let platform: Platform = "others"
  if (/iPhone|iPad|iPod|Mac OS|Macintosh/i.test(navigator.userAgent)) {
    platform = "iOS"
  } else if (/Android|Linux/i.test(navigator.userAgent)) {
    platform = "android"
  }
  setSignal(platform)
}
getPlatform()
window.addEventListener("resize", getPlatform)

const usePlatform = (platform?: Platform): Accessor<Platform> =>
  platform ? () => platform : signal

export const classPlatform = (
  style: CSSModuleClasses,
  platform?: Platform,
) => ({
  [style[`${platform || signal()}`]]: true,
})

export default usePlatform

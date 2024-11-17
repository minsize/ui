import { usePlatform, type Platform } from "ui"

const useStyle = (
  styles: Record<Platform, CSSModuleClasses>,
  customPlatform?: Platform,
) => {
  // const platform = usePlatform(customPlatform)
  // return styles[platform()]

  return styles["iOS"]
}

export default useStyle

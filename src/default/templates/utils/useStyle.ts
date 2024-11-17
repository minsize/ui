import { usePlatform, type Platform } from "ui"

/**
 * Хук для выбора стилей в зависимости от платформы.
 */
const useStyle = (
  styles: Record<Platform, CSSModuleClasses>,
  customPlatform?: Platform,
) => {
  const platform = usePlatform(customPlatform)
  return styles[platform()]
}

export default useStyle

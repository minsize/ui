import { type Platform } from "@ui/Types"
import { createContext } from "solid-js"

export const CellStore = createContext<{
  getPlatform: () => Platform
  isSeparator: () => boolean
  getStyleContainer: () => string
  getStyleContent: () => string
  getStyleSeparator: () => string
}>({
  getPlatform: () => "others" as Platform,
  isSeparator: () => false,
  getStyleContainer: () => "",
  getStyleContent: () => "",
  getStyleSeparator: () => "",
})

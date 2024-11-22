import { type Platform, type HTMLAttributes, type TextObject } from "@ui/Types"

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  iOS?: TextObject | Omit<Platform, "iOS">
  android?: TextObject | Omit<Platform, "android">
  macOS?: TextObject | Omit<Platform, "macOS">
  windows?: TextObject | Omit<Platform, "windows">
  others?: TextObject | Omit<Platform, "others">
}

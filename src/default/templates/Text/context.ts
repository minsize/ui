import { type TextProps } from "ui"

import { createContext } from "solid-js"

type Context = {
  title: TextProps
  subTitle: TextProps
}

export const TextContext = createContext<Context>()

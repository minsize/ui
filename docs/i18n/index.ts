import { type Accessor, createMemo } from "solid-js"

import { atom, getter, globalSignal, setter } from "elum-state/solid"
import {
  type Flatten,
  type NullableTranslator,
  type ResolveArgs,
  type Resolved,
  type BaseRecordDict,
  flatten,
  resolveTemplate,
  translator,
} from "./src"

import ru from "./data/ru"
import en from "./data/en"

export type Locale = "ru" | "en"
export type RawDictionary = typeof ru & typeof en
export type Dictionary = Flatten<RawDictionary>

export const dictionaries = {
  ru: ru,
  en: en,
}

const rtl: Locale[] = []

const LOC = atom<Locale>({
  key: "localization_app",
  default: "ru",
})

export const getLocale = () => getter(LOC)

export type NullableTranslatorByCode<T extends BaseRecordDict, O = string> = <
  K extends keyof T,
>(
  code: Locale,
  path: K,
  ...args: ResolveArgs<T[K], O>
) => Resolved<T[K], O> | undefined

export const locByCode = () => {
  const [locale] = globalSignal<Locale>(LOC)

  const get: NullableTranslatorByCode<Dictionary> = (code, path, ...args) => {
    const dict = createMemo(() => flatten(dictionaries[code])) as any

    return translator(dict, resolveTemplate)(path, ...args) as any
  }

  return [get, locale] as [
    NullableTranslatorByCode<Dictionary>,
    Accessor<Locale>,
  ]
}

const loc = () => {
  const [locale] = globalSignal<Locale>(LOC)
  const dict = createMemo(() => flatten(dictionaries[locale()]))

  return [translator(dict, resolveTemplate), locale] as [
    NullableTranslator<Dictionary>,
    Accessor<Locale>,
  ]
}

export const swap = (locale: Locale) => {
  /**
   * Default language
   */
  if (!dictionaries[locale]) locale = "en"

  document.documentElement.setAttribute("lang", locale)
  document.documentElement.setAttribute(
    "dir",
    rtl.includes(locale) ? "rtl" : "ltr",
  )
  setter(LOC, locale)
}

export default loc

import style from "./LayoutManager.module.css"
import { First, Last } from "./addons"

import { LayoutManagerStore } from "./context"
import { toArray } from "engine"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  children,
  createEffect,
  on,
  createUniqueId,
} from "solid-js"
import { createStore } from "solid-js/store"

interface LayoutManager extends JSX.HTMLAttributes<HTMLDivElement> {
  active: string
  elements: JSX.Element
  children: JSX.Element

  styles?: {
    next: string
    back: string
    firstIndex: string
    lastIndex: string
    firstElement: string
    lastElement: string
  }
}

type ComponentLayoutManager = Component<LayoutManager> & {
  First: typeof First
  Last: typeof Last
}

interface Store {
  lastVisible: boolean
  firstVisible: boolean
  lastType: "last" | "first"
  last: string | undefined
  first: string
  anim: boolean
  animEnd: {
    first: boolean
    last: boolean
  }
}

const LayoutManager: ComponentLayoutManager = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "elements",
    "active",
    "styles",
  ])

  const panels = toArray(children(() => local.elements))
  const [store, setStore] = createStore<Store>({
    lastVisible: false,
    firstVisible: false,
    lastType: "first",
    last: "",
    first: "",
    anim: false,
    animEnd: {
      first: false,
      last: false,
    },
  })

  createEffect(
    on(
      () => local.active,
      (active) => {
        const isLastTypeFirst = store.lastType === "first"
        if (store[isLastTypeFirst ? "last" : "first"] === active) return

        setStore({
          lastType: isLastTypeFirst ? "last" : "first",
          firstVisible: true,
          lastVisible: true,
          [isLastTypeFirst ? "first" : "last"]: active,
          anim: !!active && !!store[!isLastTypeFirst ? "first" : "last"],
          animEnd: {
            first: false,
            last: false,
          },
        })
      },
    ),
  )

  const direction = (type: "last" | "first"): "next" | "back" => {
    const backIndex = panels.findIndex((child) => child.nav === store[type])
    const nextIndex = panels.findIndex(
      (child) => child.nav === store[type === "last" ? "first" : "last"],
    )

    // if (backIndex === -1 || nextIndex === -1) {
    //   return "next"
    // }

    return backIndex < nextIndex ? "next" : "back"
  }
  const getVisible = (type: "last" | "first") => store[`${type}Visible`]

  const getChild = (type: "first" | "last") =>
    getVisible(type) ? panels.find((x) => x.nav === store[type]) : undefined

  const getAnim = () => store.anim

  const id = createUniqueId()

  const onAnimationEnd = (type: "last" | "first") => {
    setStore("animEnd", type, true)

    if (store.animEnd.first && store.animEnd.last) {
      setStore({
        [store.lastType === "first" ? "firstVisible" : "lastVisible"]: false,
        anim: false,
      })
    }
  }

  const styleIndex = (type: "last" | "first") => {
    const isBack = direction(store.lastType) === "back"
    const isLastType = store.lastType === type
    const isLast = isBack ? !isLastType : isLastType

    return {
      [local.styles?.firstIndex || "_firstIndex"]: isLast,
      [local.styles?.lastIndex || "_lastIndex"]: !isLast,
      [local.styles?.lastElement || "_lastElement"]: isLastType,
      [local.styles?.firstElement || "_firstElement"]: !isLastType,
      // [style[`View--index-1`]]: isLast,
      // [style[`View--index-2`]]: !isLast,
      // [style[`View--last`]]: isLastType,
      // [style[`View--first`]]: !isLastType,
    }
  }

  return (
    <div
      class={style.LayoutManager}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,

        [local.styles?.[direction(store.lastType)] ||
        "_" + direction(store.lastType)]: store.anim,
      }}
    >
      <LayoutManagerStore.Provider
        value={{
          getChild,
          onAnimationEnd,
          styleIndex,
          getAnim,
        }}
      >
        {local.children}
      </LayoutManagerStore.Provider>
    </div>
  )
}

LayoutManager.First = First
LayoutManager.Last = Last

export default LayoutManager

import {
  JSX,
  Component,
  For,
  children,
  createEffect,
  Show,
  splitProps,
  onMount,
} from "solid-js"
import { createStore } from "solid-js/store"
import { usePlatform, toArray } from "ui"

import style from "./Root.module.css"

interface Store {
  back: string | undefined
  active: string
  anim: boolean
  show: boolean
}

interface Root {
  activeView: string
  children: JSX.Element
  class?: string

  modal?: JSX.Element
  popout?: JSX.Element

  header?: JSX.Element
}

const Root: Component<Root> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "activeView",
    "children",
    "modal",
    "popout",
    "header",
  ])

  const childs = toArray(children(() => props.children))
  const [store, setStore] = createStore<Store>({
    back: undefined,
    active: props.activeView,
    anim: false,
    show: false,
  })

  const platform = usePlatform()

  createEffect(() => {
    document.documentElement.setAttribute("platform", platform())
  })

  createEffect(() => {
    if (store.active !== props.activeView) {
      setStore({
        back: store.active,
        active: props.activeView,
        anim: true,
        show: true,
      })
    }
  })

  const isActive = (element: string) => element === store.active
  const isBack = (element: string) => element === store.back && store.show

  const direction = (): "next" | "back" => {
    let back = -1
    let next = -1

    for (let i = 0; i < childs.length; i++) {
      if (childs[i].nav === store.back) {
        back = i
      }
      if (childs[i].nav === store.active) {
        next = i
      }
      if (back !== -1 && next !== -1) {
        break
      }
    }

    return back < next ? "next" : "back"
  }

  return (
    <div
      class={style.Root}
      classList={{
        [style["Root__isHeader"]]: !!local.header,
        [style["Root__noneHeader"]]: !!!local.header,

        [`${local.class}`]: !!local.class,
      }}
      {...others}
    >
      <Show when={local.header}>
        <div class={style["Root__header"]}>{local.header}</div>
      </Show>
      <For
        each={childs}
        children={(element) => (
          <Show when={isActive(element.nav) || isBack(element.nav)}>
            <div
              onanimationend={() =>
                isActive(element.nav) &&
                setStore({
                  anim: false,
                  show: false,
                })
              }
              classList={{
                [style[`Root--to-${direction()}`]]: true,
                [style["Root--back"]]: isBack(element.nav),
                [style["Root--active"]]: isActive(element.nav),
                [style["Root--animate"]]: store.anim,
              }}
            >
              {element.component({ nav: element.nav })}
            </div>
          </Show>
        )}
      />

      {/* <Show when={!!local.popout} children={local.popout}/> */}
      {local.popout}
      {local.modal}
    </div>
  )
}

export default Root

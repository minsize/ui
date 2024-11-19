import {
  type JSX,
  type Component,
  splitProps,
  children,
  createEffect,
  For,
  Show,
} from "solid-js"
import { createStore } from "solid-js/store"

import style from "./View.module.css"
import { toArray } from "ui"

interface Store {
  back: string | undefined
  active: string
  anim: boolean
  show: boolean
}

interface View extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  activePanel: string
  nav: string
  children: JSX.Element
}

const View: Component<View> = (props) => {
  const [local, others] = splitProps(props, [
    "nav",
    "class",
    "activePanel",
    "classList",
    "children",
  ])

  const childs = toArray(children(() => local.children))
  const [store, setStore] = createStore<Store>({
    back: undefined,
    active: local.activePanel,
    anim: false,
    show: false,
  })

  createEffect(() => {
    if (store.active !== local.activePanel) {
      setStore({
        back: store.active,
        active: local.activePanel,
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
      class={style.View}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      data-nav={local.nav}
      {...others}
    >
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
                [style[`View--to-${direction()}`]]: true,
                [style["View--back"]]: isBack(element.nav),
                [style["View--active"]]: isActive(element.nav),
                [style["View--animate"]]: store.anim,
              }}
            >
              {element.component({ nav: element.nav })}
            </div>
          </Show>
        )}
      />
    </div>
  )
}

export default View

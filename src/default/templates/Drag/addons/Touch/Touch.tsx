import style from "./Touch.module.css"
import { DropContext, TouchContext } from "../../context"

import ElTouch, { type GestureEvent } from "@src/default/Templates/Touch/Touch"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
  createEffect,
} from "solid-js"
import { createStore, produce } from "solid-js/store"

interface Touch extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onClick"> {}

type Store = {
  isActive: boolean
  isAnim: boolean
  position: {
    x: number
    y: number
  }
  settings?: {
    block: {
      x: boolean
      safe: boolean
    }
    bounding: DOMRect
  }
}

const Touch: Component<Touch> = (props) => {
  const contextTouch = useContext(TouchContext)
  if (!contextTouch) {
    throw new Error("TouchContext undefined")
  }

  const context = useContext(DropContext)

  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  let ref: HTMLDivElement

  const [store, setStore] = createStore<Store>({
    isActive: false,
    isAnim: false,
    position: { x: 0, y: 0 },
  })

  createEffect(() => {
    const settings = context?.getSettings()
    setStore("settings", settings)
  })

  const onStart = (event: GestureEvent) => {
    const x = event.shiftX
    const y = event.shiftY
    if (x && y) {
      const position = context?.editPositionElement(contextTouch.key, x, y)

      if (position) {
        setStore(
          produce((store) => {
            store.isAnim = false
            store.isActive = true

            if (!store.settings?.block.x) {
              store.position.x = position.x
            }

            store.position.y = position.y

            return store
          }),
        )
      }
    }
  }
  const onMove = (event: GestureEvent) => {
    const x = event.shiftX
    const y = event.shiftY
    if (x && y) {
      const position = context?.editPositionElement(contextTouch.key, x, y)

      if (position) {
        setStore(
          produce((store) => {
            store.isAnim = false
            store.isActive = true

            if (!store.settings?.block.x) {
              store.position.x = position.x
            }

            store.position.y = position.y

            return store
          }),
        )
      }
    }
  }

  const onEnd = (event: GestureEvent) => {
    context?.editPositionElement(contextTouch.key, 0, 0)
    setStore(
      produce((store) => {
        store.isAnim = true
        store.isActive = false

        return store
      }),
    )
    setTimeout(onTransitionEnd, 300)
  }

  const onTransitionEnd = () => {
    if (store.isAnim) {
      context?.onEnd(contextTouch.key)
      setStore("isAnim", false)
    }
  }

  return (
    <ElTouch
      ref={ref!}
      class={style.Touch}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
      onStart={onStart}
      onMove={onMove}
      onEnd={onEnd}
      onTransitionEnd={onTransitionEnd}
    >
      {local.children}
    </ElTouch>
  )
}

export default Touch

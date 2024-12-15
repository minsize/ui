import style from "./Drop.module.css"
import { DropContext } from "../../context"

import { type Drags } from "@ui/Types"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  createSignal,
  createEffect,
} from "solid-js"
import { createStore, produce } from "solid-js/store"
import { clamp } from "engine"

interface Drop extends JSX.HTMLAttributes<HTMLDivElement> {
  blockX?: boolean
  safe?: boolean

  onEnd: (to: string, from: string) => void
}

const Drop: Component<Drop> = (props) => {
  const merged = mergeProps({ blockX: false, safe: false }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "onEnd",
    "blockX",
    "safe",
  ])

  let ref: HTMLDivElement

  const [drags, setDrags] = createStore<{
    items: Record<string, Drags>
  }>({ items: {} })
  const [store, setStore] = createStore({
    block: {
      x: local.blockX,
      safe: local.safe,
    },
    bounding: ref!?.getBoundingClientRect(),
  })

  createEffect(() => {
    setStore(
      produce((store) => {
        store.block.x = local.blockX
        store.block.safe = local.safe

        store.bounding = ref!?.getBoundingClientRect()

        return store
      }),
    )
  })

  const initDrag = (key: string, position: number, ref: HTMLElement) => {
    setDrags((drags) => {
      if (ref) {
        const bounding = ref!.getBoundingClientRect()

        drags.items[key] = {
          key,
          isActive: false,
          position: {
            element: position,
            bounding,
          },
          transform: { y: 0 },
        }
      }

      return drags
    })
  }

  const editPositionElement = (key: string, x: number, y: number) => {
    setDrags((drags) => {
      const isOk = x && y
      const drag = drags.items[key]

      if (drag) {
        if (x && y) {
          drag.isActive = true
          drag.position.x = x
          drag.position.y = y
        } else {
          if (drag.position.x && drag.position.y) {
            x = drag.position.x
            y = drag.position.y
          }
        }

        const dragActive = drag
        const boundingDragActive = dragActive.position.bounding

        const dragActiveY = boundingDragActive.y
        const dragActiveHeight = boundingDragActive.height / 2

        const indexActive = drag.position.element

        let lastDragKey: string | undefined

        for (const key in drags.items) {
          const drag = drags.items[key]
          if (drag.key === key) continue

          drag.isActive = false

          if (isOk) {
            drag.transform = { y: 0 }
            drag.lastEdit = false
          }

          const boundingY = drag.position.bounding.y

          const index = drag.position.element

          const isPosition = index >= indexActive

          const positionY = y + dragActiveY

          const isHoverBottom = positionY + dragActiveHeight >= boundingY

          const isHoverTop = positionY - dragActiveHeight <= boundingY

          if (y >= 0 && isPosition && isHoverBottom) {
            if (isOk) drag.transform = { y: -boundingDragActive.height }
            lastDragKey = drag.key
          } else if (y < 0 && !isPosition && isHoverTop) {
            if (isOk) drag.transform = { y: boundingDragActive.height }
            if (!lastDragKey) lastDragKey = drag.key
          }
        }

        if (lastDragKey) {
          const lastDrag = drags.items[lastDragKey]
          if (lastDrag) {
            lastDrag.lastEdit = true
            if (!isOk) {
              const bounding = lastDrag.position.bounding
              drag.transform = { y: bounding.y - boundingDragActive.y }
            }
          }
        }
      }

      return drags
    })

    const drag = drags.items[key]

    return {
      x: store.block.safe ? 0 : x,
      y: store.block.safe
        ? clamp(
            y,
            store.bounding.top - (drag?.position.bounding.top || 0),
            store.bounding.height -
              (drag?.position.bounding.height || 0) -
              (drag?.position.bounding.top || 0),
          )
        : y,
    }
  }

  const getActive = (key: string) => {
    return false
    // const isActiveOnly =
    //   drags().find((x) => x.isActive === true && x.key !== key)?.isActive ||
    //   false

    // return isActiveOnly
  }

  const getTransform = (key: string) => drags.items[key]?.transform || { y: 0 }

  const onEnd = (key: string) => {
    const activeDrag = drags.items[key]
    const lastDrag = drags.items[key] // drags().findLast((x) => x.lastEdit === true)

    if (activeDrag && lastDrag) {
      setDrags((drags) => {
        for (const key in drags.items) {
          const drag = drags.items[key]
          drag.isActive = false
          drag.transform = { y: 0 }
        }

        return drags
      })
      local?.onEnd(lastDrag?.key, activeDrag?.key)
    }
  }

  const getDrag = (key: string) => {
    console.log("drags[key]", drags)
    return drags.items[key]
  }

  return (
    <div
      ref={ref!}
      class={style.Drop}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      <DropContext.Provider
        value={{
          getDrag,
          initDrag,
          editPositionElement,
          getActive,
          getTransform,
          onEnd,
          getSettings: () => store,
        }}
      >
        {local.children}
      </DropContext.Provider>
    </div>
  )
}

export default Drop

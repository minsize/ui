import { type JSX, type Component, mergeProps, splitProps } from "solid-js"
import { createStore } from "solid-js/store"
import { Dynamic } from "solid-js/web"
import { leadingAndTrailing, throttle } from "@solid-primitives/scheduled"

import style from "./Events.module.css"

export interface IEvents extends JSX.HTMLAttributes<HTMLElement> {
  type?: string
  disabled?: boolean
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  minHover?: number
  minActive?: number
}

const isTouchSupport = window && "ontouchstart" in window

const Events: Component<IEvents> = (props) => {
  const merged = mergeProps({ minHover: 0, minActive: 300 }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "disabled",
    "type",
    "onClick",
    "href",
    "minActive",
    "minHover",
  ])
  const [store, setStore] = createStore({ hover: false, active: false })

  const getClickable = () => {
    const type = local.href ? "a" : local.type || "div"
    if (type === "a" && local.href !== undefined) return true
    if (type !== "a" && local.onClick !== undefined) return true
    return false
  }

  const setActive =
    local.minActive === 0
      ? (status: boolean) => setStore("active", status)
      : leadingAndTrailing(
          throttle,
          (status: boolean) => setStore("active", status),
          local.minActive,
        )
  const setHover =
    local.minHover === 0
      ? (status: boolean) => setStore("hover", status)
      : leadingAndTrailing(
          throttle,
          (status: boolean) => setStore("hover", status),
          local.minActive,
        )

  const onStart = () =>
    !local.disabled && getClickable() && !store.active && setActive(true)

  const onMouseMove = () =>
    !local.disabled &&
    getClickable() &&
    !isTouchSupport &&
    !store.hover &&
    setHover(true)

  const onEnd = () => {
    setHover(
      !!(
        !local.disabled &&
        getClickable() &&
        !isTouchSupport &&
        store.hover &&
        store.active
      ),
    )
    setActive(false)
  }

  const onMouseLeave = () => {
    if (!local.disabled && getClickable() && store.hover) {
      setHover(false)
      setActive(false)
    }
  }

  const handleClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (
    event,
  ) => {
    if (typeof local.onClick === "function" && !local.disabled) {
      event.stopPropagation()
      local.onClick(event)
    }
  }

  return (
    <Dynamic
      component={local.href ? "a" : local.type || "div"}
      class={local.class}
      classList={{
        [style.notallocate]: true,
        _disabled: local.disabled,
        _hover: store.hover,
        _active: store.active,
        ...local.classList,
      }}
      onTouchStart={onStart}
      onTouchEnd={onEnd}
      onTouchMove={onMouseMove}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onClick={handleClick}
      href={local.href}
      {...others}
    />
  )
}

export default Events

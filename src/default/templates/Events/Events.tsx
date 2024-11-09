import { Component, splitProps } from "solid-js"
import { createStore } from "solid-js/store"
import { JSX } from "solid-js/jsx-runtime"
import { Dynamic } from "solid-js/web"

import style from "./Events.module.css"

export interface IEvents extends JSX.HTMLAttributes<HTMLElement> {
  type?: string
  disabled?: boolean
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
}

const isTouchSupport = window && "ontouchstart" in window

const Events: Component<IEvents> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "classList",
    "disabled",
    "type",
    "onClick",
    "href",
  ])
  const [store, setStore] = createStore({ hover: false, active: false })

  const getClickable = () => {
    const type = local.href ? "a" : local.type || "div"
    if (type === "a" && local.href !== undefined) return true
    if (type !== "a" && local.onClick !== undefined) return true
    return false
  }

  const onStart = () =>
    !local.disabled &&
    getClickable() &&
    !store.active &&
    setStore("active", true)

  const onMouseMove = () =>
    !local.disabled &&
    getClickable() &&
    !isTouchSupport &&
    !store.hover &&
    setStore("hover", true)

  const onEnd = () => {
    setStore({
      hover: !!(
        !local.disabled &&
        getClickable() &&
        !isTouchSupport &&
        store.hover &&
        store.active
      ),
      active: false,
    })
  }

  const onMouseLeave = () =>
    !local.disabled &&
    getClickable() &&
    store.hover &&
    setStore({
      hover: false,
      active: false,
    })

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

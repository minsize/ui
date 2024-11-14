import style from "./Events.module.css"

import {
  type JSX,
  type Component,
  type ValidComponent,
  mergeProps,
  splitProps,
  Switch,
  Match,
  children,
} from "solid-js"
import { createStore } from "solid-js/store"
import { Dynamic, type DynamicProps } from "solid-js/web"
import { leadingAndTrailing, throttle } from "@solid-primitives/scheduled"

export interface IEvents<T extends ValidComponent>
  extends JSX.HTMLAttributes<DynamicProps<T>> {
  component?: T | ((props: JSX.HTMLAttributes<HTMLElement>) => JSX.Element)
  disabled?: boolean
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  minHover?: number
  minActive?: number
}

const isTouchSupport = window && "ontouchstart" in window

const Events = <T extends ValidComponent>(props: IEvents<T>): JSX.Element => {
  const merged = mergeProps(
    { component: "div", minHover: 0, minActive: 300 },
    props,
  )
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "disabled",
    "component",
    "onClick",
    "href",
    "minActive",
    "minHover",
    "children",
  ])
  const [store, setStore] = createStore({ hover: false, active: false })

  const getClickable = () => {
    const type = local.href ? "a" : local.component || "div"
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
      local.onClick(event as any)
    }
  }

  const _props = {
    class: local.class,
    classList: {
      [style.notallocate]: true,
      _disabled: local.disabled,
      _hover: store.hover,
      _active: store.active,
      ...local.classList,
    },
    onTouchStart: onStart,
    onTouchEnd: onEnd,
    onTouchMove: onMouseMove,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onMouseDown: onStart,
    onMouseUp: onEnd,
    onClick: handleClick,
    children: local.children,
  }

  return (
    <Switch
      fallback={
        typeof local.component === "function" && local.component(_props)
      }
    >
      <Match when={typeof local.component !== "function"}>
        <Dynamic
          component={local.href ? "a" : local.component || "div"}
          {..._props}
          {...({ href: local.href } as any)}
          {...others}
        />
      </Match>
    </Switch>
  )
}

export default Events

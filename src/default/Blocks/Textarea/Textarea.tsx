import { createStore } from "solid-js/store"
import style from "./Textarea.module.css"
import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  createEffect,
  onMount,
  on,
} from "solid-js"

interface Textarea
  extends Omit<JSX.HTMLAttributes<HTMLTextAreaElement>, "onInput"> {
  /**
   * Автоматическое растягивание textarea
   */
  grow?: boolean
  /**
   * Максимальная высота поля
   */
  maxHeight?: string
  /**
   *
   */
  resize?: boolean
  /**
   *
   */
  onResize?: (el: HTMLTextAreaElement) => void
  /**
   *
   */
  onInput?: JSX.InputEventHandler<HTMLTextAreaElement, InputEvent>

  placeholder?: string
}

const Textarea: Component<Textarea> = (props) => {
  const merged = mergeProps({ grow: true, resize: true }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "grow",
    "maxHeight",
    "onResize",
    "onInput",
    "placeholder",
    "resize",
  ])
  let ref: HTMLTextAreaElement

  const onResize = () => {
    if (local.grow) {
      if (ref && ref.offsetParent) {
        ref.style.height = ""
        ref.style.height = ref.scrollHeight + "px"
        local.onResize && local.onResize(ref)
      }
    }
  }

  const onInput: JSX.InputEventHandlerUnion<HTMLTextAreaElement, InputEvent> = (
    event,
  ) => {
    onResize()
    local.onInput && local.onInput(event)
  }

  return (
    <textarea
      ref={ref!}
      class={style.Textarea}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      onInput={onInput}
      style={{
        "max-height": local.maxHeight,
      }}
      {...others}
    >
      {local.children}
    </textarea>
  )
}

export default Textarea

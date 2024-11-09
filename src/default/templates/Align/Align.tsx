import { DynamicProps } from "solid-js/web"
import { Show } from ".."
import style from "./Align.module.css"

import { type JSX, type Component, splitProps, ValidComponent } from "solid-js"

interface Align extends Omit<JSX.HTMLAttributes<HTMLElement>, "children"> {
  children: ({
    Before,
    Children,
    After,
  }: {
    Before: Component<JSX.HTMLAttributes<DynamicProps<"span">>>
    Children: Component<JSX.HTMLAttributes<DynamicProps<"div">>>
    After: Component<JSX.HTMLAttributes<DynamicProps<"span">>>
  }) => JSX.Element
}

const Align: Component<Align> = (props) => {
  const [local, others] = splitProps(props, ["class", "classList", "children"])

  const CreateElement =
    <T extends ValidComponent>(
      component: T,
      className: string,
    ): Component<JSX.HTMLAttributes<DynamicProps<T>>> =>
    (props) => {
      const [local, others] = splitProps(props, ["class", "classList"])

      return (
        <Show
          component={component}
          class={className}
          classList={{
            ...local.classList,
            [`${local.class}`]: !!local.class,
          }}
          {...others}
        />
      )
    }

  return (
    <article
      class={style.Align}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,
      }}
      {...others}
    >
      {local.children({
        Before: CreateElement("span", style.Align__before),
        Children: CreateElement("div", style.Align__children),
        After: CreateElement("span", style.Align__after),
      })}
    </article>
  )
}

export default Align

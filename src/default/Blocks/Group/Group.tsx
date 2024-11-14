import style from "./Group.module.css"
import { Show } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"
import { Footer, Header } from "./Fonts"

interface Group extends JSX.HTMLAttributes<HTMLElement> {
  /**
   *todo Рекомендация: Используйте компонент: Group.Header
   */
  header?: JSX.Element
  /**
   *todo Рекомендация: Используйте компонент: Group.Footer
   */
  footer?: JSX.Element
}

interface ComponentGroup extends Component<Group> {
  Header: typeof Header
  Footer: typeof Footer
}

const Group: ComponentGroup = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "header",
    "footer",
  ])

  return (
    <section
      class={style.Group}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      <Show when={!!local.header} native>
        {local.header}
      </Show>
      <div class={style.Group__in}>{local.children}</div>
      <Show when={!!local.footer} native>
        {local.footer}
      </Show>
    </section>
  )
}

Group.Header = Header
Group.Footer = Footer

export default Group

import { DynamicProps } from "solid-js/web"
import { Show, Flex } from "ui"
import style from "./Align.module.css"

import { type JSX, type Component, splitProps, ValidComponent } from "solid-js"

interface CreateElement<T extends ValidComponent>
  extends JSX.HTMLAttributes<DynamicProps<T>> {
  when?: boolean
}

interface Align
  extends Omit<JSX.HTMLAttributes<DynamicProps<"article">>, "children"> {
  children: ({
    Before,
    Children,
    After,
  }: {
    Before: Component<CreateElement<"span">>
    Children: Component<CreateElement<"div">>
    After: Component<CreateElement<"span">>
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
    <Flex
      component={"article"}
      alignItems={"center"}
      justifyContent={"center"}
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
    </Flex>
  )
}

export default Align

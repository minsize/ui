import { styles } from "./styles"
import { CellList } from "./addons"
import { SubTitle, Title } from "./Fonts"

import {
  type HTMLAttributes,
  Align,
  Events,
  Flex,
  Separator,
  Show,
  usePlatform,
  useStyle,
} from "ui"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Cell extends Omit<HTMLAttributes<DynamicProps<"article">>, "title"> {
  /**
   * Элемент, который будет отображаться перед основным содержимым ячейки.
   */
  before?: JSX.Element
  /**
   * Элемент, который будет отображаться после основного содержимого ячейки.
   */
  after?: JSX.Element
  /**
   * Заголовок ячейки.
   * Рекомендуем использовать компонент: `Cell.Title`
   */
  children?: JSX.Element
  /**
   * Дополнительный текст (подзаголовок), который будет отображаться под основным текстом ячейки.
   *
   * Рекомендуем использовать компонент: `Cell.SubTitle`
   *
   * @deprecated
   */
  subtitle?: JSX.Element
  /**
   * Указывает, должен ли быть отображен разделитель под ячейкой.
   */
  separator?: boolean
  /**
   * Указывает, является ли ячейка неактивной.
   */
  disabled?: boolean
  /**
   * Указывает, должна ли ячейка быть выделена (активна).
   */
  selected?: boolean
  /**
   * !НЕ ГОТОВ
   * Управляет видимостью иконки шеврона `›`
   *
   * - `auto` - добавляет шеврон справа только для платформы `ios`;
   * - `always` - всегда показывает шеврон.
   */
  expandable?: "auto" | "always"
}

type ComponentCell = Component<Cell> & {
  List: typeof CellList
  Title: typeof Title
  SubTitle: typeof SubTitle
}

const Cell: ComponentCell = (props) => {
  const style = useStyle(styles, props.platform)
  const platform = usePlatform(props.platform)

  const merged = mergeProps({ separator: true }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "before",
    "after",
    "children",
    "subtitle",
    "separator",
    "selected",
    "platform",
  ])

  const CellSeparator: Component<{ when: boolean }> = (props) => (
    <Show when={props.when && local.separator}>
      <Separator
        class={style.Cell__separator}
        color={"secondary"}
        size={"full"}
      />
    </Show>
  )

  return (
    <Events
      class={style.Cell}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,

        [style[`Cell--selected`]]: local.selected,
      }}
      {...others}
    >
      <Align component={"article"} class={style.Cell__content}>
        <Align.Before when={!!local.before}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            component={"span"}
            class={style.Cell__before}
          >
            {local.before}
          </Flex>
        </Align.Before>

        <Align.Children class={style.Cell__in}>
          <Show
            component={"div"}
            class={style.Cell__content}
            children={local.children}
          />
          <Align.After when={!!local.after}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              component={"span"}
              class={style.Cell__after}
            >
              {local.after}
            </Flex>
          </Align.After>
          <CellSeparator when={["iOS", "macOS"].indexOf(platform()) !== -1} />
        </Align.Children>
      </Align>
      <CellSeparator
        when={["android", "windows", "others"].indexOf(platform()) !== -1}
      />
      <span class={style.Cell__background} />
    </Events>
  )
}

Cell.List = CellList
Cell.Title = Title
Cell.SubTitle = SubTitle

export default Cell

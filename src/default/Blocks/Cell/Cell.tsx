import { styles, generateTypography } from "./styles"
import {
  After,
  Before,
  CellList,
  Container,
  Content,
  Separator,
} from "./addons"

/* UI */
import { type HTMLAttributes } from "@ui/Types"

import Flex from "@src/default/Blocks/Flex/Flex"

import Events from "@src/default/Templates/Events/Events"
import Align from "@src/default/Templates/Align/Align"
import Show from "@src/default/Templates/Show/Show"

import usePlatform from "@src/default/utils/usePlatform"
import useStyle from "@src/default/utils/useStyle"
import TextContext from "@src/default/Templates/Text/context"
/* UI */

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"
import { CellStore } from "./context"

interface Cell extends Omit<HTMLAttributes<DynamicProps<"article">>, "title"> {
  /**
   * Заголовок ячейки.
   * Рекомендуем использовать компонент: `Title`
   */
  children?: JSX.Element
  /**
   * Дополнительный текст (подзаголовок), который будет отображаться под основным текстом ячейки.
   *
   * Рекомендуем использовать компонент: `SubTitle`
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
  Container: typeof Container
  Content: typeof Content
  Before: typeof Before
  After: typeof After
}

const Cell: ComponentCell = (props) => {
  const style = useStyle(styles, props.platform)
  const platform = usePlatform(props.platform)

  const merged = mergeProps({ separator: true }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "subtitle",
    "separator",
    "selected",
    "platform",
  ])

  return (
    <TextContext.Provider
      value={generateTypography({
        title: {
          class: style["Cell__title"],
        },
        subTitle: {
          class: style["Cell__subtitle"],
        },
      })}
    >
      <CellStore.Provider
        value={{
          getPlatform: platform,
          isSeparator: () => local.separator,
          getStyle: () => ({
            container: style.Cell__container,
            content: style.Cell__content,
            separator: style.Cell__separator,
            before: style.Cell__before,
            after: style.Cell__after,
          }),
        }}
      >
        <Events
          class={style.Cell}
          classList={{
            ...local.classList,
            [`${local.class}`]: !!local.class,

            [style[`Cell--selected`]]: local.selected,
          }}
          {...others}
        >
          <Align component={"article"} class={style.Cell__in}>
            {local.children}
          </Align>
          <Separator
            when={
              ["android", "windows", "others"].indexOf(platform()) !== -1 &&
              local.separator
            }
          />
          <span class={style.Cell__background} />
        </Events>
      </CellStore.Provider>
    </TextContext.Provider>
  )
}

Cell.Before = Before
Cell.List = CellList
Cell.Container = Container
Cell.Content = Content
Cell.After = After

export default Cell

import { styles, generateTypography } from "./styles"
import { CellList, Separator } from "./addons"

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
          getStyleContainer: () => style.Cell__in,
          getStyleContent: () => style.Cell__content,
          getStyleSeparator: () => style.Cell__separator,
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
              <Separator
                when={
                  ["iOS", "macOS"].indexOf(platform()) !== -1 && local.separator
                }
              />
            </Align.Children>
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

Cell.List = CellList

export default Cell

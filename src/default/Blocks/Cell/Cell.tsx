import style from "./Cell.module.css"
import { CellList } from "./addons"

import { Align, Events, Show } from "root/src/default/templates"

import { type JSX, type Component, splitProps, mergeProps } from "solid-js"

interface Cell extends JSX.HTMLAttributes<HTMLElement> {
  before?: JSX.Element
  after?: JSX.Element
  description?: JSX.Element
  separator?: boolean
  disabled?: boolean

  /**
   * Если блок должен быть активным то указываем true
   */
  selected?: boolean
}

type ComponentCell = Component<Cell> & {
  List: typeof CellList
}

const Cell: ComponentCell = (props) => {
  const merged = mergeProps({ separator: true }, props)
  const [local, others] = splitProps(merged, [
    "class",
    "classList",
    "children",
    "before",
    "after",
    "description",
    "separator",
    "selected",
  ])

  return (
    <Events
      class={style.Cell}
      classList={{
        ...local.classList,
        [`${local.class}`]: !!local.class,

        [style[`Cell--separator`]]: local.separator,
        [style[`Cell--selected`]]: local.selected,
      }}
      {...others}
    >
      <Align class={style.Cell__content}>
        {({ Before, Children, After }) => (
          <>
            <Before class={style.Cell__before} children={local.before} />
            <Children class={style.Cell__in}>
              <div class={style.Cell__content}>
                <Show class={style.Cell__children} children={local.children} />
                <Show
                  class={style.Cell__description}
                  children={local.description}
                />
              </div>
              <After class={style.Cell__after} children={local.after} />
            </Children>
          </>
        )}
      </Align>
    </Events>
  )
}

Cell.List = CellList

export default Cell

const Example = () => {
  return (
    <Cell.List>
      <Cell>Павел Дуров</Cell>
      <Cell>Илон Маск</Cell>
      <Cell>Петя Камушкин</Cell>
    </Cell.List>
  )
}

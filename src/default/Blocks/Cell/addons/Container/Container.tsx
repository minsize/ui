import style from "./Container.module.css"
import Separator from "../Separator/Separator"
import { CellStore } from "../../context"

import Align from "@src/default/Templates/Align/Align"
import Show from "@src/default/Templates/Show/Show"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Container extends JSX.HTMLAttributes<DynamicProps<"div">> {}

const Container: Component<Container> = (props) => {
  const context = useContext(CellStore)

  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Align.Children
      class={style.Container}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,

        [`${context.getStyleContainer()}`]: true,
      }}
      {...others}
    >
      <Show
        component={"div"}
        class={context.getStyleContent()}
        children={local.children}
      />
      <Separator
        when={
          ["iOS", "macOS"].indexOf(context.getPlatform()) !== -1 &&
          context.isSeparator()
        }
      />
    </Align.Children>
  )
}

export default Container
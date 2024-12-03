import style from "./Before.module.css"
import { CellStore } from "../../context"

import Align from "@src/default/Templates/Align/Align"
import Flex from "@src/default/Blocks/Flex/Flex"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface Before extends JSX.HTMLAttributes<DynamicProps<"span">> {}

const Before: Component<Before> = (props) => {
  const context = useContext(CellStore)

  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  console.log({ f: context.getStyle() })

  return (
    <Align.Before when={!!local.children}>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        component={"span"}
        class={context.getStyle().before}
        classList={{
          [`${local.class}`]: !!local.class,
          ...local.classList,
        }}
        {...others}
      >
        {local.children}
      </Flex>
    </Align.Before>
  )
}

export default Before

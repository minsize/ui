import style from "./Before.module.css"
import { CellStore } from "../../context"

import Align from "@src/default/Templates/Align/Align"
import Flex from "@src/default/Blocks/Flex/Flex"
import GapContext from "@src/default/Templates/Gap/context"
import generateGap from "@src/default/utils/generateGap"

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
        <GapContext.Provider
          value={generateGap(
            {
              count: {
                iOS: "8px",
                android: "16px",
                macOS: "8px",
                windows: "12px",
                others: "10px",
              },
            },
            context.getPlatform,
          )}
        >
          {local.children}
        </GapContext.Provider>
      </Flex>
    </Align.Before>
  )
}

export default Before

import style from "./WriteBar.module.css"
import { Field, Icon } from "./addons"
import { Flex } from "ui"

import { type JSX, type Component, mergeProps, splitProps } from "solid-js"
import { type DynamicProps } from "solid-js/web"

interface WriteBar extends JSX.HTMLAttributes<DynamicProps<"div">> {}

type ComponentWriteBar = Component<WriteBar> & {
  Field: typeof Field
  Icon: typeof Icon
}

const WriteBar: ComponentWriteBar = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  return (
    <Flex
      component={"div"}
      alignItems={"end"}
      class={style.WriteBar}
      classList={{
        [`${local.class}`]: !!local.class,
        ...local.classList,
      }}
      {...others}
    >
      {local.children}
    </Flex>
  )
}

WriteBar.Field = Field
WriteBar.Icon = Icon

export default WriteBar
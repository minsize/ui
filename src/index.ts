/* Templates */
export { default as Align } from "./default/Templates/Align/Align"
export { default as Show } from "./default/Templates/Show/Show"
export {
  default as Events,
  type IEvents,
} from "./default/Templates/Events/Events"
export {
  default as Touch,
  type GestureEvent,
} from "./default/Templates/Touch/Touch"
export { default as Ratio } from "./default/Templates/Ratio/Ratio"
export { default as TextContext } from "./default/Templates/Text/context"
export {
  default as Text,
  type Text as TypeText,
} from "./default/Templates/Text/Text"
export { default as Around } from "./default/Templates/Around/Around"
export { default as Gap } from "./default/Templates/Gap/Gap"
export { default as GapContext } from "./default/Templates/Gap/context"
export { default as Drag } from "./default/Templates/Drag/Drag"

/* Typography */
export { default as Title } from "./default/Typography/Title/Title"
export { default as SubTitle } from "./default/Typography/SubTitle/SubTitle"

export { default as Panel } from "./default/Panel/Panel"
export { default as Path } from "./default/Path/Path"
export { default as Root } from "./default/Root/Root"
export { default as View } from "./default/View/View"

export { default as Plug } from "./default/Blocks/Plug/Plug"

/* Colors */
export { default as Picker } from "./default/Color/Picker/Picker"
export { default as Grid } from "./default/Color/Grid/Grid"
export { default as Hue } from "./default/Color/Hue/Hue"

/* Blocks */
export { default as Spinner } from "./default/Blocks/Spinner/Spinner"
export { default as Image } from "./default/Blocks/Image/Image"
export { default as Badge } from "./default/Blocks/Badge/Badge"
export { default as Cell } from "./default/Blocks/Cell/Cell"
export { default as Link } from "./default/Blocks/Link/Link"
export { default as Accordion } from "./default/Blocks/Accordion/Accordion"
export { default as Group } from "./default/Blocks/Group/Group"
export {
  default as Flex,
  type Flex as TypeFlex,
} from "./default/Blocks/Flex/Flex"
export { default as Button } from "./default/Blocks/Button/Button"
export { default as Field } from "./default/Blocks/Field/Field"
export { default as WriteBar } from "./default/Blocks/WriteBar/WriteBar"
export { type ITextarea } from "./default/Blocks/Field/addons"
export { default as Separator } from "./default/Blocks/Separator/Separator"

/* Inputs */
export { default as Radio } from "./default/Forms/Radio/Radio"
export { default as CheckBox } from "./default/Forms/CheckBox/CheckBox"
export { default as Select } from "./default/Forms/Select/Select"
export { default as Input } from "./default/Forms/Input/Input"

/* Icons */
export { default as IconCheck } from "./default/Icons/Check.svg"
export { default as IconChevron } from "./default/Icons/Chevron/Chevron"

/* Types */
export { type HTMLAttributes } from "./Types/HTMLAttributes"
export { type Platform } from "./Types/Platform"
export { type TextProps } from "./Types/TextProps"
export { type TextObject } from "./Types/TextObject"
export { type Drags } from "./Types/Drags"

/* Utils */
export { default as useClickOutside } from "./default/utils/useClickOutside"
export { default as classList } from "./default/utils/classList"
export { default as toArray } from "./default/utils/toArray"
export { default as usePlatform } from "./default/utils/usePlatform"
export {
  default as createStyle,
  mergeObjectsWithSum,
} from "./default/utils/createStyle"
export { default as useStyle } from "./default/utils/useStyle"
export { default as useComputedBlockStyles } from "./default/utils/useComputedBlockStyles"
export { default as renameSize } from "./default/utils/renameSize"
export { default as generateGap } from "./default/utils/generateGap"

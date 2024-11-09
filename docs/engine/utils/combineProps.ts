import { type SplitProps, mergeProps, splitProps } from "solid-js"

const combineProps = <
  T extends Record<any, any>,
  K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]],
  M extends unknown[],
>(
  props: T,
  split: K,
  merged: M,
): SplitProps<T, K> => {
  let _props = props
  if (merged) _props = mergeProps(merged, _props)

  console.log(split, merged)
  const [local, others] = splitProps(_props, split)

  return splitProps(_props, split)
}

export default combineProps

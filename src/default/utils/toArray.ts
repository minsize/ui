import { ChildrenReturn, Component, JSX } from "solid-js"

type ArrayJSX = { nav: string; component: Component }[]

const toArray = (children: ChildrenReturn): ArrayJSX => {
  const child = children()
  if (Array.isArray(child)) {
    return child as unknown as ArrayJSX
  }
  return [child] as unknown as ArrayJSX
}

export default toArray

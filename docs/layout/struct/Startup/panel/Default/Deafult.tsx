import { type Component, type JSX, onMount } from "solid-js"

import { Panel } from "@src/index"
import { Content } from "./elements"

import { pages, replacePage } from "router"

interface Default extends JSX.HTMLAttributes<HTMLDivElement> {
  nav: string
}

const Default: Component<Default> = (props) => {
  onMount(() => {
    setTimeout(() => {
      replacePage({ pageId: pages.PROFILE, is_back: false })
    }, 1000)
  })

  return (
    <Panel fixed nav={props.nav}>
      <Content />
    </Panel>
  )
}

export default Default

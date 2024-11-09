import { type Component, type JSX, splitProps } from "solid-js"
import { Path, View } from "root/src"

import { panels, useRouterPanel } from "router"

import Default from "./panel/Default/Deafult"

interface Startup extends JSX.HTMLAttributes<HTMLDivElement> {
  nav: string
}

const Startup: Component<Startup> = (props) => {
  const [local, others] = splitProps(props, ["nav"])
  const activePanel = useRouterPanel(local.nav)

  return (
    <View nav={local.nav} activePanel={activePanel()} {...others}>
      <Path nav={panels.STARTUP} component={Default} />
    </View>
  )
}

export default Startup

import { type Component, type JSX, createSignal, ErrorBoundary } from "solid-js"
import { Route, Router } from "@solidjs/router"

import { Flex, Path } from "@src/index"

import { useRouter, views } from "router"

import { Root } from "components"

import Profile from "./struct/Profile/panel/Default/Default"

interface Layout extends JSX.HTMLAttributes<HTMLDivElement> {}

const Layout: Component<Layout> = (props) => {
  const activeView = useRouter("view")
  const [fc, inc] = createSignal(0)

  return (
    <Router root={Root}>
      <Route path={"/"} component={Profile} />
    </Router>
  )
}

/**
 * 
 * 
    <Flex>
      <Menu />
      <Root activeView={activeView()}>
        <Path nav={views.STARTUP} component={Startup} />
        <Path nav={views.PROFILE} component={Profile} />
        <Path nav={views.PROFILE_2} component={Profile} />
      </Root>
    </Flex>
 */

export default Layout

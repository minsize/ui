import { type Component, type JSX, onMount, splitProps } from "solid-js"
import { Path, View } from "@src/index"

import { panels, useRouterPanel } from "router"

import Default from "./panel/Default/Default"

interface Profile extends JSX.HTMLAttributes<HTMLDivElement> {
  nav: string
}

const Profile: Component<Profile> = (props) => {
  const [local, others] = splitProps(props, ["nav"])
  const activePanel = useRouterPanel(local.nav)

  return (
    <View nav={local.nav} activePanel={activePanel()} {...others}>
      <Path nav={panels.PROFILE} component={Default} />
      <Path nav={panels.PROFILE_2} component={Default} />
      <Path nav={panels.PROFILE_3} component={Default} />
    </View>
  )
}

export default Profile

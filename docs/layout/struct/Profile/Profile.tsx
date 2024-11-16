import { type Component, type JSX, onMount, splitProps } from "solid-js"
import { Path, View } from "ui"

import { panels, useRouterPanel } from "router"

import Default from "./panel/Default/Default"

interface Profile extends JSX.HTMLAttributes<HTMLDivElement> {
  nav: string
}

const Profile: Component<Profile> = (props) => {
  const [local, others] = splitProps(props, ["nav"])
  const activePanel = useRouterPanel(local.nav)

  onMount(() => {
    console.log({ f: activePanel() })
  })

  return (
    <View nav={local.nav} activePanel={activePanel()} {...others}>
      <Path nav={panels.PROFILE} component={Default} />
    </View>
  )
}

export default Profile

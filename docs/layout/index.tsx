import { type Component, type JSX, createSignal, ErrorBoundary } from "solid-js"
import { Path, Root } from "root/src"

import { useRouter, views } from "router"
import Modal from "./modal"
import Popout from "./popout"

import Startup from "./struct/Startup/Startup"
import Profile from "./struct/Profile/Profile"

interface Layout extends JSX.HTMLAttributes<HTMLDivElement> {}

const Layout: Component<Layout> = (props) => {
  const activeView = useRouter("view")
  const [fc, inc] = createSignal(0)

  return (
    <ErrorBoundary
      fallback={(err, reset) => {
        setTimeout(() => {
          if (fc() > 10) window.location.reload()
          reset()
          inc((e) => e + 1)
        }, 100)
        return <></>
      }}
    >
      <Root modal={<Modal />} popout={<Popout />} activeView={activeView()}>
        <Path nav={views.STARTUP} component={Startup} />
        <Path nav={views.PROFILE} component={Profile} />
      </Root>
    </ErrorBoundary>
  )
}

export default Layout

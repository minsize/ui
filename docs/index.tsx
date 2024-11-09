import Layout from "layout"
import { render } from "solid-js/web"
import "../src/index.css"

import "./styles.css"
import { pages, Route, routerStruct } from "router"

document.addEventListener("contextmenu", (e) => e.preventDefault())
document.addEventListener("touchstart", (e) => {
  e.preventDefault()
  e.stopPropagation()
})

render(
  () => (
    <Route pathname={"/static"} startPage={pages.STARTUP} struct={routerStruct}>
      <Layout />
    </Route>
  ),
  document.body,
)

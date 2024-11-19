// import { render } from "solid-js/web"
// import { Button } from "ui"
// import "../src/index.css"

// render(
//   () => (
//     <Button>
//       <Button.Icon>Icon</Button.Icon>
//       <Button.Container>
//         <Button.Title>Test</Button.Title>
//         <Button.Title>Description</Button.Title>
//       </Button.Container>
//       <Button.Icon>Icon</Button.Icon>
//     </Button>
//   ),
//   document.body,
// )

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

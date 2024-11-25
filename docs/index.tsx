// import { render } from "solid-js/web"
// // import { Button, Title } from "ui"
// import Button from "../src/default/Blocks/Button/Button"
// import "../src/index.css"

// render(
//   () => (
//     <Button>
//       <Button.Icon>Icon</Button.Icon>
//       <Button.Container>
//         {/* <Title>Test</Title>
//         <Title>Description</Title> */}
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

import { type Component, type JSX } from "solid-js"
import { Plug, Spinner } from "ui"
import { IconElumTeam } from "source"

interface Content extends JSX.HTMLAttributes<HTMLDivElement> {}

const Content: Component<Content> = (props) => {
  return (
    <Plug mode={"lower"} icon={<Spinner size={"large"} color={"secondary"} />}>
      <IconElumTeam color={"var(--text_color)"} width={"76px"} />
    </Plug>
  )
}

export default Content

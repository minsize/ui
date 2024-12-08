import { createSignal, Show, type Component, type JSX } from "solid-js"

import { Panel, Accordion, Button, Cell, Title } from "@src/index"
import { RGBtoHSV } from "@minsize/utils"
import { pages, panels, pushPage, useRouter, views } from "router"
import { Flex } from "@src/index"

interface Default extends JSX.HTMLAttributes<HTMLDivElement> {}

const Default: Component<Default> = (props) => {
  const activeView = useRouter("view")
  const [selected, setSelected] = createSignal(1)

  const [checked, setChecked] = createSignal(false)
  const [hue, setHue] = createSignal(0)
  const [color, setColor] = createSignal<[number, number, number]>([0, 0, 0])

  const handlerGrid = (color: [number, number, number]) => {
    const [h] = RGBtoHSV(color[0], color[1], color[2])
    setHue(h)
    setColor(color)
  }

  // onMount(() => console.log("mount", props.nav))
  // onCleanup(() => console.log("cleanup", props.nav))

  return (
    <Panel nav={""}>
      <Accordion.List>
        <Accordion>
          <Accordion.Summary>
            <Accordion.Summary.Container>
              <Title>Tasks</Title>
            </Accordion.Summary.Container>
          </Accordion.Summary>
          <Accordion.Content>
            <Cell.List>
              <Cell
                before={
                  <span
                    style={{
                      display: "flex",
                      width: "28px",
                      height: "28px",
                    }}
                  />
                }
              >
                <Title>Role</Title>
              </Cell>
              <Cell
                before={
                  <span
                    style={{
                      display: "flex",
                      width: "28px",
                      height: "28px",
                    }}
                  />
                }
              >
                <Title>Role 2</Title>
              </Cell>
            </Cell.List>
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary>
            <Accordion.Summary.Container>
              <Title>Права голосового канала</Title>
            </Accordion.Summary.Container>
          </Accordion.Summary>
          <Accordion.Content>
            <Accordion.Summary.Container>
              <Title>Какой-тот оооочень длинный контент.</Title>
            </Accordion.Summary.Container>
          </Accordion.Content>
        </Accordion>
      </Accordion.List>

      <Button>
        <Button.Icon>ICON</Button.Icon>
        <Button.Container>
          <Title>Test</Title>
        </Button.Container>
        <Button.Icon>ICON</Button.Icon>
      </Button>

      {/* <Spinner color={"secondary"} size={"regular"} /> */}
      <Show when={activeView() === views.PROFILE_2}>
        <Button
          onClick={() => {
            pushPage({
              pageId:
                props.nav === panels.PROFILE_2
                  ? pages.PROFILE_3
                  : pages.PROFILE_2,
            })
          }}
        >
          <Button.Container>
            <Title>
              {props.nav === panels.PROFILE_2
                ? pages.PROFILE_3
                : pages.PROFILE_2}
            </Title>
            {/* <Button.SubTitle>PANELS</Button.SubTitle> */}
          </Button.Container>
        </Button>
      </Show>
      <Button
        onClick={() => {
          pushPage({
            pageId:
              props.nav === panels.PROFILE ? pages.PROFILE_2 : pages.PROFILE,
          })
        }}
      >
        <Button.Container>
          <Title>
            {props.nav === panels.PROFILE ? pages.PROFILE_2 : pages.PROFILE}
          </Title>
          {/* <Button.SubTitle>VIEWS</Button.SubTitle> */}
        </Button.Container>
      </Button>
    </Panel>
  )
}

export default Default

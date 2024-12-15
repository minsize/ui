import style from "./Root.module.css"
import { Accordion, Badge, Button, Cell, Drag, Flex, Title } from "@src/index"
import { SubTitle } from "@src/index"

import {
  type JSX,
  type Component,
  mergeProps,
  splitProps,
  For,
  createSignal,
} from "solid-js"

interface Root extends JSX.HTMLAttributes<HTMLDivElement> {}

const Tabs: {
  key: string
  label: string
  tabs: { key: string; label: string }[]
}[] = [
  {
    key: "Manage Account",
    label: "Manage Account",
    tabs: [
      {
        key: "Members",
        label: "Members",
      },
      {
        key: "Billing",
        label: "Billing",
      },
    ],
  },
  {
    key: "Task",
    label: "Task",
    tabs: [
      {
        key: "Roles",
        label: "Roles",
      },
      {
        key: "List",
        label: "List",
      },
      {
        key: "Items",
        label: "Items",
      },
      {
        key: "Promo",
        label: "Promo",
      },
      {
        key: "Group",
        label: "Group",
      },
      {
        key: "Statistics",
        label: "Statistics",
      },
      {
        key: "Integrations",
        label: "Integrations",
      },
      {
        key: "CPA",
        label: "CPA",
      },
    ],
  },
]

const Root: Component<Root> = (props) => {
  const merged = mergeProps({}, props)
  const [local, others] = splitProps(merged, ["class", "classList", "children"])

  const [drop, setDrop] = createSignal(
    Array.from({ length: 10 }).map((x, i) => ({
      key: String(i + 1),
      name: i + 1,
    })),
  )

  const onEnd = (to: string, from: string) => {
    const _list = [...drop()]

    const toIndex = drop().findIndex((x) => x.key === to)
    const fromIndex = drop().findIndex((x) => x.key === from)

    _list.splice(fromIndex, 1)
    _list.splice(toIndex, 0, drop()[fromIndex])

    setDrop(_list)
  }

  return (
    <Flex class={style.Root}>
      <div class={style.Menu}>
        <Drag.Drop safe onEnd={onEnd}>
          <For each={drop()}>
            {(item, index) => (
              <Drag key={item.key} position={index()} data-index={index()}>
                <Cell>
                  <Cell.Before>
                    <Drag.Touch>
                      <span
                        style={{
                          height: "28px",
                          width: "28px",
                          background: "#0D0E0F",
                          "border-radius": "8px",
                          position: "relative",
                          display: "block",
                        }}
                      />
                    </Drag.Touch>
                  </Cell.Before>
                  <Cell.Container>
                    <Cell.Content>
                      <Title>Drag {item.name}</Title>
                    </Cell.Content>
                    <Cell.After>After</Cell.After>
                  </Cell.Container>
                </Cell>
              </Drag>
            )}
          </For>
        </Drag.Drop>
      </div>
      <div class={style.Root__in}>{local.children}</div>
    </Flex>
  )
}

/*
 <For each={Tabs}>
          {(tab, index) => (
            <Accordion data-index={index()}>
              <Accordion.Summary>
                <Accordion.Summary.Before>
                  <Accordion.Summary.Arrow />
                  <span
                    style={{
                      height: "28px",
                      width: "28px",
                      background: "#0D0E0F",
                      "border-radius": "8px",
                    }}
                  />
                </Accordion.Summary.Before>
                <Accordion.Summary.Container>
                  <Accordion.Summary.Content>
                    <Title>{tab.label}</Title>
                    <SubTitle>{tab.label}</SubTitle>
                  </Accordion.Summary.Content>
                  <Accordion.Summary.After>
                    <Badge size={"small"}>
                      <Badge.Container>
                        <Title>99+</Title>
                      </Badge.Container>
                    </Badge>
                  </Accordion.Summary.After>
                </Accordion.Summary.Container>
              </Accordion.Summary>
              <Accordion.Content>
                <For each={tab.tabs}>
                  {(tab, index) => (
                    <Flex>
                      <span
                        style={{
                          height: "28px",
                          width: "56px",
                        }}
                      />
                      <Cell
                        separator={true}
                        data-index={index()}
                        onClick={() => {}}
                      >
                        <Cell.Before>
                          <span
                            style={{
                              height: "28px",
                              width: "28px",
                              background: "#0D0E0F",
                              "border-radius": "8px",
                            }}
                          />
                        </Cell.Before>
                        <Cell.Container>
                          <Cell.Content>
                            <Title>{tab.label}</Title>
                          </Cell.Content>
                          <Cell.After>After</Cell.After>
                        </Cell.Container>
                      </Cell>
                    </Flex>
                  )}
                </For>
              </Accordion.Content>
            </Accordion>
          )}
        </For>
         <Button.Group>
          <Button.Group.Container justifyContent={"start"}>
            <Button>
              <Button.Container>
                <Title overflow nowrap>
                  Test Title
                </Title>
                <SubTitle overflow nowrap>
                  Test SubTitle
                </SubTitle>
              </Button.Container>
            </Button>
            <Button>
              <Button.Container>
                <Title nowrap>Test Title</Title>
                <SubTitle nowrap>Test SubTitle</SubTitle>
              </Button.Container>
            </Button>
          </Button.Group.Container>
          <Button.Group.Container>
            <Button>
              <Button.Container>
                <Title nowrap>Test Title</Title>
                <SubTitle nowrap>Test SubTitle</SubTitle>
              </Button.Container>
            </Button>

            <Button>
              <Button.Container>
                <Title nowrap>Test Title</Title>
                <SubTitle nowrap>Test SubTitle</SubTitle>
              </Button.Container>
            </Button>
          </Button.Group.Container>
          <Button.Group.Container justifyContent={"end"}>
            <Button>
              <Button.Container>
                <Title nowrap>Test Title</Title>
                <SubTitle nowrap>Test SubTitle</SubTitle>
              </Button.Container>
            </Button>

            <Button>
              <Button.Container>
                <Title nowrap>Test Title</Title>
                <SubTitle nowrap>Test SubTitle</SubTitle>
              </Button.Container>
            </Button>
          </Button.Group.Container>
        </Button.Group> 

*/

export default Root

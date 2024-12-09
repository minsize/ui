import style from "./Root.module.css"
import { Accordion, Badge, Button, Cell, Flex, Title } from "@src/index"
import { SubTitle } from "@src/index"

import { type JSX, type Component, mergeProps, splitProps, For } from "solid-js"

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

  return (
    <Flex class={style.Root}>
      <div class={style.Menu}>
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
                          width: "68px",
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
      </div>
      <div class={style.Root__in}>{local.children}</div>
    </Flex>
  )
}

export default Root

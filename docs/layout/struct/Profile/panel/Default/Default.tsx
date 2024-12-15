import { For, type Component, type JSX } from "solid-js"

import { Panel, Group, Title, Cell, Badge, Button, Flex, Gap } from "@src/index"
interface Default extends JSX.HTMLAttributes<HTMLDivElement> {}

const Roles = [
  {
    name: "creator",
    count: 1,
    color: "red",
  },
  {
    name: "admin",
    count: 1,
    color: "orange",
  },
  {
    name: "team",
    count: 1,
    color: "blue",
  },
  {
    name: "support",
    count: 1,
    color: "green",
  },
]

const Default: Component<Default> = (props) => {
  return (
    <Panel nav={""}>
      <Flex>
        <Flex style={{ width: "30%" }} direction={"column"}>
          <Group>
            <Group.Container>
              <Title>Search</Title>
            </Group.Container>
          </Group>
          <Group>
            <Group.Container>
              <For each={Roles}>
                {(role, index) => (
                  <Cell data-index={index()}>
                    <Cell.Before>
                      <Gap>
                        <Flex
                          style={{
                            width: "24px",
                            height: "24px",
                          }}
                        >
                          |
                        </Flex>
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            background: role.color,
                            "border-radius": "14px",
                          }}
                        />
                      </Gap>
                    </Cell.Before>
                    <Cell.Container>
                      <Cell.Content>
                        <Title>{role.name}</Title>
                      </Cell.Content>
                      <Cell.After>
                        <span>Icon</span>
                        <span>1</span>
                      </Cell.After>
                    </Cell.Container>
                  </Cell>
                )}
              </For>
              <Button.Group>
                <Button.Group.Container>
                  <Button stretched size={"medium"}>
                    <Button.Container>+</Button.Container>
                  </Button>
                </Button.Group.Container>
              </Button.Group>
            </Group.Container>
          </Group>
        </Flex>
        <Group>
          <Group.Container>
            <Title>Search</Title>
          </Group.Container>
        </Group>
      </Flex>
    </Panel>
  )
}

export default Default

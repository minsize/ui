import style from "./Root.module.css"
import { Accordion, Cell, Flex, Title } from "@src/index"

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
              <Accordion.Summary
                before={
                  <>
                    <Accordion.Summary.Arrow />
                    <span
                      style={{
                        height: "28px",
                        width: "28px",
                        background: "#0D0E0F",
                        "border-radius": "8px",
                      }}
                    />
                  </>
                }
              >
                <Title>{tab.label}</Title>
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
                        style={{ width: "100%" }}
                        separator={false}
                        data-index={index()}
                        before={
                          <>
                            <span
                              style={{
                                height: "28px",
                                width: "28px",
                                background: "#0D0E0F",
                                "border-radius": "8px",
                              }}
                            />
                          </>
                        }
                      >
                        <Title>{tab.label}</Title>
                      </Cell>
                    </Flex>
                  )}
                </For>
              </Accordion.Content>
            </Accordion>
          )}
        </For>
      </div>
      <div class={style.Root__in}>{local.children}</div>
    </Flex>
  )
}

export default Root

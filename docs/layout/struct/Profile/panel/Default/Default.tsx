import { createSignal, For, type Component, type JSX } from "solid-js"

import {
  Cell,
  CheckBox,
  Grid,
  Hue,
  Panel,
  Picker,
  Radio,
  Image,
  Spinner,
  Badge,
  Accordion,
  Group,
  Plug,
  Flex,
} from "root/src"
import Swipe from "root/src/default/templates/Swipe/Swipe"
import { RGBtoHSV } from "@minsize/utils"
import { IconElumTeam } from "source"

interface Default extends JSX.HTMLAttributes<HTMLDivElement> {
  nav: string
}

const Avatar = (props) => {
  return (
    <img
      style={{
        "border-radius": "13px",
        display: "block",
      }}
      width={"36px"}
      height={"36px"}
      src={
        props.src ||
        "https://sun9-74.userapi.com/impg/fqRztNCdjYo4bvce_SnEznV8dGtj7Q_Np1afog/F8VO347qORI.jpg?size=1001x1001&quality=95&sign=921bd225fb93832d38ac9f9bf4791a31&type=album"
      }
    />
  )
}

const apps = [
  {
    id: 1,
    title: "Empire Game",
    photo:
      "https://cdn4.cdn-telegram.org/file/cMSW02gRBLm7Bol7Ze-vC-WfmPiyBKP24vz4ENn_NQUUFV1kivHaAynRmPnxq2yMqp6RXczXZNrvMOSLAswH3zb_zbnopN-DOIeKXbLCfLvmAbzjNl1YiHRhbRitTovpeAR2wsoewXR_EZ6dVfyfBAsqGw0fpUekGA1VSD3t5b0-rWg4R4tu422IUUubFp7JjfmMQ8eqMDEEx_LxLK3H5dCZZ2r8cRKVS-Tcs_8TkUZij5IhL3f0Qgkroyudf8w794D4UFyv5dNwbcA6RGmViCc-tx_U-tVWTeo_7m8jtty9QkE6WYHw_s7HHsKaJGWO9FqYnQlX08ycIkmxA_NmQA.jpg",
  },
  {
    id: 2,
    title: "Rating",
    photo:
      "https://cdn4.cdn-telegram.org/file/Kempoy13Ad73M-54V64lwQd91qT8chnASiCgtNAblsM9owtXf7VIEiGpWAL5knb8_1fNgLWvHorXefi0I_xxcq_fWZGVvgb1peQcTfPmMmMd3g7XD1jT6aL8IGtlLMzGdATIWEZBdsqYf4hNXGVZiaAG5m-LJwNlkMElk_X5JhQps4B5-CaM3h9sqSsqrjM1fWHTSWeKuOn3bTox87daMYqfnKSEmIDPYT5quqQJ0kJ9MKrRvPg9RqHcHgu72VTnllYNsf5jIYOyELGYgX-JmVEwJVOqAoSTjPcQ7d62wx0T4aBFqz1zvWo2eIwTkI1Qwk8sdnPNW27mx98gcyiTfw.jpg",
  },
]

const Default: Component<Default> = (props) => {
  const [selected, setSelected] = createSignal(1)

  const [checked, setChecked] = createSignal(false)
  const [hue, setHue] = createSignal(0)
  const [color, setColor] = createSignal<[number, number, number]>([0, 0, 0])

  const handlerGrid = (color: [number, number, number]) => {
    const [h] = RGBtoHSV(color[0], color[1], color[2])
    setHue(h)
    setColor(color)
  }

  return (
    <Panel nav={props.nav}>
      <Plug full>
        <Plug.Container>
          <Plug.Title>Title</Plug.Title>
          <Plug.SubTitle>SubTitle</Plug.SubTitle>
        </Plug.Container>
        <Plug.Icon>
          <IconElumTeam color={"white"} height={28} />
        </Plug.Icon>
        <Plug.Action>
          <button>Тут Кнопка</button>
        </Plug.Action>
      </Plug>

      {/* <Cell>
        <Cell.SubTitle>SubTitle</Cell.SubTitle>
        <Cell.Title>Title</Cell.Title>
      </Cell> */}

      <Group>
        <Group.Header>Test Header</Group.Header>
        <Group.Container>
          <Accordion>
            <Accordion.Summary>
              <Accordion.Summary.Title>
                Что такое безумие?
              </Accordion.Summary.Title>
              <Accordion.Summary.SubTitle>
                А почему бы и нет
              </Accordion.Summary.SubTitle>
            </Accordion.Summary>

            <Accordion.Content>
              <Accordion.Content.Title>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.Title>
              <Accordion.Content.SubTitle>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.SubTitle>
            </Accordion.Content>
          </Accordion>
        </Group.Container>
        <Group.Footer>Test Footer</Group.Footer>
      </Group>
      <Group>
        <Accordion.List
          onChange={(uId, status) => {
            console.log(uId, status)
          }}
        >
          <Accordion>
            <Accordion.Summary>
              <Accordion.Summary.Title>
                Что такое безумие?
              </Accordion.Summary.Title>
              <Accordion.Summary.SubTitle>
                А почему бы и нет
              </Accordion.Summary.SubTitle>
            </Accordion.Summary>

            <Accordion.Content>
              <Accordion.Content.Title>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.Title>
              <Accordion.Content.SubTitle>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.SubTitle>
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Summary>
              <Accordion.Summary.Title>
                Что такое безумие?
              </Accordion.Summary.Title>
              <Accordion.Summary.SubTitle>
                А почему бы и нет
              </Accordion.Summary.SubTitle>
            </Accordion.Summary>

            <Accordion.Content>
              <Accordion.Content.Title>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.Title>
              <Accordion.Content.SubTitle>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.SubTitle>
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Summary>
              <Accordion.Summary.Title>
                Что такое безумие?
              </Accordion.Summary.Title>
              <Accordion.Summary.SubTitle>
                А почему бы и нет
              </Accordion.Summary.SubTitle>
            </Accordion.Summary>

            <Accordion.Content>
              <Accordion.Content.Title>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.Title>
              <Accordion.Content.SubTitle>
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает А кто его знает А кто его знает
                А кто его знает А кто его знает
              </Accordion.Content.SubTitle>
            </Accordion.Content>
          </Accordion>
        </Accordion.List>
      </Group>
      <Image
        src={
          "https://sun9-74.userapi.com/impg/fqRztNCdjYo4bvce_SnEznV8dGtj7Q_Np1afog/F8VO347qORI.jpg?size=1001x1001&quality=95&sign=921bd225fb93832d38ac9f9bf4791a31&type=album"
        }
      >
        <Image.Overlay onClick={() => {}}>test</Image.Overlay>
        <Image.Badge>
          <Badge before={"before"} after={"after"}>
            What is it?
          </Badge>
        </Image.Badge>
      </Image>
      <Picker color={color()} accent={hue()} onChange={setColor} />
      <Grid color={color()} onChange={handlerGrid} />
      <Hue color={hue()} onChange={setHue} />
      <Cell
        before={
          <Radio
            checked={checked()}
            onChecked={(prev, next) => setChecked(next)}
          />
        }
      >
        Radio
      </Cell>
      <Cell
        before={
          <CheckBox
            checked={checked()}
            onChecked={(prev, next) => setChecked(next)}
          />
        }
      >
        CheckBox
      </Cell>
      <Spinner />
      <Cell.List>
        <For each={apps}>
          {(app, index) => (
            <Swipe
              data-index={index()}
              before={
                <div style={{ width: "50vw", display: "flex", height: "100%" }}>
                  <div
                    style={{
                      width: "25vw",
                      height: "100%",
                      background: "orange",
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{ width: "25vw", height: "100%", background: "red" }}
                  >
                    2
                  </div>
                </div>
              }
              after={
                <div style={{ width: "50vw", display: "flex", height: "100%" }}>
                  <div
                    style={{
                      width: "25vw",
                      height: "100%",
                      background: "orange",
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{ width: "25vw", height: "100%", background: "red" }}
                  >
                    2
                  </div>
                </div>
              }
              onClick={() => setSelected(app.id)}
            >
              <Cell
                selected={selected() === app.id}
                separator={false}
                before={<Avatar src={app.photo} />}
              >
                {app.title}
              </Cell>
            </Swipe>
          )}
        </For>
      </Cell.List>
    </Panel>
  )
}

export default Default

import {
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  type Component,
  type JSX,
} from "solid-js"

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
  Button,
  IconChevron,
  Select,
  Textarea,
  WriteBar,
  Separator,
  Field,
  Title,
} from "ui"
import Swipe from "root/src/default/templates/Swipe/Swipe"
import { RGBtoHSV } from "@minsize/utils"
import { pages, panels, pushPage, replacePage, useRouter, views } from "router"

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
    <Panel nav={props.nav}>
      <Accordion.List>
        <Accordion>
          <Accordion.Summary>Test</Accordion.Summary>
          <Accordion.Content>
            Какой-тот оооочень длинный контент.
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary>Test</Accordion.Summary>
          <Accordion.Content>
            Какой-тот оооочень длинный контент.
          </Accordion.Content>
        </Accordion>
      </Accordion.List>
      {/* <Separator /> */}
      <Accordion.List>
        <Accordion>
          <Accordion.Summary>Test</Accordion.Summary>
          <Accordion.Content>
            Какой-тот оооочень длинный контент.
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary>Test</Accordion.Summary>
          <Accordion.Content>
            Какой-тот оооочень длинный контент.
          </Accordion.Content>
        </Accordion>
      </Accordion.List>
      <WriteBar>
        <WriteBar.Icon>
          <IconChevron type={"left"} />
        </WriteBar.Icon>
        <WriteBar.Field>
          <WriteBar.Field.Textarea placeholder={"test"}>
            test
          </WriteBar.Field.Textarea>
        </WriteBar.Field>
        <WriteBar.Icon>
          <IconChevron type={"right"} />
        </WriteBar.Icon>
      </WriteBar>
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

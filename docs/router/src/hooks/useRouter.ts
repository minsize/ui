import { globalSignal } from "elum-state/solid"
import { MODAL_ATOM, POPOUT_ATOM, VIEW_ATOM, LAST_HISTORY_ATOM } from "../atom"
import { createEffect } from "solid-js"
import { backPage } from "../actions/backPage"
import { listener } from "@apiteam/twa-bridge/solid"

const atoms = {
  view: VIEW_ATOM,
  modal: MODAL_ATOM,
  popout: POPOUT_ATOM,
}

export const useRouter = (type: keyof typeof atoms) => {
  const [value] = globalSignal(atoms[type])

  createEffect(() => {
    if (type === "view") {
      const handleEvent = () => {
        backPage(1)
      }
      listener.on("back_button_pressed", handleEvent)
      /* Если подписаться и отправить go(-2) то сюда тоже придёт событие */
      window.addEventListener("popstate", handleEvent)
      return () => {
        listener.off("back_button_pressed", handleEvent)
        window.removeEventListener("popstate", handleEvent)
      }
    }
  })

  return () => value() || ""
}

export const useRouterPanel = (view: string) => {
  const [value] = globalSignal(LAST_HISTORY_ATOM)

  return () => value()[view] || ""
}

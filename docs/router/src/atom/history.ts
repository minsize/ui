import { atom } from "elum-state/solid"
import { type Params } from ".."

type View = {
  viewId: string
  panelId: string
  is_back: boolean
  /**
   * passed parameters
   */
  params?: Params
  /**
   * Open is ModalPage
   */
  modalId?: string
  popoutId?: string
}

export type HISTORY = {
  view: Record<string, View[]>
  history: View[]
}

const HISTORY_ATOM = atom<HISTORY>({
  key: "history_atom" + Math.random(),
  default: {
    view: {},
    history: [],
  },
})

export default HISTORY_ATOM

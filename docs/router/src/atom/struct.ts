import { atom } from "elum-state/solid"

type STRUCT = {
  viewId: string
  panels: Record<string, string>
}[]

const STRUCT_ATOM = atom<STRUCT>({
  key: "struct_atom",
  default: [],
})

export default STRUCT_ATOM

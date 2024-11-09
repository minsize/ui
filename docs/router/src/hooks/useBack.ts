import { globalSignal } from "elum-state/solid"
import { HISTORY_ATOM } from "../atom"

export const useBack = () => {
  const [value] = globalSignal(HISTORY_ATOM)

  return () => value().history.slice(-1)[0]?.is_back ?? false
}

export default useBack

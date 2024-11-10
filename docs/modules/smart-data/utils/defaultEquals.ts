import { SmartData } from "../types"

const defaultEquals = <T>(
  prev: SmartData<T>,
  next: SmartData<T>,
  equals?: (prev: T, next: T) => boolean,
) =>
  !equals ? prev?.update_at === next?.update_at : equals(prev?.data, next?.data)

export default defaultEquals

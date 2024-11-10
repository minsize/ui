import { type GlobalAtom, type Atom, type SmartData } from "../types"

import { atom } from "elum-state/solid"

/**
 * Create Atom
 */
const smartDataAtom = <T, OPTIONS>(
  opt: Atom<T, OPTIONS>,
): GlobalAtom<T, OPTIONS> => {
  return atom({
    key: opt.key,
    default: {
      default: opt.default,
      update_via: opt.update_via || 5_000,
      onRequested: opt.onRequested,
      cache: new Map<string, SmartData<T>>(),
      requests: new Map<string, boolean>(),
    },
  }) as unknown as GlobalAtom<T, OPTIONS>
}

export default smartDataAtom

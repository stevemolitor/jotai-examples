import { atom } from "jotai";
import { Cone, IDL } from "./types";
import { getIceCreamData, saveIceCreamData } from "./iceCreamDb";
import { isEqual } from "lodash";
import { atomWithDefault } from "jotai/utils";

// latest ice cream data loaded from server
export const iceCreamDbAtom = atomWithDefault<Promise<IDL> | IDL>(
  getIceCreamData // initialize with promise
);

// in memory copy of iceCream data - this will get out of sync with iceCreamDbAtom as the user makes edits.
export const iceCreamFormAtom = atom<Promise<IDL> | IDL | null>(null);

// ice cream atom that proxies from iceCreamClientAtom and iceCreamDbAtom as appropriate.
export const iceCreamAtom = atom(
  (get) => get(iceCreamFormAtom) ?? get(iceCreamDbAtom),
  (_get, set, iceCream: IDL) => {
    set(iceCreamFormAtom, iceCream);
  }
);

// return true if there are unsaved ice cream changes
export const isIceCreamDirtyAtom = atom(async (get) => {
  const iceCreamForm = await get(iceCreamFormAtom);
  const iceCreamDb = await get(iceCreamDbAtom);
  return iceCreamForm !== null && !isEqual(iceCreamForm, iceCreamDb);
});

export const saveIceCreamAtom = atom(null, (get, set) => {
  const iceCream = get(iceCreamAtom);
  const iceCreamPromise = saveIceCreamData(iceCream as IDL);
  set(iceCreamDbAtom, iceCreamPromise);
  set(iceCreamFormAtom, iceCreamPromise);
});

export const updatedAtAtom = atom(async (get) => {
  const { updatedAt } = await get(iceCreamAtom);
  return updatedAt;
});

export const coneAtom = atom(
  (get) => {
    const iceCream = get(iceCreamAtom) as IDL;
    return iceCream.cone;
  },

  (get, set, cone: Cone) => {
    const iceCream = get(iceCreamAtom) as IDL;
    set(iceCreamFormAtom, {
      ...iceCream,
      cone,
    });
  }
);

import { atom } from "jotai";
import { Cone, IDL } from "./types";
import { getIceCreamData, saveIceCreamData } from "./iceCreamDb";

export const iceCreamAtom = atom<Promise<IDL> | IDL>(getIceCreamData()); // initialize with promise

export const updatedAtAtom = atom(async (get) => {
  const { updatedAt } = await get(iceCreamAtom);
  return updatedAt;
});

export const coneAtom = atom(
  async (get) => {
    const iceCream = await get(iceCreamAtom);
    return iceCream.cone;
  },

  async (get, set, cone: Cone) => {
    const iceCream = await get(iceCreamAtom);
    set(iceCreamAtom, {
      ...iceCream,
      cone,
    });
  }
);

export const saveIceCreamAtom = atom(null, (get, set) => {
  const iceCream = get(iceCreamAtom);
  set(iceCreamAtom, saveIceCreamData(iceCream as IDL));
});

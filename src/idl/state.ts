import { atom, useAtomValue } from "jotai";
import { Cone, IDL, Scoop } from "./types";
import { useMemo } from "react";

const DEFAULT_ICE_CREAM: IDL = {
  scoops: [],
  toppings: [],
  cone: "none",
};

export const iceCreamAtom = atom<IDL>(DEFAULT_ICE_CREAM);

export const coneAtom = atom(
  (get) => {
    const iceCream = get(iceCreamAtom) as IDL;
    return iceCream.cone;
  },

  (get, set, cone: Cone) => {
    const iceCream = get(iceCreamAtom) as IDL;
    set(iceCreamAtom, {
      ...iceCream,
      cone,
    });
  }
);

const selectScoop = (scoopId: string) =>
  atom((get) => {
    const { scoops } = get(iceCreamAtom);
    return scoops.find(({ id }) => id === scoopId);
  });

export const useScoop = (id: string) =>
  useAtomValue(useMemo(() => selectScoop(id), [id]));

export const scoopIdsAtom = atom((get) =>
  get(iceCreamAtom).scoops.map(({ id }) => id)
);

let nextScoopNum = 0;
const genScoopId = () => {
  nextScoopNum += 1;
  return `scoop-${nextScoopNum}`;
};

const newScoop = (): Scoop => ({ id: genScoopId(), flavor: "vanilla" });

export const addScoopAtom = atom(null, (get, set) => {
  console.log("add scoop!");
  const iceCream = get(iceCreamAtom);
  const scoops = [...iceCream.scoops, newScoop()];
  const newIceCream = {
    ...iceCream,
    scoops,
  };
  console.log("newIceCream", newIceCream);
  set(iceCreamAtom, newIceCream);
});

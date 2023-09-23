import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { Cone, DEFAULT_ICE_CREAM_CONE, newScoop, Flavor, Scoop, Topping } from "./idl";
import { selectAtom } from "jotai/utils";
import { isEqual } from "lodash";

export const iceCreamConeAtom = atom(DEFAULT_ICE_CREAM_CONE);

export const coneAtom = atom(
  (get) => get(iceCreamConeAtom).cone,
  (get, set, cone: Cone) => {
    set(iceCreamConeAtom, { ...get(iceCreamConeAtom), cone });
  }
);

export const scoopIdsAtom = selectAtom(iceCreamConeAtom,
  iceCreamCone => iceCreamCone.scoops.map(({ id }) => id),
  isEqual,
);

const findScoop = (scoops: Scoop[], scoopId: string) => scoops.find(({ id }) => id === scoopId);

const selectScoop = (scoopId: string) =>
 atom((get) => findScoop(get(iceCreamConeAtom).scoops, scoopId));

export const useScoop = (scoopId: string) =>
  useAtomValue(useMemo(() => selectScoop(scoopId), [scoopId]));

export const addScoopAtom = atom(null, (get, set) => {
  const iceCreamCone = get(iceCreamConeAtom);
  const { scoops } = iceCreamCone;

  set(iceCreamConeAtom, {
    ...iceCreamCone,
    scoops: [...scoops, newScoop()],
  });
});

export const updateFlavorAtom = atom(null,
  (get, set, scoopId: string, flavor: Flavor) => {
    const iceCreamCone = get(iceCreamConeAtom);
    const { scoops } = iceCreamCone;
    const pos = scoops.findIndex(({id}) => scoopId === id);
    if (pos !== -1) {
      const scoopToUpdate = scoops[pos];
      const updatedScoop = {
        ...scoopToUpdate,
        flavor
      };
      const newScoops = [...scoops.slice(0, pos), updatedScoop, ...scoops.slice(pos + 1)];
      const newIceCreamCone = {
        ...iceCreamCone,
        scoops: newScoops
      }
      set(iceCreamConeAtom, newIceCreamCone);
    }
  }
)

export const updateToppingAtom = atom(null,
  (get, set, scoopId: string, topping: Topping) => {
    const iceCreamCone = get(iceCreamConeAtom);
    const { scoops } = iceCreamCone;
    const pos = scoops.findIndex(({id}) => scoopId === id);
    if (pos !== -1) {
      const scoopToUpdate = scoops[pos];
      const updatedScoop = {
        ...scoopToUpdate,
        topping,
      };
      const newScoops = [...scoops.slice(0, pos), updatedScoop, ...scoops.slice(pos + 1)];
      const newIceCreamCone = {
        ...iceCreamCone,
        scoops: newScoops
      }
      set(iceCreamConeAtom, newIceCreamCone);
    }
  }
)

const numToppingsAtom = atom(get => get(iceCreamConeAtom).scoops.map(({topping}) => topping).filter((topping) => topping !== 'none').length);

export const toppingsIssueAtom = atom(get => get(numToppingsAtom) === 0 ? 'You must pick at least one topping!' : '');

import { atom, useAtomValue } from "jotai";
import { withImmer } from "jotai-immer";
import { selectAtom } from "jotai/utils";
import { isEqual } from "lodash";
import { useMemo } from "react";
import {
  Cone,
  DEFAULT_ICE_CREAM_CONE,
  Flavor,
  IceCreamCone,
  Scoop,
  Topping,
  newScoop,
} from "./idl";

export const iceCreamConeAtom = atom(DEFAULT_ICE_CREAM_CONE);

const immerIceCreamConeAtom = withImmer(iceCreamConeAtom);

export const coneAtom = atom(
  (get) => get(iceCreamConeAtom).cone,
  (get, set, cone: Cone) => {
    set(iceCreamConeAtom, { ...get(iceCreamConeAtom), cone });
  },
);

const getScoopIds = ({ scoops }: IceCreamCone) => scoops.map(({ id }) => id);

export const scoopIdsAtom = selectAtom(iceCreamConeAtom, getScoopIds, isEqual);

const findScoop = (scoops: Scoop[], scoopId: string) =>
  scoops.find(({ id }) => id === scoopId);

// "atom family"
export const useScoop = (scoopId: string) =>
  useAtomValue(
    useMemo(
      () =>
        selectAtom(
          iceCreamConeAtom,
          ({ scoops }) => findScoop(scoops, scoopId),
          isEqual,
        ),
      [scoopId],
    ),
  );

export const addScoopAtom = atom(null, (get, set) => {
  const iceCreamCone = get(iceCreamConeAtom);
  const { scoops } = iceCreamCone;

  set(iceCreamConeAtom, {
    ...iceCreamCone,
    scoops: [...scoops, newScoop()],
  });
});

const findScoopIndex = (iceCream: IceCreamCone, scoopId: string) =>
  iceCream.scoops.findIndex(({ id }) => scoopId === id);

export const updateFlavorAtom = atom(
  null,
  (_get, set, scoopId: string, flavor: Flavor) => {
    set(immerIceCreamConeAtom, (iceCream) => {
      const pos = findScoopIndex(iceCream, scoopId);
      if (pos !== -1) {
        const scoop = iceCream.scoops[pos];
        iceCream.scoops[pos] = { ...scoop, flavor };
      }
    });
  },
);

export const updateToppingAtom = atom(
  null,
  (_get, set, scoopId: string, topping: Topping) => {
    set(immerIceCreamConeAtom, (iceCream) => {
      const pos = findScoopIndex(iceCream, scoopId);
      if (pos !== -1) {
        const scoop = iceCream.scoops[pos];
        iceCream.scoops[pos] = { ...scoop, topping };
      }
    });
  },
);

// export const updateFlavorAtom = atom(null,
//   (get, set, scoopId: string, flavor: Flavor) => {
//     const iceCreamCone = get(iceCreamConeAtom);
//     const { scoops } = iceCreamCone;
//     const pos = scoops.findIndex(({id}) => scoopId === id);
//     if (pos !== -1) {
//       const scoopToUpdate = scoops[pos];
//       const updatedScoop = {
//         ...scoopToUpdate,
//         flavor
//       };
//       const newScoops = [...scoops.slice(0, pos), updatedScoop, ...scoops.slice(pos + 1)];
//       const newIceCreamCone = {
//         ...iceCreamCone,
//         scoops: newScoops
//       }
//       set(iceCreamConeAtom, newIceCreamCone);
//     }
//   }
// )

// export const updateToppingAtom = atom(null,
//   (get, set, scoopId: string, topping: Topping) => {
//     const iceCreamCone = get(iceCreamConeAtom);
//     const { scoops } = iceCreamCone;
//     const pos = scoops.findIndex(({id}) => scoopId === id);
//     if (pos !== -1) {
//       const scoopToUpdate = scoops[pos];
//       const updatedScoop = {
//         ...scoopToUpdate,
//         topping,
//       };
//       const newScoops = [...scoops.slice(0, pos), updatedScoop, ...scoops.slice(pos + 1)];
//       const newIceCreamCone = {
//         ...iceCreamCone,
//         scoops: newScoops
//       }
//       set(iceCreamConeAtom, newIceCreamCone);
//     }
//   }
// )

const numToppingsAtom = atom(
  (get) =>
    get(iceCreamConeAtom)
      .scoops.map(({ topping }) => topping)
      .filter((topping) => topping !== "none").length,
);

export const toppingsIssueAtom = atom((get) =>
  get(numToppingsAtom) === 0 ? "You must pick at least one topping!" : "",
);

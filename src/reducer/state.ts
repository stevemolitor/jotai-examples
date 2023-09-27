import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
type CountAction = "increment" | "decrement" | "reset";

const MIN_COUNT = 0;

const countReducer = (prev: number, action: CountAction) => {
  switch (action) {
    case "increment":
      return prev + 1;
    case "decrement":
      return Math.max(prev - 1, MIN_COUNT);
    case "reset":
      return MIN_COUNT;
  }
};

export const countAtom = atomWithReducer(MIN_COUNT, countReducer);

// EXAMPLE 1 - all primitives
const isSmallAtom = atom((get) => {
  console.log("isSmallAtom");
  return get(countAtom) < 3;
});

export const sizeAtom = atom((get) => {
  console.log("sizeAtom");
  return get(isSmallAtom) ? "small" : "large";
});

// EXAMPLE 2 - unstable atom
// atom that returns a new object every time (not stable):
// const isSmallAtom = atom((get) => {
//   console.log("isSmallAtom");
//   const isSmall = get(countAtom) < 3;
//   return { isSmall };
// });
//
// export const sizeAtom = atom((get) => {
//   console.log("sizeAtom");
//   const { isSmall } = get(isSmallAtom);
//   return isSmall ? "small" : "large";
// });

// FIX:
// const isSmallAtom = selectAtom(
//   countAtom,
//   (count) => {
//     console.log("isSmallAtom");
//     const isSmall = count < 3;
//     return { isSmall };
//   },
//   isEqual,
// );

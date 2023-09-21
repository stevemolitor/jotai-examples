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

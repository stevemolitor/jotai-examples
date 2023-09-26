import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithReset, useResetAtom /*, RESET */ } from "jotai/utils";
import { useMemo } from "react";

const countAtom = atomWithReset(0);

const incrementAtom = atom(null, (get, set) =>
  set(countAtom, get(countAtom) + 1),
);

// another way to reset - more useful when delegating to another atom,
// or when conditionally resetting
// const resetAtom = atom(null, (_get, set) => {
//   set(countAtom, RESET);
// });

export const useCount = () => {
  const count = useAtomValue(countAtom);
  const increment = useSetAtom(incrementAtom);
  const reset = useResetAtom(countAtom);

  return useMemo(
    () => ({ increment, reset, count }),
    [count, increment, reset],
  );
};

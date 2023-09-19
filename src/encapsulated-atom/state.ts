import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

const countAtom = atom(0);

const incrementAtom = atom(null, (get, set) =>
  set(countAtom, get(countAtom) + 1)
);

const decrementAtom = atom(null, (get, set) =>
  set(countAtom, get(countAtom) - 1)
);

export const useCount = () => {
  const increment = useSetAtom(incrementAtom);
  const decrement = useSetAtom(decrementAtom);
  const count = useAtomValue(countAtom);

  return useMemo(
    () => ({ increment, decrement, count }),
    [count, increment, decrement]
  );
};

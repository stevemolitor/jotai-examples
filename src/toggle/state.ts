import { atom } from "jotai";

// toggle example - see https://twitter.com/dai_shi/status/1699970779373592963

// do not export this atom:
const baseAtom = atom(false);

// do export this atom:
export const toggleAtom = atom(
  (get) => get(baseAtom),
  (get, set) => set(baseAtom, !get(baseAtom))
);

import { atom } from "jotai";

// do not export this atom:
const baseAtom = atom(false);

// do export this atom:
export const toggleAtom = atom(
  (get) => get(baseAtom),
  (get, set) => set(baseAtom, !get(baseAtom)),
);

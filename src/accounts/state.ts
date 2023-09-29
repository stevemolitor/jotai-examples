import { atom } from "jotai";
import { defaultAccount, fetchAccount } from "./accountsDb";
import { AccountName, AccountPreferences } from "./types";

export const accountAtom = atom(defaultAccount);

export const loadAccountAtom = atom(fetchAccount());
// export const loadAccountAtom = atom(() => fetchAccount());

export const accountNameAtom = atom(
  (get) => get(accountAtom).name,
  (get, set, name: AccountName) => {
    set(accountAtom, {
      ...get(accountAtom),
      name,
    });
  },
);

export const accountPreferencesAtom = atom(
  (get) => get(accountAtom).preferences,
  (_get, set, preferences: AccountPreferences) => {
    set(accountAtom, {
      ..._get(accountAtom),
      preferences,
    });
  },
);

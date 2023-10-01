import { atom } from "jotai";
import { atomWithDefault, unwrap } from "jotai/utils";
import { isEqual } from "lodash";
import { defaultAccount, fetchAccount, saveAccount } from "./accountsDb";
import { Account, AccountName, AccountPreferences } from "./types";

export const dbAccountAtom = atomWithDefault<Promise<Account>>(fetchAccount);

export const accountAtom = atom(defaultAccount);

export const saveAccountAtom = atom(null, (get, set) => {
  const account = get(accountAtom);
  set(dbAccountAtom, saveAccount(account));
});

export const accountNameAtom = atom(
  (get) => {
    const { name } = get(accountAtom);
    return name;
  },
  (get, set, name: AccountName) => {
    set(accountAtom, {
      ...get(accountAtom),
      name,
    });
  },
);

export const accountPreferencesAtom = atom(
  (get) => {
    const { preferences } = get(accountAtom);
    return preferences;
  },
  (get, set, preferences: AccountPreferences) => {
    set(accountAtom, {
      ...get(accountAtom),
      preferences,
    });
  },
);

export const timestampAtom = atom((get) => {
  const { timestamp } = get(accountAtom);
  return timestamp;
});

export const isDirtyAtom = unwrap(
  atom(async (get) => !isEqual(get(accountAtom), await get(dbAccountAtom))),
);

export const reloadAtom = atom(null, (_get, set) => {
  set(
    dbAccountAtom,
    fetchAccount().then((account) => {
      set(accountAtom, account);
      return account;
    }),
  );
});

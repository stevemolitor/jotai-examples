import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { fetchAccount, saveAccount } from "./accountsDb";
import { Account, AccountName, AccountPreferences } from "./types";
import { isPromise } from "./utils";

const dbAccountAtom = atomWithDefault<Promise<Account> | Account>(fetchAccount);

export const saveAccountAtom = atom(null, (get, set) => {
  const dbAccount = get(dbAccountAtom);
  if (isPromise<Account>(dbAccount)) {
    set(
      dbAccountAtom,
      dbAccount.then((account) => saveAccount(account)),
    );
  } else {
    set(dbAccountAtom, saveAccount(dbAccount));
  }
});

export const accountNameAtom = atom(
  (get) => {
    const dbAccount = get(dbAccountAtom);
    if (isPromise<Account>(dbAccount)) {
      return dbAccount.then(({ name }) => name);
    }
    return dbAccount.name;
  },
  async (get, set, name: AccountName) => {
    set(dbAccountAtom, {
      ...(await get(dbAccountAtom)),
      name,
    });
  },
);

export const accountPreferencesAtom = atom(
  (get) => {
    const dbAccount = get(dbAccountAtom);
    if (isPromise<Account>(dbAccount)) {
      return dbAccount.then(({ preferences }) => preferences);
    }
    return dbAccount.preferences;
  },
  async (get, set, preferences: AccountPreferences) => {
    set(dbAccountAtom, {
      ...(await get(dbAccountAtom)),
      preferences,
    });
  },
);

export const timestampAtom = atom((get) => {
  const dbAccount = get(dbAccountAtom);
  if (isPromise<Account>(dbAccount)) {
    return dbAccount.then(({ timestamp }) => timestamp);
  }
  return dbAccount.timestamp;
});

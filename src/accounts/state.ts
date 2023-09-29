import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { fetchAccount, saveAccount } from "./accountsDb";
import { Account, AccountName, AccountPreferences } from "./types";
import { isPromise } from "./utils";

const dbAccountAtom = atomWithDefault<Promise<Account> | Account>(fetchAccount);

export const accountAtom = atom(
  async (get) => {
    const dbAccount = get(dbAccountAtom);
    if (isPromise<Account>(dbAccount)) {
      return await dbAccount;
    }
    return dbAccount;
  },
  async (_get, set, account: Account) => {
    set(dbAccountAtom, account);
  },
);

export const saveAccountAtom = atom(null, (get, set) => {
  const promise = get(accountAtom).then((account) => saveAccount(account));
  set(dbAccountAtom, promise);
});

export const accountNameAtom = atom(
  async (get) => {
    const { name } = await get(accountAtom);
    return name;
  },
  async (get, set, name: AccountName) => {
    set(accountAtom, {
      ...(await get(accountAtom)),
      name,
    });
  },
);

export const accountPreferencesAtom = atom(
  async (get) => {
    const { preferences } = await get(accountAtom);
    return preferences;
  },
  async (get, set, preferences: AccountPreferences) => {
    set(accountAtom, {
      ...(await get(accountAtom)),
      preferences,
    });
  },
);

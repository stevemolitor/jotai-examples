import { Account } from "./types";

export const defaultAccount: Account = {
  name: {
    fname: "Mary",
    lname: "Smith",
  },
  preferences: {
    moarButtons: false,
    sendSpam: true,
  },
  timestamp: Date.now(),
};

let account: Account = defaultAccount;

export const fetchAccount = async () => {
  return new Promise<Account>((resolve) =>
    setTimeout(() => {
      return resolve(account);
    }, 2000),
  );
};

export const saveAccount = async (newAccount: Account) =>
  new Promise<Account>((resolve) => {
    setTimeout(() => {
      account = { ...newAccount, timestamp: Date.now() };
      resolve(account);
    }, 1000);
  });

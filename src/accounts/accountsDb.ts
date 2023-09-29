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
};

let account: Account = defaultAccount;

export const fetchAccount = async () =>
  new Promise<Account>((resolve) =>
    setTimeout(() => {
      return resolve(account);
    }, 2000),
  );

export const saveAccount = async (newAccount: Account) =>
  new Promise<Account>((resolve) => {
    setTimeout(() => {
      account = newAccount;
      console.log("saved account");
      resolve(account);
    }, 2000);
  });

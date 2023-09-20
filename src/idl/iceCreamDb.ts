import { IDL } from "./types";

const timestamp = () => new Date().toLocaleTimeString();

let iceCreamDb: IDL = {
  scoops: [],
  toppings: [],
  updatedAt: timestamp(),
  cone: "none",
};

export const getIceCreamData = (): Promise<IDL> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(iceCreamDb), 2000);
  });

export const saveIceCreamData = (iceCream: IDL): Promise<IDL> =>
  new Promise((resolve) => {
    setTimeout(() => {
      iceCreamDb = {
        ...iceCream,
        updatedAt: timestamp(),
      };
      return resolve(iceCreamDb);
    }, 2000);
  });

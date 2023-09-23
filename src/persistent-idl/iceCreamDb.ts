import { IDL } from "./types";

const timestamp = () => new Date().toLocaleTimeString();

let iceCreamDb: IDL = {
  scoops: [],
  toppings: [],
  updatedAt: timestamp(),
  cone: "none",
};

export const getIceCreamData = async (): Promise<IDL> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(iceCreamDb), 1000);
  });

export const saveIceCreamData = async (iceCream: IDL): Promise<IDL> =>
  new Promise((resolve) => {
    setTimeout(() => {
      iceCreamDb = {
        ...iceCream,
        updatedAt: timestamp(),
      };
      return resolve(iceCreamDb);
    }, 1000);
  });
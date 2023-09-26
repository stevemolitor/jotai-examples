// IDL - Ice Cream Definition Language

export const CONE_TYPES = ["waffle", "sugar"] as const;
export const FLAVORS = ["chocolate", "vanilla", "strawberry"] as const;
export const TOPPINGS = ["sprinkles", "nuts", "skittles", "none"] as const;

export type Cone = (typeof CONE_TYPES)[number];
export type Flavor = (typeof FLAVORS)[number];
export type Topping = (typeof TOPPINGS)[number];

export const DEFAULT_CONE_TYPE: Cone = "sugar";
export const DEFAULT_TOPPING: Topping = "none";
export const DEFAULT_FLAVOR: Flavor = "vanilla";

export interface Scoop {
  id: string;
  flavor: Flavor;
  topping: Topping;
}

let nextScoopId = 0;
const genScoopId = () => {
  nextScoopId += 1;
  return `scoop-id-${nextScoopId}`;
};

export const newScoop = (): Scoop => ({
  id: genScoopId(),
  flavor: DEFAULT_FLAVOR,
  topping: DEFAULT_TOPPING,
});

export interface IceCreamCone {
  cone: Cone;
  scoops: Scoop[];
  topping: Topping;
}

export const DEFAULT_ICE_CREAM_CONE: IceCreamCone = {
  cone: "sugar",
  scoops: [],
  topping: DEFAULT_TOPPING,
};

export type Cone = "waffle" | "sugar" | "none";
export type Flavor = "chocolate" | "vanilla" | "strawberry";
export type Topping = "sprinkles" | "nut" | "skittles";

export interface Scoop {
  id: string;
  flavor: Flavor;
}

// Ice Cream Definition Language
export interface IDL {
  cone: Cone;
  scoops: Scoop[];
  toppings: Topping[];
}

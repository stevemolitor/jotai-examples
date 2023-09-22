export type Cone = "waffle" | "sugar" | "none";
export type Flavor = "chocolate" | "vanilla" | "strawberry";
export type Topping = "sprinkles" | "nut" | "skittles";

// Ice Cream Definition Language
export interface IDL {
  cone: Cone;
  scoops: Flavor[];
  toppings: Topping[];
  updatedAt: string;
}

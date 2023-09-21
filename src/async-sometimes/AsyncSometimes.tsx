import { atomWithDefault } from "jotai/utils";
import { atom, useAtom } from "jotai";
import { ChangeEventHandler, Suspense, useCallback } from "react";

type Flavor = "chocolate" | "vanilla" | "strawberry";

interface IceCream {
  flavor: Flavor;
}

const iceCreamDb: IceCream = { flavor: "chocolate" };

const fetchIceCream = async (): Promise<IceCream> =>
  Promise.resolve(iceCreamDb);

const iceCreamAtom = atomWithDefault<Promise<IceCream> | IceCream>(
  fetchIceCream
);

const flavorAtom = atom(
  (get) => {
    const { flavor } = get(iceCreamAtom) as IceCream;
    return flavor;
  },
  async (get, set, flavor: Flavor) => {
    const iceCream = await get(iceCreamAtom);
    set(iceCreamAtom, {
      ...iceCream,
      flavor,
    });
  }
);

const FlavorPicker = () => {
  const [flavor, setFlavor] = useAtom(flavorAtom);

  const onSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      setFlavor(event.target.value as Flavor);
    },
    [setFlavor]
  );

  return (
    <label>
      Flavor:{" "}
      <select name="flavor" value={flavor} onChange={onSelect}>
        <option value="none" disabled>
          Pick Flavor:
        </option>
        <option value="chocolate">Chocolate</option>
        <option value="vanilla">Vanilla</option>
        <option value="strawberry">Strawberry</option>
      </select>
    </label>
  );
};

const Loading = () => {
  console.log("loading fallback");
  return (
    <div style={{ backgroundColor: "red", fontSize: "200px" }}>loading…</div>
  );
};

export const FlavorForm = () => (
  <Suspense fallback={<Loading />}>
    <FlavorPicker />
  </Suspense>
);

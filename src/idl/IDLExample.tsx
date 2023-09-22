import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addScoopAtom,
  coneAtom,
  iceCreamAtom,
  scoopIdsAtom,
  useScoop,
} from "./state";
import { FormEventHandler, ChangeEventHandler, FC, useCallback } from "react";
import { Cone } from "./types";

const ConePicker: FC = () => {
  const [cone, setCone] = useAtom(coneAtom);

  const onSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      setCone(event.target.value as Cone);
    },
    [setCone]
  );

  return (
    <label>
      Cone:{" "}
      <select name="cone" value={cone} onChange={onSelect}>
        <option value="none" disabled>
          Pick Cone Type:
        </option>
        <option value="waffle">Waffle Cone</option>
        <option value="sugar">Sugar Cone</option>
      </select>
    </label>
  );
};

const ScoopCard: FC<{ id: string }> = ({ id }) => {
  const scoop = useScoop(id);

  return (
    <div>
      id: {id}, flavor: {scoop?.flavor}
    </div>
  );
};

const IceCreamForm = () => {
  const scoopIds = useAtomValue(scoopIdsAtom);
  const addScoop = useSetAtom(addScoopAtom);
  const iceCream = useAtomValue(iceCreamAtom);
  console.log("ice cream form ice cream:", iceCream);
  const onSubmit = useCallback<FormEventHandler>((event) => {
    event.preventDefault();
  }, []);
  const onAddScoop = useCallback(() => {
    console.log("adding a scooop");
    addScoop();
  }, [addScoop]);

  return (
    <form onSubmit={onSubmit}>
      <div>ice cream: {JSON.stringify(iceCream, null, 4)}</div>
      <ConePicker />
      {scoopIds.map((id) => (
        <ScoopCard key={id} id={id} />
      ))}
      <button onClick={onAddScoop}>+</button>
    </form>
  );
};

export const IDLExample: FC = () => (
  <div className="example">
    <>
      <div className="example-title">IDL Example:</div>
      <IceCreamForm />
    </>
  </div>
);

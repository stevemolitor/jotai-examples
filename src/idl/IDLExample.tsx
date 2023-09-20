import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  coneAtom,
  iceCreamAtom,
  updatedAtAtom,
  saveIceCreamAtom,
} from "./state";
import {
  ChangeEventHandler,
  FormEventHandler,
  Suspense,
  useCallback,
  useTransition,
} from "react";
import { Cone } from "./types";

const ConePicker = () => {
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

const IceCreamForm = () => {
  const save = useSetAtom(saveIceCreamAtom);
  const updatedAt = useAtomValue(updatedAtAtom);

  const [isPending, startTransition] = useTransition();

  const onSave = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      startTransition(() => {
        save();
      });
    },
    [save]
  );

  const iceCream = useAtomValue(iceCreamAtom);
  return (
    <form onSubmit={onSave}>
      <div>{JSON.stringify(iceCream, null, 2)}</div>

      <ConePicker />
      <div>updated at: {updatedAt}</div>
      <button type="submit">Save</button>
      {isPending && <div>saving…</div>}
    </form>
  );
};

export const IDLExample = () => {
  return (
    <div className="example">
      <>
        <div className="example-title">IDL Example:</div>
        <Suspense fallback={<div>getting ice cream from freezer…</div>}>
          <IceCreamForm />
        </Suspense>
      </>
    </div>
  );
};

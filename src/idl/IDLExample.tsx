import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  coneAtom,
  updatedAtAtom,
  saveIceCreamAtom,
  isIceCreamDirtyAtom,
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
  const isDirty = useAtomValue(isIceCreamDirtyAtom);

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

  return (
    <form onSubmit={onSave}>
      <ConePicker />
      <div>updated at: {updatedAt}</div>
      <button type="submit" disabled={!isDirty || isPending}>
        {isPending ? <i>saving…</i> : "Save"}
      </button>
    </form>
  );
};

export const IDLExample = () => {
  return (
    <div className="example">
      <>
        <div className="example-title">IDL Example:</div>
        <Suspense
          fallback={
            <div style={{ backgroundColor: "red", fontSize: "100px" }}>
              getting ice cream from freezer…
            </div>
          }
        >
          <IceCreamForm />
        </Suspense>
      </>
    </div>
  );
};

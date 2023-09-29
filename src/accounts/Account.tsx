import { useSetAtom } from "jotai";
import { FC, FormEventHandler, useCallback, useTransition } from "react";
import { EditAccountName } from "./EditAccountName";
import { EditAccountPreferences } from "./EditAccountProfile";
import { saveAccountAtom } from "./state";

export const Account: FC = () => {
  const [isSaving, startTransition] = useTransition();
  const saveAccount = useSetAtom(saveAccountAtom);

  const onSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      startTransition(() => {
        saveAccount();
      });
    },
    [saveAccount],
  );

  return (
    <div className="example">
      <div className="example-title">My Account</div>
      <form onSubmit={onSubmit}>
        <EditAccountName />
        <EditAccountPreferences />
        <button disabled={isSaving} type="submit">
          {isSaving ? <i>Saving…</i> : "Save"}
        </button>
      </form>
    </div>
  );
};

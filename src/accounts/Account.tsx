import { useSetAtom } from "jotai";
import { FC, FormEventHandler, useCallback } from "react";
import { EditAccountName } from "./EditAccountName";
import { EditAccountPreferences } from "./EditAccountProfile";
import { saveAccountAtom } from "./state";

export const Account: FC = () => {
  const saveAccount = useSetAtom(saveAccountAtom);

  const onSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      console.log("saving account cb");
      saveAccount();
    },
    [saveAccount],
  );

  return (
    <div className="example">
      <div className="example-title">My Account</div>
      <form onSubmit={onSubmit}>
        <EditAccountName />
        <EditAccountPreferences />
        <button type="submit" onSubmit={onSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

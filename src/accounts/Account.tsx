import { useAtomValue, useSetAtom } from "jotai";
import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { EditAccountName } from "./EditAccountName";
import { EditAccountPreferences } from "./EditAccountProfile";
import {
  accountAtom,
  dbAccountAtom,
  isDirtyAtom,
  reloadAtom,
  saveAccountAtom,
  timestampAtom,
} from "./state";

const IsDirty = () => {
  const isDirty = useAtomValue(isDirtyAtom);
  return <div>dirty: {isDirty ? "yes" : "no"}</div>;
};

const ReloadButton = () => {
  const reload = useSetAtom(reloadAtom);
  const [isLoading, startTransition] = useTransition();

  const onReload = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      startTransition(() => {
        reload();
      });
    },
    [reload],
  );

  return (
    <button onClick={onReload}>{isLoading ? <i>Loading…</i> : "Reload"}</button>
  );
};

export const Account: FC = () => {
  const [isSaving, startTransition] = useTransition();
  const saveAccount = useSetAtom(saveAccountAtom);
  const timestamp = useAtomValue(timestampAtom);
  const setAccount = useSetAtom(accountAtom);

  const dbAccount = useAtomValue(dbAccountAtom);
  useEffect(() => {
    setAccount(dbAccount);
  }, [dbAccount, setAccount]);

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
        <div>Updated at: {timestamp}</div>
        <button disabled={isSaving} type="submit">
          {isSaving ? <i>Saving…</i> : "Save"}
        </button>{" "}
        <ReloadButton />
        <IsDirty />
      </form>
    </div>
  );
};

import { useAtomValue, useSetAtom } from "jotai";
import { FC, FormEventHandler, useCallback, useEffect } from "react";
import { EditAccountName } from "./EditAccountName";
import { EditAccountPreferences } from "./EditAccountProfile";
import { accountAtom, loadAccountAtom } from "./state";

export const Account: FC = () => {
  const onSubmit = useCallback<FormEventHandler>((event) => {
    event.preventDefault();
  }, []);

  const setAccount = useSetAtom(accountAtom);
  const loadedAccount = useAtomValue(loadAccountAtom);

  useEffect(() => {
    setAccount(loadedAccount);
  }, [loadedAccount, setAccount]);

  return (
    <div className="example">
      <div className="example-title">My Account</div>
      <form onSubmit={onSubmit}>
        <EditAccountName />
        <EditAccountPreferences />
      </form>
    </div>
  );
};

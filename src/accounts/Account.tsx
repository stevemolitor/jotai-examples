import { FC, FormEventHandler, useCallback } from "react";
import { EditAccountName } from "./EditAccountName";
import { EditAccountPreferences } from "./EditAccountProfile";

export const Account: FC = () => {
  const onSubmit = useCallback<FormEventHandler>((event) => {
    event.preventDefault();
  }, []);

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

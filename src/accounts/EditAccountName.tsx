import { useAtom } from "jotai";
import { ChangeEventHandler, FC, useCallback } from "react";
import { accountNameAtom } from "./state";

export const EditAccountName: FC = () => {
  const [accountName, setAccountName] = useAtom(accountNameAtom);

  const onChangeFirstName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const fname = event.target.value;
      setAccountName({ ...accountName, fname });
    },
    [accountName, setAccountName],
  );

  const onChangeLastName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const lname = event.target.value;
      setAccountName({ ...accountName, lname });
    },
    [accountName, setAccountName],
  );

  return (
    <fieldset>
      <legend>Name</legend>
      <div>
        <label>
          First Name:{" "}
          <input
            type="text"
            onChange={onChangeFirstName}
            value={accountName.fname}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:{" "}
          <input
            type="text"
            onChange={onChangeLastName}
            value={accountName.lname}
          />
        </label>
      </div>
    </fieldset>
  );
};

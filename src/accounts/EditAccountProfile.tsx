import { useAtom } from "jotai";
import { FC, useCallback } from "react";
import { accountPreferencesAtom } from "./state";

export const EditAccountPreferences: FC = () => {
  const [accountPreferences, setAccountPreferences] = useAtom(
    accountPreferencesAtom,
  );

  const onToggleSendSpam = useCallback(() => {
    const { sendSpam } = accountPreferences;
    setAccountPreferences({ ...accountPreferences, sendSpam: !sendSpam });
  }, [accountPreferences, setAccountPreferences]);

  const onToggleMoarButtons = useCallback(() => {
    const { moarButtons } = accountPreferences;
    setAccountPreferences({ ...accountPreferences, moarButtons: !moarButtons });
  }, [accountPreferences, setAccountPreferences]);

  return (
    <fieldset>
      <legend>Preferences</legend>
      <div>
        <label>
          Send Spam{" "}
          <input
            type="checkbox"
            checked={accountPreferences.sendSpam}
            onChange={onToggleSendSpam}
          />
        </label>
      </div>
      <div>
        <label>
          Moar Buttons:{" "}
          <input
            type="checkbox"
            checked={accountPreferences.moarButtons}
            onChange={onToggleMoarButtons}
          />
        </label>
      </div>
    </fieldset>
  );
};

import { useAtom } from "jotai";
import { FC } from "react";
import { toggleAtom } from "./state";

export const Toggle: FC = () => {
  const [isOn, toggle] = useAtom(toggleAtom);

  return (
    <div className="example">
      <>
        <div className="example-title">Toggle:</div>
        <div>
          state: {isOn ? "on" : "off"} <button onClick={toggle}>Toggle</button>
        </div>
      </>
    </div>
  );
};

import { toggleAtom } from "./state";
import { useAtom } from "jotai";

export const ToggleExample = () => {
  const [isOn, toggle] = useAtom(toggleAtom);

  return (
    <div className="example">
      <>
        <div className="example-title">Toggle Atom Example:</div>
        <div>
          state: {isOn ? "on" : "off"} <button onClick={toggle}>Toggle</button>
        </div>
      </>
    </div>
  );
};

import { useAtom, useAtomValue } from "jotai";
import { FC } from "react";
import { countAtom, sizeAtom } from "./state";

export const CountWithReducer: FC = () => {
  const [count, dispatch] = useAtom(countAtom);
  const size = useAtomValue(sizeAtom);

  return (
    <div className="example">
      <>
        <div className="example-title">Count with Reducer:</div>
        <div>
          count: {count}{" "}
          <button onClick={() => dispatch("increment")}>increment</button>{" "}
          <button onClick={() => dispatch("decrement")}>decrement</button>{" "}
          <button onClick={() => dispatch("reset")}>reset</button>{" "}
        </div>
        <div>size: {size}</div>
      </>
    </div>
  );
};

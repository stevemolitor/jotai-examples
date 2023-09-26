import { FC } from "react";
import { useCount } from "./state";

export const CountWithReset: FC = () => {
  const { count, increment, reset } = useCount();

  return (
    <div className="example">
      <>
        <div className="example-title">Count with Reset:</div>
        <div>
          count: {count} <button onClick={increment}>increment</button>{" "}
          <button onClick={reset}>reset</button>
        </div>
      </>
    </div>
  );
};

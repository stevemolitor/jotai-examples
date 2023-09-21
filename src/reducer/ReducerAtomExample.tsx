import { useAtom } from "jotai";
import { countAtom } from "./state";

export const ReducerAtomExample = () => {
  const [count, dispatch] = useAtom(countAtom);

  return (
    <div className="example">
      <>
        <div className="example-title">Reducer Atom Example:</div>
        <div>
          count: {count}{" "}
          <button onClick={() => dispatch("increment")}>increment</button>{" "}
          <button onClick={() => dispatch("decrement")}>decrement</button>{" "}
          <button onClick={() => dispatch("reset")}>reset</button>{" "}
        </div>
      </>
    </div>
  );
};

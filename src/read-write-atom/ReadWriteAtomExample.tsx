import { useCallback } from "react";
import { countAtom } from "./state";
import { useAtom } from "jotai";

export const ReadWriteAtomExample = () => {
  const [count, setCount] = useAtom(countAtom);

  const inc = useCallback(() => {
    setCount((c) => c + 1);
  }, [setCount]);

  return (
    <div className="example">
      <>
        <div className="example-title">Read / Write Atom Example:</div>
        <div>
          count: {count} <button onClick={inc}>increment</button>
        </div>
      </>
    </div>
  );
};

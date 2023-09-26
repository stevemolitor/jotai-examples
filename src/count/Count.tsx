import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, useCallback } from "react";

const countAtom = atom(0);

const doubleCountAtom = atom((get) => get(countAtom) * 2);

const setCountWithLoggingAtom = atom(null, (get, set, newCount: number) => {
  console.log("old count:", get(countAtom), "new count", newCount);
  set(countAtom, newCount);
});

export const Count: FC = () => {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const setCountWithLogging = useSetAtom(setCountWithLoggingAtom);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  const incrementWithLogging = useCallback(() => {
    setCountWithLogging(count + 1);
  }, [count, setCountWithLogging]);

  return (
    <div className="example">
      <>
        <div className="example-title">Count:</div>
        <div>
          Count: {count} <button onClick={increment}>+</button>
        </div>
        <button onClick={incrementWithLogging}>+ with logging</button>
        <div>Times two: {doubleCount}</div>
      </>
    </div>
  );
};

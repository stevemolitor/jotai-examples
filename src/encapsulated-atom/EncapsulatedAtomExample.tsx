import { useCount } from "./state";

export const EncapsulatedAtomExample = () => {
  const { count, increment, decrement, reset } = useCount();

  return (
    <div className="example">
      <>
        <div className="example-title">Encapsulated Atom Example:</div>
        <div>
          count: {count} <button onClick={increment}>increment</button>{" "}
          <button onClick={decrement}>decrement</button>{" "}
          <button onClick={reset}>reset</button>
        </div>
      </>
    </div>
  );
};

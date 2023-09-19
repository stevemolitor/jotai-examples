import { useCount } from "./state";

export const EncapsulatedAtomExample = () => {
  const { count, increment, decrement } = useCount();

  return (
    <div className="example">
      <>
        <div className="example-title">Read / Write Atom Example:</div>
        <div>
          count: {count} <button onClick={increment}>increment</button>{" "}
          <button onClick={decrement}>decrement</button>
        </div>
      </>
    </div>
  );
};

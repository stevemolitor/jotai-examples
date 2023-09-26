import { FC, useCallback, useState } from "react";

export const Count: FC = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  return (
    <div className="example">
      <>
        <div className="example-title">Count:</div>
        <div>
          Count: {count} <button onClick={increment}>+</button>
        </div>
      </>
    </div>
  );
};

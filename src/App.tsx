import { Suspense } from "react";
import { Count } from "./count/Count";
import { Toggle } from "./toggle/Toggle";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <Count />
      <Toggle />
    </div>
  </Suspense>
);

export default App;

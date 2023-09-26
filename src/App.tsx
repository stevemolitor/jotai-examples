import { Suspense } from "react";
import { Count } from "./count/Count";
import { CountWithReset } from "./reset/CountWithReset";
import { Toggle } from "./toggle/Toggle";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <Count />
      <Toggle />
      <CountWithReset />
    </div>
  </Suspense>
);

export default App;

import { Suspense } from "react";
import { Count } from "./count/Count";
import { IceCreamEditor } from "./idl/IceCreamEditor";
import { CountWithReducer } from "./reducer/CountWithReducer";
import { CountWithReset } from "./reset/CountWithReset";
import { Toggle } from "./toggle/Toggle";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <Count />
      <Toggle />
      <CountWithReset />
      <CountWithReducer />
      <IceCreamEditor />
    </div>
  </Suspense>
);

export default App;

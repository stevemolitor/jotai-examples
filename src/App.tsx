import { Suspense } from "react";
import { Account } from "./accounts/Account";
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
      <Account />
    </div>
  </Suspense>
);

export default App;

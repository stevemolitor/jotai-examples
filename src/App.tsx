import { Suspense } from "react";
import { ReadWriteAtomExample } from "./read-write-atom/ReadWriteAtomExample";
import { ToggleExample } from "./toggle/ToggleExample";
import { EncapsulatedAtomExample } from "./encapsulated-atom/EncapsulatedAtomExample";
import { IDLExample } from "./idl/IDLExample";
import { ReducerAtomExample } from "./reducer/ReducerAtomExample";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h1>Jotai Examples</h1>
      <ReadWriteAtomExample />
      <ToggleExample />
      <EncapsulatedAtomExample />
      <ReducerAtomExample />
      <IDLExample />
    </div>
  </Suspense>
);

export default App;

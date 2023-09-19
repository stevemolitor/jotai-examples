import { Suspense } from "react";
import { ReadWriteAtomExample } from "./read-write-atom/ReadWriteAtomExample";
import { ToggleExample } from "./toggle/ToggleExample";
import { EncapsulatedAtomExample } from "./encapsulated-atom/EncapsulatedAtomExample";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h1>Jotai Examples</h1>
      <ReadWriteAtomExample />
      <ToggleExample />
      <EncapsulatedAtomExample />
    </div>
  </Suspense>
);

export default App;

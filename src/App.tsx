import { Suspense } from "react";
import { ReadWriteAtomExample } from "./read-write-atom/ReadWriteAtomExample";
import { ToggleExample } from "./toggle/ToggleExample";
import { EncapsulatedAtomExample } from "./encapsulated-atom/EncapsulatedAtomExample";
import { FlavorForm } from "./async-sometimes/AsyncSometimes";
import { IDLExample } from "./idl/IDLExample";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h1>Jotai Examples</h1>
      <ReadWriteAtomExample />
      <ToggleExample />
      <EncapsulatedAtomExample />
      <IDLExample />
      <FlavorForm />
    </div>
  </Suspense>
);

export default App;

import { Suspense } from "react";
import { ReadWriteAtomExample } from "./read-write-atom/ReadWriteAtomExample";
import { ToggleExample } from "./toggle/ToggleExample";
import { EncapsulatedAtomExample } from "./encapsulated-atom/EncapsulatedAtomExample";
import { PersistentIDLExample } from "./persistent-idl/PesistentIDLExample";
import { ReducerAtomExample } from "./reducer/ReducerAtomExample";
import { IDLExample } from "./idl/IDLExample";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h1>Jotai Examples</h1>
      <ReadWriteAtomExample />
      <ToggleExample />
      <EncapsulatedAtomExample />
      <ReducerAtomExample />
      <IDLExample />
      <PersistentIDLExample />
    </div>
  </Suspense>
);

export default App;

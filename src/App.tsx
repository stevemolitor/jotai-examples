import { Suspense } from "react";
import { IDLExample } from "./idl/IDLExample";
import { ReadWriteAtomExample } from "./read-write-atom/ReadWriteAtomExample";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h1>Jotai Examples</h1>
      <ReadWriteAtomExample />
      {/*<ToggleExample />
      <EncapsulatedAtomExample />
      <ReducerAtomExample />*/}
      <IDLExample />
      {/*<PersistentIDLExample />*/}
    </div>
  </Suspense>
);

export default App;

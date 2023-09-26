import { Suspense } from "react";
import { Count } from "./count/Count";

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <Count />
      <Count />
    </div>
  </Suspense>
);

export default App;

import { Suspense } from "react";
import { Account } from "./accounts/Account";

const App = () => (
  <div className="App">
    <Suspense fallback="Loading...">
      <Account />
    </Suspense>
  </div>
);

export default App;

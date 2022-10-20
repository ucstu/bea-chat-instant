import _WQRoute from "@/routers";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import withUtils from "./hocs/withUtils";
import { persistor, store } from "./stores";

const WQRoute = withUtils(_WQRoute);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <WQRoute />
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

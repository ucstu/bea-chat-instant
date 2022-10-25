import _WQRoute from "@/routers";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import withCall from "./hocMethods/withCall";
import withMail from "./hocMethods/withMail";
import withToken from "./hocMethods/withToken";
import withUtils from "./hocMethods/withUtils";
import { persistor, store } from "./stores";

let WQRoute = withToken(_WQRoute);
WQRoute = withCall(WQRoute);
WQRoute = withMail(WQRoute);
WQRoute = withUtils(WQRoute);

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

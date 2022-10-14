import WQRoute from "@/routers";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistor, store } from "./stores";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WQRoute />
      </PersistGate>
    </Provider>
  );
}

export default App;

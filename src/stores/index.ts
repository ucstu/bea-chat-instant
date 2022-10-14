import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
import main from "./main";
export const store = configureStore({
  reducer: {
    main,
  },
});
// export default persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import admission from "./store/reducers/admissions";

export default configureStore({
    reducer:{admission}
})
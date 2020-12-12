import {createStore} from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer); //crearea la instanta la store   in reduceri sunt actions   in cards sunt Case

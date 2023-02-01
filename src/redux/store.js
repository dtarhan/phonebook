import { createStore,combineReducers } from "redux";

import personsReducer from "./reducers/personsReducer";


const rootReducer=combineReducers({
    personsState:personsReducer,
    
})

const store=createStore(rootReducer)

export default store
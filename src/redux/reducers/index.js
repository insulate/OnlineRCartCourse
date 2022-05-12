import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cartReducer from './careReducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer,
});

export default rootReducer;
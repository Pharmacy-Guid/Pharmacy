import {combineReducers} from 'redux'
import medicineReducer from './medicineReducer'
import userReducer from './userReducer'
import pharmacyReducer from './pharmacyReducer'

export * from '../Actions/MedicineActoins'
export * from '../Actions/PharmacyActions'
export * from '../Actions/UserActions'
export * from '../Actions/type'

const rootReducer= combineReducers({
    
    user:userReducer,
    medicine:medicineReducer,
    pharmacy:pharmacyReducer
});

export default rootReducer;
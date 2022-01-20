import {
  PHARMACY_REQUEST,
  PHARMACY_FAIL,
  PHARMACY_SUCCESS,
  PHARMACY_ADDED,
  MEDICINE_FOUND,
} from "../Actions/type";

const pharmacies = JSON.parse(localStorage.getItem("pharmacy"));

const initialState = {
  pharmacies: pharmacies ? pharmacies : [],
  loading: false,
  error: null,
  add: false,
};
export default function (state = initialState, action) {
  
  switch (action.type) {
    case PHARMACY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PHARMACY_SUCCESS:

      return {
        ...state,
        loading: false,
        pharmacies: action.payload,
      };
    case PHARMACY_FAIL:

      return {
        ...state,

        loading: false,
        error: action.payload,
      };
    case PHARMACY_ADDED:

      return {
        ...state,
        pharmacies: action.payload,
        loading: false,
        add: true,
      };
    case MEDICINE_FOUND:
      localStorage.setItem("pharmacy", JSON.stringify(action.payload));
      return {
        loading: false,
        pharmacies: action.payload,
      };
    default:
      return state;
  }
}

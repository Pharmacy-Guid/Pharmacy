import {
  MEDICINE_SUCCESS,
  MEDICINE_FAIL,
  MEDICINE_REQUEST,
  MEDICINE_ADDED,
} from "../Actions/type";
const medicine = JSON.parse(localStorage.getItem("medicine"));
const initialState = {
  medicine: medicine ? medicine : [],
  loading: false,
  error: null,
  added: false,
  deleted: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case MEDICINE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEDICINE_SUCCESS:
      localStorage.setItem("medicine", action.payload);
      return {
        ...state,
        loading: false,
        medicine: action.payload,
      };
    case MEDICINE_FAIL:
      return {
        ...state,
        medicine: [],
        error: action.payload,
        loading: false,
      };
    case MEDICINE_ADDED:
      return {
        ...state,
        medicine: action.payload,
        loading: false,
        added: true,
      };
    case "MEDICINE_DELETED": {
      return {
        ...state,
        deleted: true,
        loading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

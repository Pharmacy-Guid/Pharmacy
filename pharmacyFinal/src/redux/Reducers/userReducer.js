import {
  USER_SUCCESS,
  USER_FAIL,
  USER_REQUEST,
  SIGNED_UP,
  UNFOUND,
  ADD_TOKEN,
} from "../Actions/type";
const user=JSON.parse(localStorage.getItem("token"));
const initialState = {
  loading: false,
  error: null,
  logedin: false,
  found: false,
  add: false,
  user: user ? user:[]
};
export default function getusers(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_FAIL:
      return {
        ...state,
        user: [],
        error: action.payload,
        loading: false,
      };

    case ADD_TOKEN:
    localStorage.setItem("token",JSON.stringify(action.payload));
      return {
        ...state,
        // token: action.payload,
        user:action.payload,
        loading: false,
        logedin: true,
        found: true,
      };
    case SIGNED_UP:
        
      return {
        ...state,
        user: action.payload,
        loading: false,
        add: true,
      };
    case UNFOUND:
      return {
        ...state,
        user: [],
        found: false,
        loading:false,
        error:action.payload
      };
    default:
      return state;
  }
}

import {
  USER_SUCCESS,
  USER_FAIL,
  USER_REQUEST,
  SIGNED_UP,
  LOGED_IN,
  PHARMACY_ADDED,
  UNFOUND,
  ADD_TOKEN,
  PHARMACY_SUCCESS,
} from "./type";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { getPharmacy } from "./PharmacyActions";
import Swal from "sweetalert2";

// const navegate=useNavigate();
const Request = () => {
  return {
    type: USER_REQUEST,
  };
};
const Success = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};
const Fail = (error) => {
  return {
    type: USER_FAIL,
    payload: error,
  };
};
const signedUp = (user) => {
  return {
    type: SIGNED_UP,
    payload: user,
  };
};
const logedIn = (user) => {
  return {
    type: ADD_TOKEN,
    payload: user,
  };
};
const unfound = () => {
  return {
    type: UNFOUND,
    payload: "Wrong username or password!",
  };
};
export const getUser = (id) => {
  return (dispatch) => {
    dispatch(Request());
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then((response) => {
        const user = response.data;
        localStorage.setItem("user", user);
        dispatch(Success(user));
      })
      .catch((error) => {
        const message = error;
        dispatch(Fail(message));
      });
  };
};
export const logIn = (username, password, navegate) => {
  const user = {
    'username': username,
    'password': password,
  }
  return (dispatch) => {
    dispatch(Request());
    axios
      .post("http://localhost:8080/login", user)
      .then((response) => {
        const user = response.data.access_token;
        if(user){
        const token = decodeToken(user);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("access_token", JSON.stringify(user));
        
        dispatch(logedIn(token));

        dispatch(getPharmacy(token.sub,navegate));
        }
        else{
          Swal.fire("Wrong usename or password", ``, "error");
        }
      })
      .catch((error) => {
        const message = error.message;
        if (error.message.search("401")==true) {
          Swal.fire("Wrong username or password", `${message}`, "error");
          dispatch(Fail(error));
          return;
        }
        dispatch(Fail(error));
        Swal.fire("Error!", `${message}`, "error");
      });
  };
};

export const signUp = (data, navegate) => {
  
  return (dispatch) => {
    
    dispatch(Request());
    axios
      .post("http://localhost:8080/users", data)
      .then((response) => {
        const user = response.data;
        dispatch(signedUp(user));
        dispatch(logIn(data.username, data.password));
        navegate("/pharmacy");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        Swal.fire("There was an error", message, "error");
      });
  };
};
export const deleteAcount = (id, navegate) => {
  const token = JSON.parse(localStorage.getItem("access_token"));

  return (dispatch) => {
    dispatch(Request());
    axios
      .delete(`http://localhost:8080/pharmacies/${id}`, {headers:{authorization:`Bearer ${token}`}})
      .then((response) => {
        const user = response.data;
        dispatch(Success());
        Swal.fire("Your Account has been dekted","Signup again","success");
        navegate("/login");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        Swal.fire("There was an error", message, "error");
      });
  };
};
export const updateUser = (id,data) => {
  const token = JSON.parse(localStorage.getItem("access_token"));
  const u = JSON.parse(localStorage.getItem("token"));
  
  return (dispatch) => {
    dispatch(Request());
    axios
      .put(`http://localhost:8080/users/${id}`, data, {headers:{authorization:`Bearer ${token}`}})
      .then((res) => {
        const user = res.data;
        dispatch(Success(user));
        
        dispatch(getPharmacy(user.username));
        Swal.fire("Updated", "Done", "success");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        Swal.fire("There was an error", `${message}`, "error");
      });
  };
};

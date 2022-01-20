import {
  PHARMACY_REQUEST,
  PHARMACY_FAIL,
  PHARMACY_SUCCESS,
  PHARMACY_ADDED,
  MEDICINE_FOUND,
} from "./type";
import axios from "axios";
import Swal from "sweetalert2";
const Request = () => {
  return {
    type: PHARMACY_REQUEST,
  };
};
const Success = (pharmacies) => {
  return {
    type: PHARMACY_SUCCESS,
    payload: pharmacies,
  };
};
const Fail = (error) => {
  return {
    type: PHARMACY_FAIL,
    payload: error,
  };
};
const add = (pharmacy) => {
  return {
    type: PHARMACY_ADDED,
    payload: pharmacy,
  };
};
const found = (pharmacies) => {
  return {
    type: MEDICINE_FOUND,
    payload: pharmacies,
  };
};

export const register = (data, navegate) => {
  const token = JSON.parse(localStorage.getItem("access_token"));
  return (dispatch) => {
    dispatch(Request());
    
    axios
      .post("http://localhost:8080/users/addPharmacy", data, {headers:{authorization:`Bearer ${token}`}})
      .then((res) => {
        const pharmacies = res.data;
        dispatch(Success(pharmacies));
        localStorage.setItem("pharmacy", JSON.stringify(pharmacies));
        Swal.fire("Pharmacy registered", "Done", "success");
        navegate("/hello");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        if (message.search("500"))
          Swal.fire("There is a pharmacy with the same name", ``, "error");
        else Swal.fire("There was an error", `${message}`, "error");
      });
  };
};
export const getPharmacy = (id, navegate , navegate2) => {
  const token=JSON.parse(localStorage.getItem("access_token"));
  return (dispatch) => {
    dispatch(Request());
    axios
    .get(`http://localhost:8080/users/pharmacy/${id}`,{headers:{authorization:`Bearer ${token}`}})
    .then((res) => {
      const pharmacies = res.data;
      if (pharmacies.length == 0) {
        navegate && navegate("/pharmacy");
        
      }
      else{
        localStorage.setItem("pharmacy", JSON.stringify(pharmacies));
        dispatch(Success(pharmacies));
        
        navegate && navegate("/hello");
        navegate2 && navegate2("/info");
      }
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
      });
  };
};

export const searchMedicine = (SearchStr) => {
  const searchParams = SearchStr.split(" ");

  return (dispatch) => {
    dispatch(Request());
    if (searchParams.length >= 3) {
      axios
        .get("http://localhost:8080/medicines/search", {
          params: {
            first: searchParams[0],
            second: searchParams[1],
            third: searchParams[2],
          },
        })
        .then((res) => {
          const pharmacies = res.data;
          if (pharmacies.length == 0)
            Swal.fire("Cannot find this medicine ", "Try again plase", "error");
          dispatch(found(pharmacies));
        })
        .catch((error) => {
          const message = error;
          dispatch(Fail(message));
          Swal.fire("There was an error", `${message}`, "error");
        });
    } else if (searchParams.length === 2) {
      axios
        .get("http://localhost:8080/medicines/search2", {
          params: {
            first: searchParams[0],
            second: searchParams[1],
            third: searchParams[2],
          },
        })
        .then((res) => {
          const pharmacies = res.data;

          dispatch(found(pharmacies));
        })
        .catch((error) => {
          const message = error;
          dispatch(Fail(message));
          Swal.fire("There was an error", `${message}`, "error");
        });
    } else if (searchParams.length === 1) {
      axios
        .get("http://localhost:8080/medicines/search1", {
          params: {
            first: searchParams[0],
            second: searchParams[1],
            third: searchParams[2],
          },
        })
        .then((res) => {
          const pharmacies = res.data;
          dispatch(found(pharmacies));
        })
        .catch((error) => {
          const message = error.message;
          dispatch(Fail(message));
          Swal.fire("There was an error", `${message}`, "error");
        });
    }
  };
};

export const updatePharmacy = (id, data) => {
  const token = JSON.parse(localStorage.getItem("access_token"));
 
  return (dispatch) => {
    dispatch(Request());
    
    axios
      .put(`http://localhost:8080/pharmacies/${id}`, data, {headers:{authorization:`Bearer ${token}`}})
      .then((res) => {
        const pharmacies = res.data;
        dispatch(Success(pharmacies));
        localStorage.setItem("pharmacy", JSON.stringify(pharmacies));
        Swal.fire("Pharmacy Updated", "Done", "success");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        Swal.fire("There was an error", `${message}`, "error");
      });
  };
};
export const deletePharmacy = (id,navegate) => {
  const token = JSON.parse(localStorage.getItem("access_token"));
  return (dispatch) => {
    dispatch(Request());
    axios
      .delete(`http://localhost:8080/pharmacies/${id}`, {headers:{authorization:`Bearer ${token}`}})
      .then((res) => {
        const pharmacies = res.data;
        dispatch(Success(pharmacies));
        localStorage.setItem("pharmacy", JSON.stringify(pharmacies));
        Swal.fire("Your Account has been deleted","Signup again","success");
        navegate && navegate("/login");
      })
      .catch((error) => {
        const message = error.message;
        dispatch(Fail(message));
        if (message.search("500"))
          Swal.fire("There is a pharmacy with the same name", ``, "error");
        else Swal.fire("There was an error", `${message}`, "error");
      });
  };
};

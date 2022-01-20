import {
  MEDICINE_SUCCESS,
  MEDICINE_FAIL,
  MEDICINE_REQUEST,
  MEDICINE_ADDED,
  MEDICINE_DELETED,
} from "./type";
import { getPharmacy } from "./PharmacyActions";
import axios from "axios";
import Swal from "sweetalert2";

const Request = () => {
  return {
    type: MEDICINE_REQUEST,
    loading: true,
  };
};
const Success = (medicine) => {
  return {
    type: MEDICINE_SUCCESS,
    loading: false,
    payload: medicine,
    added: true,
  };
};
const Fail = (error) => {
  return {
    type: MEDICINE_FAIL,
    payload: error,
  };
};
const add = (medicine) => {
  return {
    type: MEDICINE_ADDED,
    payload: medicine,
    loading: false,
  };
};
const deleted = () => {
  return {
    type: "MEDICINE_DELETED",
    loading: false,
    deleted: true,
  };
};

export const addMedicine = (user,medicine,navegate) => {
  return (dispatch) => {
    dispatch(Request());
    const token = JSON.parse(localStorage.getItem("access_token"));
    axios
      .post("http://localhost:8080/medicines", medicine, {headers:{authorization:`Bearer ${token}`}})
      .then((response) => {
        const med = response.data;
        dispatch(add(med));
        dispatch(getPharmacy(user,null,navegate));
        localStorage.setItem("medicine", JSON.stringify(med));
        Swal.fire({
          title: "ADDED SUCCESSFULY",
          icon: "success",
          background: "rgba(245, 241, 241, 0.702);",
        });
        
        dispatch(getPharmacy(user));
      })
      .catch((error) => {
        dispatch(Fail(error));
        Swal.fire("There was an error!", `${error.message}`, "error");
      });
  };
};

export const deleteMedicine = (id,user) => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    dispatch(Request());
    axios
      .delete(`http://localhost:8080/medicines/${id}`, {headers:{authorization:`Bearer ${token}`}})
      .then((response) => {
        dispatch(deleted());
        dispatch(getPharmacy(user));
        Swal.fire("DELETED", "Done", "success");
      })
      .catch((error) => {
        dispatch(Fail(error));
        Swal.fire("There was an error", `${error.message}`, "error");
      });
  };
};

export const updateMedicine = (id,user, medicine) => {
  return (dispatch) => {
    
    dispatch(Request());
    const token = JSON.parse(localStorage.getItem("access_token"));
    
    axios
      .put(`http://localhost:8080/medicines/${id}`, medicine, {headers:{authorization:`Bearer ${token}`}})
      .then((response) => {
        const med = response.data;
        dispatch(add(med));
        localStorage.setItem("medicine", JSON.stringify(med));

        Swal.fire({
          title: "Updated",
          icon: "success",
          background: "rgba(245, 241, 241, 0.702);",
        });
        
        dispatch(getPharmacy(user));
      })
      .catch((error) => {
        dispatch(Fail(error));
        Swal.fire("There was an error!", `${error.message}`, "error");
      });
  };
};

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import NavBar from "../Header/NavBar";
export default function AfterLog() {
  const username = JSON.parse(localStorage.getItem("token"));
  const pharmacyName = JSON.parse(localStorage.getItem("pharmacy"));
  
  const [user, setuser] = useState(username.sub);
  const [pharmacy, setpharmacy] = useState(pharmacyName.name);
  const navegate = useNavigate();
  const onClick = (e) => {
    e.preventDefault();
    navegate("/medicine");
  };
  return (
    <>
      <NavBar show={false} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <from>
          <h3 className="">Hello {user}</h3>
          <h4 className="">Your Pharmacy is {pharmacy}</h4>
          <button className="btn btn-success mt-2" onClick={onClick}>
            Now add your medicine
          </button>
        </from>
      </motion.div>
    </>
  );
}

import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { FaLocationArrow, FaPhone, FaMailBulk, FaPills } from "react-icons/fa";

import NavBar from "../Header/NavBar";
function SearchmedicineData({ getMedicine, medicineData }) {
  let delayTime = 0.1;
  
  const onClick = (e) => {
    getMedicine(e.target.key);
  };
  return medicineData.loading ? (
    <>
      <NavBar show={true}/>
      <h5>Loading...</h5>
    </>
  ) : medicineData.error ? (
    <div>
      <NavBar show={true} />
    </div>
  ) : (
    <div className=" row  gap-3" >
      <NavBar show={true} />
      {medicineData.pharmacies.length > 0 ? (
        medicineData.pharmacies.map((pharmacy, delayTime) => {
          return (
            <motion.div
              style={{ borderRadius: 5, width: "40%" }}
              className=" d-flex mx-5 bg-light opacity-75  align-items-center border"
              animate={{
                scale: 1,
                boxShadow: "0 .5rem 1rem inset rgba(0,0,0,.15)",
              }}
              initial={{ scale: 0, boxShadow: "none" }}
              transition={{ type: "ease", duration: 0.7, delay: delayTime }}
              key={pharmacy.id}
            >
              <div className="row">
                <div className="col">
                  <h3 className="text-start m-3">{pharmacy.name}</h3>
                  <h6 className="d-flex gap-3 m-3">
                    <FaLocationArrow />
                    {pharmacy.addres}
                  </h6>
                  <div className="">
                    <div className=" d-flex gap-3 m-3">
                      <FaMailBulk />
                      {pharmacy.email}
                    </div>
                    <div className=" d-flex gap-3 m-3">
                      <FaPhone />
                      {pharmacy.phone}
                    </div>
                  </div>
                  <div className="d-flex">
                    {pharmacy.medicine.map((medicine) => {
                      return (
                        <div className="d-flex ">
                          <div
                            className=""
                            key={medicine.id}
                            style={{ cursor: "pointer" }}
                            onClick={onClick}
                          >
                            <h5 className="d-flex gap-1 m-3">
                              <FaPills />
                              {medicine.name}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
          delayTime = delayTime + 0.09;
        })
      ) : (
        <div className="h3">there is no medicineData</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    medicineData: state.pharmacy,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getMedicine: (id) => dispatch(getMedicine(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchmedicineData);

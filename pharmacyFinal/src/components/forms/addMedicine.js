import React from "react";
import NavBar from "../Header/NavBar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addMedicine } from "../../redux/Actions/MedicineActoins";
import Loader from "../Animation/Loader";

function AddMedicine({ addMedicine, medicineData, user, pharmacy }) {
  const navegate = useNavigate();
  const currentPharmacy = pharmacy.pharmacies.name;
  const [name, setname] = useState(null);
  const [type, settype] = useState(null);
  const [category, setcategory] = useState(null);
  const [description, setdescription] = useState(null);
 

  const medicineAdd = (e) => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.add("was-validated");
    } else {
      const medicine = {
        pharmacy: {
          name: currentPharmacy,
        },
        medicine: {
          name: name,
          type: type,
          description: description,
          category: category
        },
      };
      addMedicine(pharmacy.pharmacies.user.username,medicine,navegate);
      setcategory("");
      settype("");
      setname("");
      setdescription("");
      e.preventDefault();
    }
  };

  return (
    <div>
      <NavBar show={false} />
      <div className="container flex-col-centered">
        <form
          className=" login-form row gap-2"
          noValidate
          onSubmit={medicineAdd}
        >
          <div className="text-center">
            <h4>Now add medicine to your pharmacy</h4>
          </div>
          <div className="text-start">
            <h6 className="text-start">wellcome dear {user.user.sub} </h6>
            <h6 className="text-start">Add medicine to {currentPharmacy}</h6>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name">name:</label>
                <input
                  type="text"
                  required
                  id="name"
                  className="form-control"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <div className="invalid-feedback">name is required</div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="type">type</label>
                <input
                  type="text"
                  required
                  id="type"
                  className="form-control"
                  placeholder="type"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                />
                <div className="invalid-feedback">type is required</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="cat">Category:</label>
                <input
                  type="text"
                  required
                  id="cat"
                  className="form-control"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                />
                <div className="invalid-feedback">Category is required</div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="desc">Description:</label>
                <input
                  type="text"
                  required
                  id="desc"
                  className="form-control"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
                <div className="invalid-feedback">description is required</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8  g-3">
                <button
                  type="submit"
                  className="btn mt-3 btn-primary"
                  style={{ width: "fit-content" }}
                >
                  {medicineData.loading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <span>Add another medicine</span>
                  )}
                </button>
                <button
                  type="submit"
                  className="btn btn-success mt-3 mx-5"
                  onClick={(e) => {
                    if (name && type && category && description) {
                      medicineAdd(e);
                  
                    }
                  }}
                >
                  DONE
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    medicineData: state.medicine,
    user: state.user,
    pharmacy: state.pharmacy,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addMedicine: (user,medicine,navegate) =>
      dispatch(addMedicine(user,medicine,navegate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMedicine);

import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../redux/Actions/PharmacyActions";
import { useNavigate } from "react-router-dom";
import Loader from "../Animation/Loader";
import NavBar from "../Header/NavBar";
function AddPharmacy({ addPharmacy, pharmacyData }) {
  const navegate = useNavigate();
  const user = pharmacyData;
  const [name, setname] = useState();
  const [addres, setaddress] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const PharmacyAdd = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const pha = {
        name: name,
        addres: addres,
        phone: phone,
        email: email,
      };
      const userBody = {
        user: {
          username: user.user.sub,
        },
        pharmacy: pha,
      };

      addPharmacy(userBody, navegate);
    }

    e.target.classList.add("was-validated");
  };

  return (
    <div>
      <NavBar show={false} />
      <div className="container flex-col-centered">
        <form
          className=" login-form gap-2  shadow"
          noValidate
          onSubmit={PharmacyAdd}
        >
          <div></div>
          <div className="text-start">
            <h6 className="text-start">
              Wellcome dear{" "}
              <span style={{ fontFamily: "arial" }}>{user.user.sub}</span>
            </h6>
            <h6 className="text-start">
              Now you can add your pharmacy{" "}
              <span style={{ fontFamily: "arial" }}></span>
            </h6>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name">name:</label>
                <input
                  type="text"
                  required
                  id="name"
                  className="form-control"
                  placeholder="name"
                  onChange={(e) => setname(e.target.value)}
                />
                <div className="invalid-feedback">name is required</div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="address">address</label>
                <input
                  type="text"
                  required
                  id="tupe"
                  className="form-control"
                  placeholder="address"
                  onChange={(e) => setaddress(e.target.value)}
                />
                <div className="invalid-feedback">address is required</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="cat">phone:</label>
                <input
                  type="text"
                  required
                  id="cat"
                  className="form-control"
                  placeholder="phone"
                  onChange={(e) => setphone(e.target.value)}
                />
                <div className="invalid-feedback">phone is required</div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="desc">email:</label>
                <input
                  type="email"
                  required
                  id="desc"
                  className="form-control"
                  placeholder="email"
                  onChange={(e) => setemail(e.target.value)}
                />
                <div className="invalid-feedback">email is required</div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-lg-6">
                <button
                  type="submit"
                  formNoValidate
                  className="btn btn-success"
                  style={{ width: "fit-content", height: 40 }}
                >
                  {pharmacyData.loading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <span>Go to add your medicine</span>
                  )}
                </button>
                <button
                  type="button"
                  value="back"
                  className="mx-5 btn btn-primary"
                  style={{ width: "fit-content" }}
                  onClick={() => {
                    navegate("/signUp");
                  }}
                >
                  Back
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
    pharmacyData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPharmacy: (Pharmacy, navegate) => dispatch(register(Pharmacy, navegate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPharmacy);

import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { updatePharmacy } from "../../redux/Actions/PharmacyActions";
import Loader from "../Animation/Loader";

function UpdatePharmacy({ updatePharmacy, pharmacyData, pharmacy }) {
  
  const user = pharmacyData;
  const [name, setname] = useState(pharmacy.name);
  const [addres, setaddress] = useState(pharmacy.addres);
  const [phone, setphone] = useState(pharmacy.phone);
  const [email, setemail] = useState(pharmacy.email);
  const [update, setupdate] = useState();

  const PharmacyUpdate = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const pha = {
        id: pharmacy.id,
        name: name,
        addres: addres,
        phone: phone,
        email: email,
      };
      updatePharmacy(pharmacy.id, pha);
    }

    e.target.classList.add("was-validated");
  };

  return (
    //  < className="" style={{position:"absolute",height:"100%",width:"100%"  ,top:0,zIndex:1000,backgroundColor:"rgba(0,0,0,0.4)"}}>

    <div className="container flex-col-centered justify-content-center align-items-center">
      <form
        className="  row gap-2 card shadow"
        noValidate
        onSubmit={PharmacyUpdate}
      >
        <div></div>
        <div className="text-start">
          <h6 className="text-start">
            Wellcome dear{" "}
            <span style={{ fontFamily: "arial" }}>{user.user.sub}</span>
          </h6>
          <h6 className="text-start">
            Now you can update your pharmacy{" "}
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
                value={name}
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
                value={addres}
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
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <div className="invalid-feedback">phone is required</div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="desc">email:</label>
              <input
                type="text"
                required
                id="desc"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <div className="invalid-feedback">email is required</div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
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
                  <span>Update</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    // </>
  );
}
const mapStateToProps = (state) => {
  return {
    pharmacyData: state.user,
    pharmacy: state.pharmacy.pharmacies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePharmacy: (id, Pharmacy) => dispatch(updatePharmacy(id, Pharmacy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePharmacy);

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../redux/Actions/UserActions";
import NavBar from "../Header/NavBar";
function SignUp({ signUp }) {
  const navegate = useNavigate();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [address, setpaddress] = useState("");
  const navegatePharmacy = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const user = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        addres: address,
        password: password,
        role: "user",
      };
      signUp(user, navegate);
    }
    e.target.classList.add("was-validated");
  };
  const passwordCheck = (e) => {
    if (password !== e.target.value) {
      e.target.style.border = "1px red solid";
      document.getElementById("signup").disabled = true;
    } else {
      e.target.style.border = "none";
      document.getElementById("signup").disabled = false;
    }
  };
  return (
    <>
      <NavBar show={true} />
      <div className="container flex-col-centered">
        <form
          className="login-form row gap-2 text-start"
          noValidate
          onSubmit={navegatePharmacy}
        >
          <h3>SignUp</h3>
          <p className="lead ">SignUp to add your pharmacy and medicine</p>
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
              <label htmlFor="email">email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <div className="invalid-feedback">email is required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="address">address:</label>
              <input
                type="text"
                required
                id="address"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setpaddress(e.target.value)}
              />
              <div className="invalid-feedback">Address is required</div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="phone">phone:</label>
              <input
                type="text"
                required
                id="phone"
                className="form-control"
                placeholder="phone number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <div className="invalid-feedback">phone number is required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="password">username:</label>
              <input
                type="text"
                required
                className="form-control"
                id="username"
                name="username"
                placeholder="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <div className="invalid-feedback">username is required</div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="password">password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <div className="invalid-feedback">username is required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="C-password">Confirm password:</label>
              <input
                type="password"
                className="form-control"
                id="C-password"
                name="password"
                placeholder="password"
                onChange={passwordCheck}
              />
              <div className="invalid-feedback">username is required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <button
                type="submit"
                className="btn btn-success mb-2"
                id="signup"
                style={{ width: "fit-content" }}
              >
                Register
              </button>
              <p>
                You have an account{" "}
                <Link to="/login">
                  <span style={{ color: "blue" }}>Login</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, navegate) => dispatch(signUp(user, navegate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

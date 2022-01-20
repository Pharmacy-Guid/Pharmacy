import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Login.css";
import { logIn } from "../../redux/Actions/UserActions";
import Navbar from "../Header/NavBar";

import Loader from "../Animation/Loader";
function Login({ logIn, userData }) {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navegate = useNavigate();
  const login = (e) => {
    const user = username;
    const pass = password;
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      logIn(username,password, navegate);
    }

    e.target.classList.add("was-validated");
  };
  return (
    <>
      <Navbar show={null} />
      <div className="container flex-col-centered text-start">
        <form
          className=" login-form row gap-2 shadow "
          id="form"
          noValidate
          onSubmit={(e) => {
            login(e);
          }}
        >
          <h3 className="text-center">Login</h3>
          <h4>hello</h4>
          <p className="lead mb-3 text-start ">login to your pharmacy</p>
          <div>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              id="username"
              value={username}
              className="form-control"
              placeholder="username"
              required
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <div className="invalid-feedback">username is required</div>
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input
              type="password"
              value={password}
              className="form-control"
              id="password"
              required
              name="password"
              placeholder="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <div className="invalid-feedback">username is required</div>
          </div>
          <div className=" text-start">
            <button
              type="submit"
              formNoValidate
              className="btn btn-success mb-2"
              style={{ width: "fit-content" }}
            >
              {userData.loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
            <p className="text-start">
              You haven't account{" "}
              <Link to="/SignUp">
                <span style={{ color: "blue" }}>SignUp</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (user, password, navegate) =>
      dispatch(logIn(user, password, navegate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

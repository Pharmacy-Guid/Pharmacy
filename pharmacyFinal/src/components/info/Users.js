import React from "react";
import {  useState,useEffect } from "react";
import { connect } from "react-redux";
import {
  FaClinicMedical,
  FaUserCircle,

  FaPills,
} from "react-icons/fa";
import {
  deleteMedicine,
  updateMedicine,
} from "../../redux/Actions/MedicineActoins";
import { useNavigate ,Link} from "react-router-dom";

import Loader from "../Animation/Loader";
import Swal from "sweetalert2";
import {

  updatePharmacy,
} from "../../redux/Actions/PharmacyActions";
import { deleteAcount, updateUser } from "../../redux/Actions/UserActions";
import NavBar from "../Header/NavBar";

function Users({
  deleteMedicine,
  pharmacyData,
  user,
  medicineData,
  updateMedicine,
  deleteAcount,
  updatePharmacy,
  updateUser,
}) {
  const navegate = useNavigate();
  const currentPharmacy = pharmacyData.pharmacies.name;
  const [medicineInfo, setmedicine] = useState(medicineData)
  
  

  //Pharmacy Usestate
  const [pharmacyname, setpharmacyname] = useState(
    pharmacyData.pharmacies.name
  );
  const [pharmacyaddres, setpharmacyaddres] = useState(
    pharmacyData.pharmacies.addres
  );
  const [pharmacyphone, setpharmacyphone] = useState(
    pharmacyData.pharmacies.phone
  );
  const [pharmacyemail, setpharmacyemail] = useState(
    pharmacyData.pharmacies.email
  );
  

  //User userStete
  const [userusername, setuserusername] = useState(pharmacyData.pharmacies.user.username);
  const [username, setusername] = useState(
    pharmacyData.pharmacies.user.name
  );

  const [userpassword, setuserpassword] = useState(
    pharmacyData.pharmacies.user.password
  );
const [useremail, setuseremail] = useState(pharmacyData.pharmacies.user.email);
const [useraddress, setuseraddress] = useState(pharmacyData.pharmacies.user.addres)



  const medicineUpdate = (id ,medicine) => {
    
    updateMedicine(id,pharmacyData.pharmacies.user.username,medicine);
  };

  const PharmacyUpdate = () => {
    const pha = {
      name: pharmacyname,
      addres: pharmacyaddres,
      phone: pharmacyphone,
      email: pharmacyemail,
    };
    updatePharmacy(pharmacyData.pharmacies.id, pha);
  };

  return pharmacyData.loading ? (
    <>
      <Loader />
      <NavBar show={false} />
    </>
  ) :  (
    <div>
      <NavBar show={false} />


      <div
        style={{ height: "100vh", background: "rgb(255,255,255,.7)" }}
        className=" mt-5   container"
      >
        <div>
          <div className="" style={{ background: "rgba(255,255,255,.2)" }}>
            <div
              className=" table-responsive overflow-scroll  "
              
            >
              <div
                className=""
                
              >
                <h4
                  className="accordion-header text-start  "
                  
                >
                  
                      <FaUserCircle /> Name:
                      {pharmacyData.pharmacies.user.name}
                </h4>
                <div className="">
                    <table className="table table-striped table-responsive table-sm">
                      <thead>
                        <tr>
                          <th scope="col">name</th>
                          <th scope="col">Username</th>
                          <th scope="col">Address</th>
                          <th scope="col">Email</th>
                          <th scope="col">delete</th>
                          <th scope="col">update</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                            <tr>
                              <td className="   ">
                                <input
                                  type="text"
                                  className="border-0 bg-transparent text-center"
                                  value={username}
                                  onChange={(e) => {
                                    setusername(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={userusername}
                                  onChange={(e) => {
                                    setuserusername(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={useraddress}
                                  onChange={(e) => {
                                    setuseraddress(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={useremail}
                                  onChange={(e) => {
                                    setuseremail(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                              <button
                              className="btn btn-danger"
                              value={pharmacyData.pharmacies.id}
                              onClick={(e) =>
                                deleteAcount(e.target.value, navegate)
                              }
                            >
                              {pharmacyData.loading ? (
                                <div>
                                  <Loader />
                                </div>
                              ) : (
                                <span style={{ pointerEvents: "none" }}>
                                  Delete
                                </span>
                              )}
                            </button>
                              </td>
                              <td>
                              <button
                              className="btn btn-danger"
                              value={pharmacyData.pharmacies.user.id}
                              onClick={(e) =>{
const data={
  "username": userusername,
 "name":username,
  "email":useremail,
  "addres":useraddress
};
                              
                                updateUser(e.target.value,data )
                              }}
                            >
                              {pharmacyData.loading ? (
                                <div>
                                  <Loader />
                                </div>
                              ) : (
                                <span style={{ pointerEvents: "none" }}>
                                  Update
                                </span>
                              )}
                            </button>
                              </td>
                            </tr>
                         
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="">
                <h4 className="accordion-header text-start" >
                  
                      <FaClinicMedical /> Pharmacy:
                      {pharmacyData.pharmacies.name}
                  
                </h4>
                <div className="">
                    <table className="table table-striped table-responsive table-sm">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Address</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">delete</th>
                          <th scope="col">update</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                            <tr>
                              <td className="   ">
                                <input
                                  type="text"
                                  className="border-0 bg-transparent text-center"
                                  value={pharmacyname}
                                  onChange={(e) => {
                                    setpharmacyname(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={pharmacyaddres}
                                  onChange={(e) => {
                                    setpharmacyaddres(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={pharmacyphone}
                                  onChange={(e) => {
                                    setpharmacyphone(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="email"
                                  
                                 value={pharmacyemail}
                                  onChange={(e) => {
                                    setpharmacyemail(e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                              <button
                              className="btn btn-danger"
                              value={pharmacyData.pharmacies.id}
                              onClick={(e) =>
                                deleteAcount(e.target.value, navegate)
                              }
                            >
                              {pharmacyData.loading ? (
                                <div>
                                  <Loader />
                                </div>
                              ) : (
                                <span style={{ pointerEvents: "none" }}>
                                  Delete
                                </span>
                              )}
                            </button>
                              </td>
                              <td>
                              <button
className="btn btn-success text-center text-light"
onClick={PharmacyUpdate}
>
{pharmacyData.loading ? (
  <div>
    <Loader />
  </div>
) : (
  <span style={{ pointerEvents: "none" }}>
    Update
  </span>
)}
</button>
                              </td>
                            </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="">
                <h4 className="accordion-header text-start"  id="headingThree">
                
                      <FaPills />
                      Medicine<Link className="mx-3 h-25" to="/medicine"><span style={{ color: "blue",fontSize:16 }}>Add Medicine</span></Link>
                    
                </h4>
                <div id="collapseThree" className="">
                  <div className="">
                    <table className="table table-striped table-responsive table-sm">
                      <thead>
                        <tr>
                          <th scope="col">name</th>
                          <th scope="col">type</th>
                          <th scope="col">category</th>
                          <th scope="col">description</th>
                          <th scope="col">delete</th>
                          <th scope="col">update</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {
                         ( medicineData !== null && medicineData.length > 0 )?(
                        medicineData.map((medicine, index) => {
                          return (
                            <tr key={medicine.id}>
                              <td className="">
                                <input
                                  type="text"
                                  className="border-0 bg-transparent text-center"
                                  onChange={ (e) => {
                                    let newData=[...medicineInfo];
                                    newData[index].name=e.target.value;
                                    setmedicine(newData);
                                  }}
                                  value={medicineInfo[index].name}
                                
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={medicineInfo[index].type}
                                  onChange={(e) => {
                                    let newData=[...medicineInfo];
                                    newData[index].type=e.target.value;
                                    setmedicine(newData);
                                    // settype();
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={medicineInfo[index].category}
                                  
                                  onChange={(e) => {
                                    let newData=[...medicineInfo];
                                    newData[index].category=e.target.value;
                                    setmedicine(newData);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="border-0 bg-transparent  text-center"
                                  type="text"
                                  value={medicineInfo[index].description}
                                  
                                  onChange={(e) => {
                                    let newData=[...medicineInfo];
                                    newData[index].description=e.target.value;
                                    setmedicine(newData);
                                  }}
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  value={medicine.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteMedicine(e.target.value,pharmacyData.pharmacies.user.username, navegate);
                                  }}
                                >
                                  {pharmacyData.loading ? (
                                    <div>
                                      <Loader />
                                    </div>
                                  ) : (
                                    <span style={{ pointerEvents: "none" }}>
                                      Delete
                                    </span>
                                  )}
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  value={medicine.id}
                                  onClick={(e) => {
                                    medicineUpdate(e.target.value,medicineInfo[index]);
                                  }}
                                >
                                  {pharmacyData.loading ? (
                                    <div>
                                      <Loader />
                                    </div>
                                  ) : (
                                    <span style={{ pointerEvents: "none" }}>
                                      Update
                                    </span>
                                  )}{" "}
                                </button>
                              </td>
                            </tr>
                          );
                        })):
                          Swal.fire("Your Pharmacy is empty", "", "info") && (
                            <div className="container h3"> your pharmacy is empty<Link className="mx-3 h-25" to="/medicine"><span style={{ color: "blue",fontSize:16 }}>Add Medicine</span></Link> </div>
                          )
}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )  
  
}
const mapStateToProps = (state) => {
  return {
    pharmacyData: state.pharmacy,
    user: state.user,
    medicineData: state.pharmacy.pharmacies.medicine
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteMedicine: (id,user) => dispatch(deleteMedicine(id,user)),
    updateMedicine: (id,user, medicine) => dispatch(updateMedicine(id,user, medicine)),
    deleteAcount: (id, navegate) => dispatch(deleteAcount(id, navegate)),
    updatePharmacy: (id,data) => dispatch(updatePharmacy(id, data)),
    updateUser: (id,data) => dispatch(updateUser(id, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);

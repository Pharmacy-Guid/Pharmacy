import React from 'react'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {searchMedicine} from '../../redux/Actions/PharmacyActions'
import Loader from '../Animation/Loader'


import 'bootstrap/dist/css/bootstrap.min.css'
 function SearchForm({pharmacyData,searchMedicine}) {
const navegate=useNavigate()
   const [ready, setready] = useState(false)
   
const [searchStr, setsearchStr] = useState();
const [searched, setsearched] = useState(false);
const [done, setdone] = useState(false)
const loading=pharmacyData.loading;
const onClick =   (e)=>{
  e.preventDefault();
  if(ready){
    const Str=searchStr;
      searchMedicine(Str);
      setsearchStr('');
     setdone(true);
  }
 
};

(done && pharmacyData.pharmacies.length >0)&&navegate("/result");

    return(
      <div >
        <form className="search-form d-flex flex-column  " action="" style={{background:"none"}}>
        <div className="search-form shadow" >
            <input className="form-control" style={{width:"400px"}} type="text" value={searchStr}  onChange={(e)=>{setsearchStr(e.target.value);setready(true)}} />
            <button className="btn btn-primary"   onClick={onClick}>
            
    { loading ?(<div><Loader/></div>) :(<span>Search</span> )}  
        </button>
        </div>
        </form>
        
        </div>
    )
}

const mapStateToProps=state=>{
    return{
      pharmacyData:state.pharmacy
    }
  }
  const mapDispatchToProps=dispatch=>{
    return{
        searchMedicine:(searchStr)=>dispatch(searchMedicine(searchStr))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);
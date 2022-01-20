import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import {motion} from "framer-motion"
 function Tabs({userData,show }) {
    return (
            <motion.ul initial={{width:'0%'}} transition={{delay:.2,type:"ease"}} animate={{width:'30%'}} style={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:30 }}>
               { show!=null && ( !show ? (<li className="h5"><Link to="/login">logout</Link> </li>):(<li className="h4"><Link to="/login"> Login  </Link> </li>))}
            </motion.ul>
        
    )
}
const mapStateToProps=state=>{
return{
    userData:state.user
}
}
export default connect(mapStateToProps,null)(Tabs)
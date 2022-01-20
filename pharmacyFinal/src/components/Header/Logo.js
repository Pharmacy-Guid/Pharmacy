import React from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
export default function Logo() {
    return (
        // <div className="d-flex justify-content-center align-items-center" style={{margin:"auto 0 !important"}}>
            <Link to="/" className="text-center  " style={{textDecoration:"none",margin:"auto 0"}}><h1 className="text-center d-flex mb-4 justify-content-center align-items-center"><span className="text-center" style={{fontSize:"3rem",color:"green"}}>+</span>Pharmaguid</h1></Link>
        // </div>
    )
}


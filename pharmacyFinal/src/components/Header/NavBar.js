import React from 'react'
import Logo from './Logo'
import Tabs from './Tabs'
import './Header.css'
import {motion} from 'framer-motion'
export default function NavBar({show}) {
    return (
        <motion.header
        
        transition={{duration:1,type:"easeOut"}}
         className="header align-items-center " >
            <Logo />
           {( <Tabs show={show} />)}
        </motion.header>
    )
}
